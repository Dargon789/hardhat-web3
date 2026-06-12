import {
  type GetWalletClientErrorType,
  type GetWalletClientParameters,
  type GetWalletClientReturnType,
  getWalletClient,
} from '../actions/getWalletClient.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetWalletClientOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetWalletClientParameters<config, chainId>> & ScopeKeyParameter
  >

export function getWalletClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return {
    gcTime: 0,
    },
    queryKey: getWalletClientQueryKey(options),
}

export type GetWalletClientQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetWalletClientReturnType<config, chainId>

export type GetWalletClientData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetWalletClientQueryFnData<config, chainId>

export function getWalletClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
}

export type GetWalletClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getWalletClientQueryKey<config, chainId>>
