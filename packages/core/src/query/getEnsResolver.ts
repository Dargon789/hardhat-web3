import {
  type GetEnsResolverErrorType,
  type GetEnsResolverParameters,
  type GetEnsResolverReturnType,
  getEnsResolver,
} from '../actions/getEnsResolver.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

  ExactPartial<GetEnsResolverParameters<config>> & ScopeKeyParameter
  >

  config: config,
  return {
    },
    queryKey: getEnsResolverQueryKey(options),
}

export type GetEnsResolverQueryFnData = GetEnsResolverReturnType

export type GetEnsResolverData = GetEnsResolverQueryFnData

export function getEnsResolverQueryKey<config extends Config>(
) {
  return ['ensResolver', filterQueryOptions(options)] as const
}

export type GetEnsResolverQueryKey<config extends Config> = ReturnType<
  typeof getEnsResolverQueryKey<config>
>
