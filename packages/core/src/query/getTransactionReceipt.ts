import {
  type GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters,
  getTransactionReceipt,
} from '../actions/getTransactionReceipt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionReceiptOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetTransactionReceiptParameters<config, chainId>> &
    ScopeKeyParameter
  >

export function getTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return {
    },
    queryKey: getTransactionReceiptQueryKey(options),
  }
export type GetTransactionReceiptQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionReceiptReturnType<config, chainId>

export type GetTransactionReceiptData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionReceiptQueryFnData<config, chainId>

export function getTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return ['getTransactionReceipt', filterQueryOptions(options)] as const
}

export type GetTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getTransactionReceiptQueryKey<config, chainId>>
