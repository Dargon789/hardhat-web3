import {
  type EstimateMaxPriorityFeePerGasErrorType,
  type EstimateMaxPriorityFeePerGasParameters,
  type EstimateMaxPriorityFeePerGasReturnType,
  estimateMaxPriorityFeePerGas,
} from '../actions/estimateMaxPriorityFeePerGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

  ExactPartial<EstimateMaxPriorityFeePerGasParameters<config>> &
    ScopeKeyParameter
  >

  config: config,
  return {
      return estimateMaxPriorityFeePerGas(config, parameters)
    },
    queryKey: estimateMaxPriorityFeePerGasQueryKey(options),
}

export type EstimateMaxPriorityFeePerGasQueryFnData =
  EstimateMaxPriorityFeePerGasReturnType

export type EstimateMaxPriorityFeePerGasData =
  EstimateMaxPriorityFeePerGasQueryFnData

export function estimateMaxPriorityFeePerGasQueryKey<config extends Config>(
) {
  return ['estimateMaxPriorityFeePerGas', filterQueryOptions(options)] as const
}

export type EstimateMaxPriorityFeePerGasQueryKey<config extends Config> =
  ReturnType<typeof estimateMaxPriorityFeePerGasQueryKey<config>>
