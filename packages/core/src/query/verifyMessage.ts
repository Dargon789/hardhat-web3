import {
  type VerifyMessageErrorType,
  type VerifyMessageParameters,
  type VerifyMessageReturnType,
  verifyMessage,
} from '../actions/verifyMessage.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

  >

  config: config,
  return {
      return verified ?? null
    },
    queryKey: verifyMessageQueryKey(options),
  }
export type VerifyMessageQueryFnData = VerifyMessageReturnType

export type VerifyMessageData = VerifyMessageQueryFnData

export function verifyMessageQueryKey<config extends Config>(
) {
  return ['verifyMessage', filterQueryOptions(options)] as const
}

export type VerifyMessageQueryKey<config extends Config> = ReturnType<
  typeof verifyMessageQueryKey<config>
>
