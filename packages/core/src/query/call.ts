import {
  type CallErrorType,
  type CallParameters,
  type CallReturnType,
  call,
} from '../actions/call.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

  ExactPartial<CallParameters<config>> & ScopeKeyParameter
  >

  config: config,
  return {
      const data = await call(config, {
        ...parameters,
      } as CallParameters)
      return data ?? null
    },
    queryKey: callQueryKey(options),
}

export type CallQueryFnData = CallReturnType

export type CallData = CallQueryFnData

export function callQueryKey<config extends Config>(
) {
  return ['call', filterQueryOptions(options)] as const
}

export type CallQueryKey<config extends Config> = ReturnType<
  typeof callQueryKey<config>
>
