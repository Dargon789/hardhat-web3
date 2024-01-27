import "hardhat/types/config";

declare module "hardhat/types/config" {
  interface HardhatNetworkUserConfig {
    ledgerAccounts?: string[];
<<<<<<< HEAD
    ledgerOptions?: {
      derivationFunction?: (accountNumber: number) => string;
    };
  }
  interface HardhatNetworkConfig {
    ledgerAccounts: string[];
    ledgerOptions?: {
      derivationFunction?: (accountNumber: number) => string;
    };
=======
  }
  interface HardhatNetworkConfig {
    ledgerAccounts: string[];
>>>>>>> fac1221b81 ("hardhat": patch)
  }

  interface HttpNetworkUserConfig {
    ledgerAccounts?: string[];
<<<<<<< HEAD
    ledgerOptions?: {
      derivationFunction?: (accountNumber: number) => string;
    };
  }
  interface HttpNetworkConfig {
    ledgerAccounts: string[];
    ledgerOptions?: {
      derivationFunction?: (accountNumber: number) => string;
    };
=======
  }
  interface HttpNetworkConfig {
    ledgerAccounts: string[];
>>>>>>> fac1221b81 ("hardhat": patch)
  }
}
