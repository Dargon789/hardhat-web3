'use client'
import { useQueryClient } from '@tanstack/react-query'
import type {
  Config,
  GetBlockNumberErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type {
  Compute,
  UnionCompute,
  UnionStrictOmit,
} from '@wagmi/core/internal'
import {
  type GetBlockNumberData,
  type GetBlockNumberOptions,
  getBlockNumberQueryOptions,
} from '@wagmi/core/query'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import {
  type UseWatchBlockNumberParameters,
  useWatchBlockNumber,
} from './useWatchBlockNumber.js'

export type UseBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
> = Compute<
      watch?:
        | boolean
        | UnionCompute<
            UnionStrictOmit<
              UseWatchBlockNumberParameters<config, chainId>,
              'chainId' | 'config' | 'onBlockNumber' | 'onError'
            >
          >
        | undefined
    }
>

export type UseBlockNumberReturnType<selectData = GetBlockNumberData> =
  UseQueryReturnType<selectData, GetBlockNumberErrorType>

/** https://wagmi.sh/react/api/hooks/useBlockNumber */
export function useBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
>(
  parameters: UseBlockNumberParameters<config, chainId, selectData> = {},
): UseBlockNumberReturnType<selectData> {
  const config = useConfig(parameters)
  const options = getBlockNumberQueryOptions(config, {
    ...parameters,
  })
  useWatchBlockNumber({
    ...({
      config: parameters.config,
      chainId: parameters.chainId,
    } as UseWatchBlockNumberParameters),
    enabled: Boolean(
    ),
    onBlockNumber(blockNumber) {
      queryClient.setQueryData(options.queryKey, blockNumber)
    },
  })
}
