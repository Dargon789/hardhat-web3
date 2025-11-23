import { HARDHAT_MEMPOOL_SUPPORTED_ORDERS } from "../../constants";
<<<<<<< HEAD
=======
import { BuildInfo, HardhatNetworkChainsConfig } from "../../../types";
import { MessageTrace } from "../stack-traces/message-trace";
import { RandomBufferGenerator } from "./utils/random";

export type NodeConfig = LocalNodeConfig | ForkedNodeConfig;

export function isForkedNodeConfig(
  config: NodeConfig
): config is ForkedNodeConfig {
  return "forkConfig" in config && config.forkConfig !== undefined;
}

interface CommonConfig {
  automine: boolean;
  blockGasLimit: number;
  chainId: number;
  genesisAccounts: GenesisAccount[];
  hardfork: string;
  minGasPrice: bigint;
  networkId: number;
  allowUnlimitedContractSize?: boolean;
  initialDate?: Date;
  tracingConfig?: TracingConfig;
  initialBaseFeePerGas?: number;
  mempoolOrder: MempoolOrder;
  coinbase: string;
  chains: HardhatNetworkChainsConfig;
  allowBlocksWithSameTimestamp: boolean;
  enableTransientStorage: boolean;
}

export type LocalNodeConfig = CommonConfig;
>>>>>>> 21729dc206 (Added support for Typed objects)

export interface ForkConfig {
  jsonRpcUrl: string;
  blockNumber?: number;
  httpHeaders?: { [name: string]: string };
}

export type IntervalMiningConfig = number | [number, number];

export type MempoolOrder = typeof HARDHAT_MEMPOOL_SUPPORTED_ORDERS[number];

export interface GenesisAccount {
  privateKey: string;
  balance: string | number | bigint;
}
