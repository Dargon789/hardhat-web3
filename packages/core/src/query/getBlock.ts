import type { BlockTag } from 'viem'

import {
  type GetBlockErrorType,
  type GetBlockParameters,
  type GetBlockReturnType,
  getBlock,
} from '../actions/getBlock.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockOptions<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  ExactPartial<
    GetBlockParameters<includeTransactions, blockTag, config, chainId>
  > &
    ScopeKeyParameter
  >

export function getBlockQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  return {
      return (block ?? null) as any
    },
    queryKey: getBlockQueryKey(options),
}

export type GetBlockQueryFnData<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetBlockReturnType<includeTransactions, blockTag, config, chainId>

export type GetBlockData<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetBlockQueryFnData<includeTransactions, blockTag, config, chainId>

export function getBlockQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
>(
) {
  return ['block', filterQueryOptions(options)] as const
}

export type GetBlockQueryKey<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<
  typeof getBlockQueryKey<config, chainId, includeTransactions, blockTag>
>
