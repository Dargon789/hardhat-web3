import {
  type GetProofErrorType,
  type GetProofParameters,
  type GetProofReturnType,
  getProof,
} from '../actions/getProof.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

  >

  config: config,
  return {
        throw new Error('address and storageKeys are required')
    },
    queryKey: getProofQueryKey(options),
}

export type GetProofQueryFnData = GetProofReturnType

export type GetProofData = GetProofQueryFnData

export function getProofQueryKey<config extends Config>(
) {
  return ['getProof', filterQueryOptions(options)] as const
}

export type GetProofQueryKey<config extends Config> = ReturnType<
  typeof getProofQueryKey<config>
>
