'use client'
import { useQueryClient } from '@tanstack/react-query'
import type { Config, GetBlockErrorType, ResolvedRegister } from '@wagmi/core'
import type {
  Compute,
  UnionCompute,
  UnionStrictOmit,
} from '@wagmi/core/internal'
import {
  type GetBlockData,
  type GetBlockOptions,
  getBlockQueryOptions,
} from '@wagmi/core/query'
import type { BlockTag } from 'viem'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import {
  type UseWatchBlocksParameters,
  useWatchBlocks,
} from './useWatchBlocks.js'

export type UseBlockParameters<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
> = Compute<
      watch?:
        | boolean
        | UnionCompute<
            UnionStrictOmit<
              UseWatchBlocksParameters<
                includeTransactions,
                blockTag,
                config,
                chainId
              >,
              'chainId' | 'config' | 'onBlock' | 'onError'
            >
          >
        | undefined
    }
>

export type UseBlockReturnType<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
> = UseQueryReturnType<selectData, GetBlockErrorType>

/** https://wagmi.sh/react/hooks/useBlock */
export function useBlock<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
>(
  parameters: UseBlockParameters<
    includeTransactions,
    blockTag,
    config,
    chainId,
    selectData
  > = {},
): UseBlockReturnType<
  includeTransactions,
  blockTag,
  config,
  chainId,
  selectData
> {
  const config = useConfig(parameters)
  const options = getBlockQueryOptions(config, {
    ...parameters,
  })
  useWatchBlocks({
    ...({
      config: parameters.config,
      chainId: parameters.chainId!,
    } as UseWatchBlocksParameters),
    enabled: Boolean(
    ),
    onBlock(block) {
      queryClient.setQueryData(options.queryKey, block)
    },
  })
}
