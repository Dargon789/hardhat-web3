import {
  type GetEnsNameErrorType,
  type GetEnsNameParameters,
  type GetEnsNameReturnType,
  getEnsName,
} from '../actions/getEnsName.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

    GetEnsNameQueryFnData,
    GetEnsNameErrorType,
    GetEnsNameQueryKey<config>
  >
}

export type GetEnsNameQueryFnData = GetEnsNameReturnType

export type GetEnsNameData = GetEnsNameQueryFnData

export function getEnsNameQueryKey<config extends Config>(
) {
  return ['ensName', filterQueryOptions(options)] as const
}

export type GetEnsNameQueryKey<config extends Config> = ReturnType<
  typeof getEnsNameQueryKey<config>
>
