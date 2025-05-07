import type { HardhatViemHelpers } from "@nomicfoundation/hardhat-viem/types";
import type { ChainType } from "hardhat/types/network";

import assert from "node:assert/strict";

import { isHash } from "@nomicfoundation/hardhat-utils/eth";

export async function balancesHaveChanged<
  ChainTypeT extends ChainType | string = "generic",
>(
  viem: HardhatViemHelpers<ChainTypeT>,
  promise: Promise<`0x${string}`>,
  changes: Array<{
    address: `0x${string}`;
    amount: bigint;
  }>,
): Promise<void> {
  const txHash = await promise;

  assert.ok(
    isHash(txHash),
    `The promise should return a transaction hash, but it returned: ${String(txHash)}`,
  );

  const publicClient = await viem.getPublicClient();

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });

  const senderAddress = receipt.from;
  const blockNrAfterTx = receipt.blockNumber;

  const beforeBalances = await Promise.all(
    changes.map(({ address }) =>
      publicClient.getBalance({
        address,
        blockNumber: blockNrAfterTx - 1n,
      }),
    ),
  );

  const afterBalances = await Promise.all(
    changes.map(async ({ address }) => {
      let balance = await publicClient.getBalance({
        address,
        blockNumber: blockNrAfterTx,
      });

      if (address === senderAddress) {
        const senderGasFee = receipt.effectiveGasPrice * receipt.gasUsed;
        balance = balance + senderGasFee;
      }

      return balance;
    }),
  );

  changes.forEach(({ address, amount }, index) => {
    const balanceBefore = beforeBalances[index];
    const balanceAfter = afterBalances[index];

    const actualChange = balanceAfter - balanceBefore;

    assert.equal(
      actualChange,
      amount,
      `For address "${address}", expected balance to change by ${amount} (from ${balanceBefore} to ${balanceBefore + amount}), but got a change of ${actualChange} instead.`,
    );
  });
}
