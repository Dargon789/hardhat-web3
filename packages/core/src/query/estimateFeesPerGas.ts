import type { FeeValuesType } from 'viem'

import {
  type EstimateFeesPerGasErrorType,
  type EstimateFeesPerGasParameters,
  type EstimateFeesPerGasReturnType,
  estimateFeesPerGas,
} from '../actions/estimateFeesPerGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateFeesPerGasOptions<
  type extends FeeValuesType,
  config extends Config,
> = Compute<
  ExactPartial<EstimateFeesPerGasParameters<type, config>> & ScopeKeyParameter
  >

export function estimateFeesPerGasQueryOptions<
  config extends Config,
  type extends FeeValuesType = 'eip1559',
  return {
      return estimateFeesPerGas(config, parameters)
    },
    queryKey: estimateFeesPerGasQueryKey(options),
}

export type EstimateFeesPerGasQueryFnData<type extends FeeValuesType> =
  EstimateFeesPerGasReturnType<type>

export type EstimateFeesPerGasData<type extends FeeValuesType> =
  EstimateFeesPerGasQueryFnData<type>

export function estimateFeesPerGasQueryKey<
  config extends Config,
  type extends FeeValuesType = 'eip1559',
  return ['estimateFeesPerGas', filterQueryOptions(options)] as const
}

export type EstimateFeesPerGasQueryKey<
  config extends Config,
  type extends FeeValuesType,
> = ReturnType<typeof estimateFeesPerGasQueryKey<config, type>>
