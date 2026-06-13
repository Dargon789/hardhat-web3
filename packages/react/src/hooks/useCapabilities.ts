'use client'
import type {
  Config,
  GetCapabilitiesErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetCapabilitiesData,
  type GetCapabilitiesOptions,
  getCapabilitiesQueryOptions,
} from '@wagmi/core/query'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseCapabilitiesParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetCapabilitiesData<config, chainId>,
> = Compute<
>

export type UseCapabilitiesReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetCapabilitiesData<config, chainId>,
> = UseQueryReturnType<selectData, GetCapabilitiesErrorType>

/** https://wagmi.sh/react/api/hooks/useCapabilities */
export function useCapabilities<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetCapabilitiesData<config, chainId>,
>(
  parameters: UseCapabilitiesParameters<config, chainId, selectData> = {},
): UseCapabilitiesReturnType<config, chainId, selectData> {
  const config = useConfig(parameters)
  const options = getCapabilitiesQueryOptions(config, {
    ...parameters,
  })
}
