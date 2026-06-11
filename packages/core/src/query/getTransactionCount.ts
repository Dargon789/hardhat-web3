import {
  type GetTransactionCountErrorType,
  type GetTransactionCountParameters,
  type GetTransactionCountReturnType,
  getTransactionCount,
} from '../actions/getTransactionCount.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

  >

  config: config,
  return {
      const transactionCount = await getTransactionCount(config, {
      })
      return transactionCount ?? null
    },
    queryKey: getTransactionCountQueryKey(options),
}

export type GetTransactionCountQueryFnData =
  Compute<GetTransactionCountReturnType>

export type GetTransactionCountData = GetTransactionCountQueryFnData

export function getTransactionCountQueryKey<config extends Config>(
) {
  return ['transactionCount', filterQueryOptions(options)] as const
}

export type GetTransactionCountQueryKey<config extends Config> = ReturnType<
  typeof getTransactionCountQueryKey<config>
>
