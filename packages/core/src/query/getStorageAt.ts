import {
  type GetStorageAtErrorType,
  type GetStorageAtParameters,
  type GetStorageAtReturnType,
  getStorageAt,
} from '../actions/getStorageAt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

    GetStorageAtQueryFnData,
    GetStorageAtErrorType,
    GetStorageAtQueryKey<config>
  >
}

export type GetStorageAtQueryFnData = GetStorageAtReturnType

export type GetStorageAtData = GetStorageAtQueryFnData

export function getStorageAtQueryKey<config extends Config>(
) {
  return ['getStorageAt', filterQueryOptions(options)] as const
}

export type GetStorageAtQueryKey<config extends Config> = ReturnType<
  typeof getStorageAtQueryKey<config>
>
