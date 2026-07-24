import {
  type GetBlockTransactionCountErrorType,
  type GetBlockTransactionCountParameters,
  type GetBlockTransactionCountReturnType,
  getBlockTransactionCount,
} from '../actions/getBlockTransactionCount.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { ExactPartial, UnionCompute } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockTransactionCountOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = UnionCompute<
  ExactPartial<GetBlockTransactionCountParameters<config, chainId>> &
    ScopeKeyParameter
  >

export function getBlockTransactionCountQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  return {
      const blockTransactionCount = await getBlockTransactionCount(
        config,
      )
      return blockTransactionCount ?? null
    },
    queryKey: getBlockTransactionCountQueryKey(options),
}

export type GetBlockTransactionCountQueryFnData =
  GetBlockTransactionCountReturnType

export type GetBlockTransactionCountData = GetBlockTransactionCountQueryFnData

export function getBlockTransactionCountQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return ['blockTransactionCount', filterQueryOptions(options)] as const
}

export type GetBlockTransactionCountQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlockTransactionCountQueryKey<config, chainId>>
