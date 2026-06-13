import {
  type GetEnsTextErrorType,
  type GetEnsTextParameters,
  type GetEnsTextReturnType,
  getEnsText,
} from '../actions/getEnsText.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

    GetEnsTextQueryFnData,
    GetEnsTextErrorType,
    GetEnsTextQueryKey<config>
  >
}

export type GetEnsTextQueryFnData = GetEnsTextReturnType

export type GetEnsTextData = GetEnsTextQueryFnData

export function getEnsTextQueryKey<config extends Config>(
) {
  return ['ensText', filterQueryOptions(options)] as const
}

export type GetEnsTextQueryKey<config extends Config> = ReturnType<
  typeof getEnsTextQueryKey<config>
>
