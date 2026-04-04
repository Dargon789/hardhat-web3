import {
  type GetEnsAddressErrorType,
  type GetEnsAddressParameters,
  type GetEnsAddressReturnType,
  getEnsAddress,
} from '../actions/getEnsAddress.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

    GetEnsAddressQueryFnData,
    GetEnsAddressErrorType,
    GetEnsAddressQueryKey<config>
  >
}

export type GetEnsAddressQueryFnData = GetEnsAddressReturnType

export type GetEnsAddressData = GetEnsAddressQueryFnData

export function getEnsAddressQueryKey<config extends Config>(
) {
  return ['ensAddress', filterQueryOptions(options)] as const
}

export type GetEnsAddressQueryKey<config extends Config> = ReturnType<
  typeof getEnsAddressQueryKey<config>
>
