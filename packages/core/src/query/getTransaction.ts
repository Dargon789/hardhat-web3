import {
  type GetTransactionErrorType,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from '../actions/getTransaction.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetTransactionParameters<config, chainId>> & ScopeKeyParameter
  >

export function getTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return {
        throw new Error(
        )
      return getTransaction(
        config,
      ) as unknown as Promise<GetTransactionQueryFnData<config, chainId>>
    },
    queryKey: getTransactionQueryKey(options),
}

export type GetTransactionQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionReturnType<config, chainId>

export type GetTransactionData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionQueryFnData<config, chainId>

export function getTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return ['transaction', filterQueryOptions(options)] as const
}

export type GetTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getTransactionQueryKey<config, chainId>>
