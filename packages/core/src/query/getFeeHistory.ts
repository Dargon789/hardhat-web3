import {
  type GetFeeHistoryErrorType,
  type GetFeeHistoryParameters,
  type GetFeeHistoryReturnType,
  getFeeHistory,
} from '../actions/getFeeHistory.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetFeeHistoryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
> &
  >

export function getFeeHistoryQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return {
      const feeHistory = await getFeeHistory(config, {
        ...(parameters as GetFeeHistoryParameters),
      })
      return feeHistory ?? null
    },
    queryKey: getFeeHistoryQueryKey(options),
}

export type GetFeeHistoryQueryFnData = GetFeeHistoryReturnType

export type GetFeeHistoryData = GetFeeHistoryQueryFnData

export function getFeeHistoryQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return ['feeHistory', filterQueryOptions(options)] as const
}

export type GetFeeHistoryQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getFeeHistoryQueryKey<config, chainId>>
