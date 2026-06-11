import {
  type EstimateGasErrorType,
  type EstimateGasParameters,
  type EstimateGasReturnType,
  estimateGas,
} from '../actions/estimateGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type EstimateGasOptions<
  config extends Config,

export function estimateGasQueryOptions<
  config extends Config,
  return {
        throw new Error('account or connector is required')
    },
    queryKey: estimateGasQueryKey(options),
}

export type EstimateGasQueryFnData = EstimateGasReturnType

export type EstimateGasData = EstimateGasQueryFnData

export function estimateGasQueryKey<
  config extends Config,
}

export type EstimateGasQueryKey<
  config extends Config,
> = ReturnType<typeof estimateGasQueryKey<config, chainId>>
