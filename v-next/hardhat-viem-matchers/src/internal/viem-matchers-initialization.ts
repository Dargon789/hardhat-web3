import type { HardhatViemHelpers } from "@nomicfoundation/hardhat-viem/types";

import { HardhatViemMatchersImpl } from "./viem-matchers-impl.js";

export async function initializeViemMatchers(
  viem: HardhatViemHelpers,
): Promise<HardhatViemMatchersImpl> {
  return new HardhatViemMatchersImpl(viem);
}
