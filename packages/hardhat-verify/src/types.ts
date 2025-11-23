export interface ChainConfig {
  network: string;
  chainId: number;
  urls: {
    apiURL: string;
    browserURL: string;
  };
}

export interface EtherscanConfig {
  apiKey: ApiKey;
  customChains: ChainConfig[];
  enabled: boolean;
}

export interface SourcifyConfig {
  enabled: boolean;
  apiUrl?: string;
  browserUrl?: string;
<<<<<<< HEAD
}

export interface BlockscoutConfig {
  enabled: boolean;
  customChains: ChainConfig[];
=======
>>>>>>> 21729dc206 (Added support for Typed objects)
}

export type ApiKey = string | Record<string, string>;
