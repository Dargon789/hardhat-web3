import type {
  GenericFunction,
  HardhatViemMatchers,
  HardhatViemMatchersUtils,
} from "../types.js";
import type {
  ContractReturnType,
  HardhatViemHelpers,
} from "@nomicfoundation/hardhat-viem/types";
import type { ChainType } from "hardhat/types/network";
import type { Abi, ContractEventName } from "viem";

import { balancesHaveChanged } from "./matchers/balances-have-changed.js";
import { emitWithArgs } from "./matchers/emit/emit-with-args.js";
import { emit } from "./matchers/emit/emit.js";
import { revertWith } from "./matchers/revert/revert-with.js";
import { revert } from "./matchers/revert/revert.js";
import { HardhatViemMatchersUtilsImpl } from "./viem-matchers-utils.js";

export class HardhatViemMatchersImpl<
  ChainTypeT extends ChainType | string = "generic",
> implements HardhatViemMatchers
{
  readonly #viem: HardhatViemHelpers<ChainTypeT>;

  public readonly utils: HardhatViemMatchersUtils;

  constructor(viem: HardhatViemHelpers<ChainTypeT>) {
    this.#viem = viem;
    this.utils = new HardhatViemMatchersUtilsImpl();
  }

  public async balancesHaveChanged(
    fn: GenericFunction,
    changes: Array<{
      address: `0x${string}`;
      amount: bigint;
    }>,
  ): Promise<void> {
    return balancesHaveChanged(this.#viem, fn, changes);
  }

  public async emit<const AbiT extends Abi | readonly unknown[], ContractName>(
    fn: GenericFunction,
    contract: ContractReturnType<ContractName>,
    eventName: ContractEventName<AbiT>,
  ): Promise<void> {
    return emit(this.#viem, fn, contract, eventName);
  }

  public async emitWithArgs<
    const ViemAbi extends Abi | readonly unknown[],
    ContractName,
  >(
    fn: GenericFunction,
    contract: ContractReturnType<ContractName>,
    eventName: ContractEventName<ViemAbi>,
    args: any[],
  ): Promise<void> {
    return emitWithArgs(this.#viem, fn, contract, eventName, args);
  }

  public async revert(fn: GenericFunction): Promise<void> {
    return revert(fn);
  }

  public async revertWith(
    fn: GenericFunction,
    expectedReason: string,
  ): Promise<void> {
    return revertWith(fn, expectedReason);
  }
}
