import {
  type GetBlockNumberErrorType,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
} from '../actions/getBlockNumber.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockNumberOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetBlockNumberParameters<config, chainId>> & ScopeKeyParameter
  >

export function getBlockNumberQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return {
    gcTime: 0,
      const blockNumber = await getBlockNumber(config, parameters)
      return blockNumber ?? null
    },
    queryKey: getBlockNumberQueryKey(options),
}

export type GetBlockNumberQueryFnData = GetBlockNumberReturnType

export type GetBlockNumberData = GetBlockNumberQueryFnData

export function getBlockNumberQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  return ['blockNumber', filterQueryOptions(options)] as const
}

export type GetBlockNumberQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlockNumberQueryKey<config, chainId>>
