import {
  type GetTransactionConfirmationsErrorType,
  type GetTransactionConfirmationsParameters,
  type GetTransactionConfirmationsReturnType,
  getTransactionConfirmations,
} from '../actions/getTransactionConfirmations.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionConfirmationsOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = UnionExactPartial<GetTransactionConfirmationsParameters<config, chainId>> &

export function getTransactionConfirmationsQueryOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
>(
  config: config,
  return {
        throw new Error('hash or transactionReceipt is required')
      const confirmations = await getTransactionConfirmations(config, {
        ...(parameters as any),
      })
      return confirmations ?? null
    },
    queryKey: getTransactionConfirmationsQueryKey(options),
}

export type GetTransactionConfirmationsQueryFnData =
  GetTransactionConfirmationsReturnType

export type GetTransactionConfirmationsData =
  GetTransactionConfirmationsQueryFnData

export function getTransactionConfirmationsQueryKey<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  return ['transactionConfirmations', filterQueryOptions(options)] as const
}

export type GetTransactionConfirmationsQueryKey<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = ReturnType<typeof getTransactionConfirmationsQueryKey<config, chainId>>
