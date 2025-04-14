import { describe, it } from "node:test";

import HardhatViem from "@nomicfoundation/hardhat-viem";
import { createHardhatRuntimeEnvironment } from "hardhat/hre";

import hardhatPlugin from "../src/index.js";

describe("balancesHaveChanged", () => {
  it("should check that a single balances has changed", async () => {}); // TODO

  it("should check that multiple balances have changed", async () => {
    const hre = await createHardhatRuntimeEnvironment({
      plugins: [HardhatViem, hardhatPlugin],
    });

    const { viem } = await hre.network.connect();

    const [bobWalletClient, aliceWalletClient] = await viem.getWalletClients();

    await viem.assertions.balancesHaveChanged(async () => {
      const hash = await bobWalletClient.sendTransaction({
        to: aliceWalletClient.account.address,
        value: 1000000000000000000000n,
      });

      const publicClient = await viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });
    }, [
      {
        address: bobWalletClient.account.address,
        amount: -1000000023255859375000n, // TODO: gas fees that change the value?
      },
      {
        address: aliceWalletClient.account.address,
        amount: 1000000000000000000000n,
      },
    ]);
  });

  it("should throw an error when the balance changes to a value different from the expected one", async () => {}); // TODO
});
