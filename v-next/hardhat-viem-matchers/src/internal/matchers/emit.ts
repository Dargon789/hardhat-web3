import type { GenericFunction } from "../../types.js";
import type {
  ContractReturnType,
  HardhatViemHelpers,
} from "@nomicfoundation/hardhat-viem/types";
import type { Abi, ContractEventName } from "viem";

import assert from "node:assert/strict";
import { inspect } from "node:util";

import { assertHardhatInvariant } from "@nomicfoundation/hardhat-errors";
import { deepEqual } from "@nomicfoundation/hardhat-utils/lang";
import { parseEventLogs } from "viem";

export type ContractAbi = Abi | readonly unknown[];

// TODO: Is a new block mined after every transaction? Based on the parsed log, it seems so.
// This means that multiple checks using `emit` will correctly verify if an event was emitted,
// even if it was supposed to be triggered twice. In the second scenario, the logs will refer
// to the second emit, not the first one.

export async function emit<
  // eslint-disable-next-line @typescript-eslint/naming-convention -- TODO
  const abi extends Abi | readonly unknown[],
  ContractName,
>(
  viem: HardhatViemHelpers,
  fn: GenericFunction,
  contract: ContractReturnType<ContractName>,
  eventName: ContractEventName<abi>,
): Promise<void> {
  await checkEmitted(viem, fn, contract, eventName);
}

export async function emitWithArgs<
  // eslint-disable-next-line @typescript-eslint/naming-convention -- TODO
  const abi extends Abi | readonly unknown[],
  ContractName,
>(
  viem: HardhatViemHelpers,
  fn: GenericFunction,
  contract: ContractReturnType<ContractName>,
  eventName: ContractEventName<abi>,
  args: any[],
): Promise<void> {
  const parsedLogs = await checkEmitted(viem, fn, contract, eventName);

  if (args !== undefined) {
    const eventAbi = contract.abi.filter(
      (abi) => "name" in abi && abi.name === eventName,
    );

    assertHardhatInvariant(
      eventAbi.length === 1,
      `There should be only one event named "${eventName}" in the contract ABI`,
    );

    assert.notEqual(
      eventAbi.length,
      0,
      `Event "${eventName}" not found in the contract ABI`,
    );

    assertHardhatInvariant(
      "args" in parsedLogs[0],
      `No args in the event logs, are you sure you are targeting an event with args?`,
    );

    assertHardhatInvariant(
      "inputs" in eventAbi[0],
      `No args in the event abi, are you sure you are targeting an event with args?`,
    );

    const argsToCheck: Record<string, any> = {};
    for (const [index, param] of eventAbi[0].inputs.entries()) {
      assertHardhatInvariant(
        param.name !== undefined,
        `The event parameter at index ${index} does not have a name`,
      );

      argsToCheck[param.name] =
        typeof args[index] === "number" ? BigInt(args[index]) : args[index];
    }

    const areEqual = await deepEqual(parsedLogs[0].args, argsToCheck);
    assert.equal(
      areEqual,
      true,
      `The event arguments do not match the expected ones.
Expected: ${inspect(parsedLogs[0].args, { depth: null, colors: false })}
Got: ${inspect(argsToCheck, { depth: null, colors: false })}`,
    );
  }
}

async function checkEmitted<
  // eslint-disable-next-line @typescript-eslint/naming-convention -- TODO
  const abi extends Abi | readonly unknown[],
  ContractName,
>(
  viem: HardhatViemHelpers,
  fn: GenericFunction,
  contract: ContractReturnType<ContractName>,
  eventName: ContractEventName<abi>,
) {
  await fn();

  const publicClient = await viem.getPublicClient();

  const logs = await publicClient.getLogs({
    address: contract.address,
  });

  const parsedLogs = parseEventLogs({
    abi: contract.abi,
    eventName,
    logs,
  });

  assert.notEqual(
    parsedLogs.length,
    0,
    `No events were emitted for contract with address "${contract.address}" and event name "${eventName}"`,
  );

  return parsedLogs;
}
