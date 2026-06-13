import {
  type GetCapabilitiesErrorType,
  type GetCapabilitiesParameters,
  type GetCapabilitiesReturnType,
  getCapabilities,
} from '../actions/getCapabilities.js'
import type { Config } from '../createConfig.js'
import { filterQueryOptions } from '../query/utils.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'

export type GetCapabilitiesOptions<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = Compute<
  ExactPartial<GetCapabilitiesParameters<config, chainId>> & ScopeKeyParameter
  >

export function getCapabilitiesQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  return {
      const capabilities = await getCapabilities(config, parameters)
      return capabilities
    },
    queryKey: getCapabilitiesQueryKey(options),
}

export type GetCapabilitiesQueryFnData<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = GetCapabilitiesReturnType<config, chainId>

export type GetCapabilitiesData<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = GetCapabilitiesQueryFnData<config, chainId>

export function getCapabilitiesQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  return ['capabilities', filterQueryOptions(options)] as const
}

export type GetCapabilitiesQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = ReturnType<typeof getCapabilitiesQueryKey<config, chainId>>
