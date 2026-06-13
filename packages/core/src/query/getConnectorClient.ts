import {
  type GetConnectorClientErrorType,
  type GetConnectorClientParameters,
  type GetConnectorClientReturnType,
  getConnectorClient,
} from '../actions/getConnectorClient.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetConnectorClientOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetConnectorClientParameters<config, chainId>> &
    ScopeKeyParameter
  >

export function getConnectorClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return {
    gcTime: 0,
      return getConnectorClient(config, {
        ...parameters,
      }) as unknown as Promise<GetConnectorClientReturnType<config, chainId>>
    },
    queryKey: getConnectorClientQueryKey(options),
}

export type GetConnectorClientQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetConnectorClientReturnType<config, chainId>

export type GetConnectorClientData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetConnectorClientQueryFnData<config, chainId>

export function getConnectorClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
}

export type GetConnectorClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getConnectorClientQueryKey<config, chainId>>
