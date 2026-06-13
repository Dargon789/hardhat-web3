import type { TypedData } from 'viem'

import {
  type VerifyTypedDataErrorType,
  type VerifyTypedDataParameters,
  type VerifyTypedDataReturnType,
  verifyTypedData,
} from '../actions/verifyTypedData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type VerifyTypedDataOptions<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,

export function verifyTypedDataQueryOptions<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  config: config,
  return {
      const verified = await verifyTypedData(config, {
      return verified ?? null
    },
}

export type VerifyTypedDataQueryFnData = VerifyTypedDataReturnType

export type VerifyTypedDataData = VerifyTypedDataQueryFnData

export function verifyTypedDataQueryKey<
  config extends Config,
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  return ['verifyTypedData', filterQueryOptions(options)] as const
}

export type VerifyTypedDataQueryKey<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
> = ReturnType<typeof verifyTypedDataQueryKey<config, typedData, primaryType>>
