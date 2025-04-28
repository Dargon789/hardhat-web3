import type { ChainDescriptorsConfig } from "../../../types/config.js";

import {
  GENERIC_CHAIN_TYPE,
  L1_CHAIN_TYPE,
  OPTIMISM_CHAIN_TYPE,
} from "../../constants.js";

import { L1HardforkName, OpHardforkName } from "./edr/types/hardfork.js";

/**
 * Block numbers / timestamps were taken from:
 *
 * L1 / Generic:
 * https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/common/src/chains.ts
 * Op:
 * https://github.com/ethereum-optimism/superchain-registry/tree/main/superchain/configs/mainnet
 *
 * To find hardfork activation blocks by timestamp, use:
 * https://api-[TESTNET].[BASE_EXPLORER_URL]/api?module=block&action=getblocknobytime&timestamp=TIMESTAMP&closest=before&apikey=APIKEY
 */
export const DEFAULT_CHAIN_DESCRIPTORS: ChainDescriptorsConfig = new Map([
  [
    1, // mainnet
    {
      chainType: L1_CHAIN_TYPE,
      hardforkHistory: new Map([
        [L1HardforkName.FRONTIER, 0],
        [L1HardforkName.HOMESTEAD, 1_150_000],
        [L1HardforkName.DAO, 1_920_000],
        [L1HardforkName.TANGERINE_WHISTLE, 2_463_000],
        [L1HardforkName.SPURIOUS_DRAGON, 2_675_000],
        [L1HardforkName.BYZANTIUM, 4_370_000],
        [L1HardforkName.CONSTANTINOPLE, 7_280_000],
        [L1HardforkName.PETERSBURG, 7_280_000],
        [L1HardforkName.ISTANBUL, 9_069_000],
        [L1HardforkName.MUIR_GLACIER, 9_200_000],
        [L1HardforkName.BERLIN, 1_2244_000],
        [L1HardforkName.LONDON, 12_965_000],
        [L1HardforkName.ARROW_GLACIER, 13_773_000],
        [L1HardforkName.GRAY_GLACIER, 15_050_000],
        [L1HardforkName.MERGE, 15_537_394],
        [L1HardforkName.SHANGHAI, 17_034_870],
        [L1HardforkName.CANCUN, 19_426_589],
      ]),
    },
  ],
  [
    5, // goerli
    {
      chainType: L1_CHAIN_TYPE,
      hardforkHistory: new Map([
        [L1HardforkName.ISTANBUL, 1_561_651],
        [L1HardforkName.BERLIN, 4_460_644],
        [L1HardforkName.LONDON, 5_062_605],
      ]),
    },
  ],
  [
    17_000, // holesky
    {
      chainType: L1_CHAIN_TYPE,
      hardforkHistory: new Map([
        [L1HardforkName.MERGE, 0],
        [L1HardforkName.SHANGHAI, 6_698],
        [L1HardforkName.CANCUN, 894_732],
      ]),
    },
  ],
  [
    560_048, // hoodi
    {
      chainType: L1_CHAIN_TYPE,
      hardforkHistory: new Map([
        [L1HardforkName.MERGE, 0],
        [L1HardforkName.SHANGHAI, 0],
        [L1HardforkName.CANCUN, 0],
      ]),
    },
  ],
  [
    11_155_111, // sepolia
    {
      chainType: L1_CHAIN_TYPE,
      hardforkHistory: new Map([
        [L1HardforkName.GRAY_GLACIER, 0],
        [L1HardforkName.MERGE, 1_450_409],
        [L1HardforkName.SHANGHAI, 2_990_908],
        [L1HardforkName.CANCUN, 5_187_023],
      ]),
    },
  ],
  [
    10, // op mainnet
    {
      chainType: OPTIMISM_CHAIN_TYPE,
      hardforkHistory: new Map([
        [OpHardforkName.BEDROCK, 105_235_063],
        [OpHardforkName.REGOLITH, 105_235_063],
        [OpHardforkName.CANYON, 114_696_812],
        [OpHardforkName.ECOTONE, 117_387_812],
        [OpHardforkName.FJORD, 122_514_212],
        [OpHardforkName.GRANITE, 125_235_812],
        [OpHardforkName.HOLOCENE, 130_423_412],
      ]),
    },
  ],
  [
    11_155_420, // op sepolia
    {
      chainType: OPTIMISM_CHAIN_TYPE,
      hardforkHistory: new Map([
        [OpHardforkName.BEDROCK, 0],
        [OpHardforkName.REGOLITH, 0],
        [OpHardforkName.CANYON, 4_089_330],
        [OpHardforkName.ECOTONE, 8_366_130],
        [OpHardforkName.FJORD, 12_597_930],
        [OpHardforkName.GRANITE, 15_837_930],
        [OpHardforkName.HOLOCENE, 20_415_330],
      ]),
    },
  ],
  [
    42_161, // arbitrum one
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    42_170, // arbitrum nova
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    42_170, // arbitrum sepolia
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    8_453, // base mainnet
    {
      chainType: OPTIMISM_CHAIN_TYPE,
      hardforkHistory: new Map([
        [OpHardforkName.BEDROCK, 0],
        [OpHardforkName.REGOLITH, 0],
        [OpHardforkName.CANYON, 9_101_527],
        [OpHardforkName.ECOTONE, 11_792_527],
        [OpHardforkName.FJORD, 16_918_927],
        [OpHardforkName.GRANITE, 19_640_527],
        [OpHardforkName.HOLOCENE, 24_828_127],
      ]),
    },
  ],
  [
    84_532, // base sepolia
    {
      chainType: OPTIMISM_CHAIN_TYPE,
      hardforkHistory: new Map([
        [OpHardforkName.BEDROCK, 0],
        [OpHardforkName.REGOLITH, 0],
        [OpHardforkName.CANYON, 2_106_456],
        [OpHardforkName.ECOTONE, 6_383_256],
        [OpHardforkName.FJORD, 10_615_056],
        [OpHardforkName.GRANITE, 13_855_056],
        [OpHardforkName.HOLOCENE, 18_432_456],
      ]),
    },
  ],
  [
    43_114, // avalanche c-chain
    { chainType: L1_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    43_113, // avalanche fuji
    { chainType: L1_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    137, // polygon pos mainnet
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    80_001, // polygon pos mumbai
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    1_101, // polygon zkevm mainnet
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    2_442, // polygon zkevm cardona
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    324, // zksync mainnet
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
  [
    300, // zksync sepolia
    { chainType: GENERIC_CHAIN_TYPE, hardforkHistory: new Map() },
  ],
]);
