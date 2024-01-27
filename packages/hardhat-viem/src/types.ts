import type * as viemT from "viem";
import type { ArtifactsMap } from "hardhat/types/artifacts";
<<<<<<< HEAD
import type { Libraries } from "./internal/bytecode";
=======
>>>>>>> fac1221b81 ("hardhat": patch)

export type PublicClient = viemT.PublicClient<viemT.Transport, viemT.Chain>;
export type WalletClient = viemT.WalletClient<
  viemT.Transport,
  viemT.Chain,
  viemT.Account
>;
export type TestClient = viemT.TestClient<
  TestClientMode,
  viemT.Transport,
  viemT.Chain
>;

<<<<<<< HEAD
export type KeyedClient =
  | {
      public?: PublicClient;
      wallet: WalletClient;
    }
  | {
      public: PublicClient;
      wallet?: WalletClient;
    };

=======
>>>>>>> fac1221b81 ("hardhat": patch)
export type TestClientMode = Parameters<
  typeof viemT.createTestClient
>[0]["mode"];

export interface SendTransactionConfig {
<<<<<<< HEAD
  client?: KeyedClient;
=======
  walletClient?: WalletClient;
  publicClient?: PublicClient;
>>>>>>> fac1221b81 ("hardhat": patch)
  gas?: bigint;
  gasPrice?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  value?: bigint;
}

export interface DeployContractConfig extends SendTransactionConfig {
  confirmations?: number;
<<<<<<< HEAD
  libraries?: Libraries<viemT.Address>;
}

export interface SendDeploymentTransactionConfig extends SendTransactionConfig {
  libraries?: Libraries<viemT.Address>;
}

export interface GetContractAtConfig {
  client?: KeyedClient;
=======
}

export type SendDeploymentTransactionConfig = SendTransactionConfig;

export interface GetContractAtConfig {
  walletClient?: WalletClient;
  publicClient?: PublicClient;
>>>>>>> fac1221b81 ("hardhat": patch)
}

export type GetContractReturnType<
  TAbi extends viemT.Abi | readonly unknown[] = viemT.Abi
<<<<<<< HEAD
> = viemT.GetContractReturnType<TAbi, Required<KeyedClient>, viemT.Address>;
=======
> = viemT.GetContractReturnType<
  TAbi,
  PublicClient,
  WalletClient,
  viemT.Address
>;
>>>>>>> fac1221b81 ("hardhat": patch)

export type GetTransactionReturnType = viemT.GetTransactionReturnType<
  viemT.Chain,
  "latest"
>;

export type ContractName<StringT extends string> =
  StringT extends keyof ArtifactsMap ? never : StringT;

export declare function deployContract<CN extends string>(
  contractName: ContractName<CN>,
  constructorArgs?: any[],
  config?: DeployContractConfig
): Promise<GetContractReturnType>;

export declare function sendDeploymentTransaction<CN extends string>(
  contractName: ContractName<CN>,
  constructorArgs?: any[],
  config?: SendDeploymentTransactionConfig
): Promise<{
  contract: GetContractReturnType;
  deploymentTransaction: GetTransactionReturnType;
}>;

export declare function getContractAt<CN extends string>(
  contractName: ContractName<CN>,
  address: viemT.Address,
  config?: GetContractAtConfig
): Promise<GetContractReturnType>;

<<<<<<< HEAD
export interface HardhatViemHelpers {
  getPublicClient(
    publicClientConfig?: Partial<viemT.PublicClientConfig>
  ): Promise<PublicClient>;
  getWalletClients(
    walletClientConfig?: Partial<viemT.WalletClientConfig>
  ): Promise<WalletClient[]>;
  getWalletClient(
    address: viemT.Address,
    walletClientConfig?: Partial<viemT.WalletClientConfig>
  ): Promise<WalletClient>;
  getTestClient(
    testClientConfig?: Partial<viemT.TestClientConfig>
  ): Promise<TestClient>;
  deployContract: typeof deployContract;
  sendDeploymentTransaction: typeof sendDeploymentTransaction;
  getContractAt: typeof getContractAt;
}

=======
>>>>>>> fac1221b81 ("hardhat": patch)
export type { AbiParameterToPrimitiveType } from "abitype";
