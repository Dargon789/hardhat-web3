<<<<<<< HEAD
import type { HardhatViemHelpers } from "../types";
=======
import type {
  Address,
  PublicClientConfig,
  WalletClientConfig,
  TestClientConfig,
} from "viem";
import type {
  PublicClient,
  TestClient,
  WalletClient,
  deployContract,
  sendDeploymentTransaction,
  getContractAt,
} from "../types";
>>>>>>> fac1221b81 ("hardhat": patch)
import "hardhat/types/runtime";
import "hardhat/types/artifacts";

declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
<<<<<<< HEAD
    viem: HardhatViemHelpers;
=======
    viem: {
      getPublicClient(
        publicClientConfig?: Partial<PublicClientConfig>
      ): Promise<PublicClient>;
      getWalletClients(
        walletClientConfig?: Partial<WalletClientConfig>
      ): Promise<WalletClient[]>;
      getWalletClient(
        address: Address,
        walletClientConfig?: Partial<WalletClientConfig>
      ): Promise<WalletClient>;
      getTestClient(
        testClientConfig?: Partial<TestClientConfig>
      ): Promise<TestClient>;
      deployContract: typeof deployContract;
      sendDeploymentTransaction: typeof sendDeploymentTransaction;
      getContractAt: typeof getContractAt;
    };
>>>>>>> fac1221b81 ("hardhat": patch)
  }
}

declare module "hardhat/types/artifacts" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ArtifactsMap {}

<<<<<<< HEAD
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ContractTypesMap {}

=======
>>>>>>> fac1221b81 ("hardhat": patch)
  interface Artifacts {
    readArtifact<ArgT extends keyof ArtifactsMap>(
      contractNameOrFullyQualifiedName: ArgT
    ): Promise<ArtifactsMap[ArgT]>;

    readArtifactSync<ArgT extends keyof ArtifactsMap>(
      contractNameOrFullyQualifiedName: ArgT
    ): ArtifactsMap[ArgT];
  }
}
