<<<<<<< HEAD
import type {
  EtherscanConfig,
  SourcifyConfig,
  BlockscoutConfig,
} from "../types";
=======
import type { EtherscanConfig, SourcifyConfig } from "../types";
>>>>>>> fac1221b81 ("hardhat": patch)

import "hardhat/types/config";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    etherscan?: Partial<EtherscanConfig>;
    sourcify?: Partial<SourcifyConfig>;
<<<<<<< HEAD
    blockscout?: Partial<BlockscoutConfig>;
=======
>>>>>>> fac1221b81 ("hardhat": patch)
  }

  interface HardhatConfig {
    etherscan: EtherscanConfig;
    sourcify: SourcifyConfig;
<<<<<<< HEAD
    blockscout: BlockscoutConfig;
=======
>>>>>>> fac1221b81 ("hardhat": patch)
  }
}
