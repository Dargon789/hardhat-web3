import type { PrepareTransactionRequestRequest as viem_PrepareTransactionRequestRequest } from 'viem'

import {
  type PrepareTransactionRequestErrorType,
  type PrepareTransactionRequestParameters,
  type PrepareTransactionRequestReturnType,
  prepareTransactionRequest,
} from '../actions/prepareTransactionRequest.js'
import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type PrepareTransactionRequestOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = UnionExactPartial<
  PrepareTransactionRequestParameters<config, chainId, request>
> &

export function prepareTransactionRequestQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
>(
  config: config,
  options: PrepareTransactionRequestOptions<
    config,
    chainId,
  > = {} as any,
  return {
      return prepareTransactionRequest(config, {
        ...(parameters as any),
      }) as unknown as Promise<
        PrepareTransactionRequestQueryFnData<config, chainId, request>
      >
    },
  }
export type PrepareTransactionRequestQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = PrepareTransactionRequestReturnType<config, chainId, request>

export type PrepareTransactionRequestData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = PrepareTransactionRequestQueryFnData<config, chainId, request>

export function prepareTransactionRequestQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  return ['prepareTransactionRequest', filterQueryOptions(options)] as const
}

export type PrepareTransactionRequestQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = ReturnType<
  typeof prepareTransactionRequestQueryKey<config, chainId, request>
>
