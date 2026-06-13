import {
  type GetBytecodeErrorType,
  type GetBytecodeParameters,
  type GetBytecodeReturnType,
  getBytecode,
} from '../actions/getBytecode.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

  >

  config: config,
  return {
      return (bytecode ?? null) as any
    },
    queryKey: getBytecodeQueryKey(options),
  }
export type GetBytecodeQueryFnData = GetBytecodeReturnType

export type GetBytecodeData = GetBytecodeQueryFnData

export function getBytecodeQueryKey<config extends Config>(
) {
  return ['getBytecode', filterQueryOptions(options)] as const
}

export type GetBytecodeQueryKey<config extends Config> = ReturnType<
  typeof getBytecodeQueryKey<config>
>
