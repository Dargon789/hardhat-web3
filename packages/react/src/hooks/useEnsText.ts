'use client'
import type { Config, GetEnsTextErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsTextData,
  type GetEnsTextOptions,
  getEnsTextQueryOptions,
} from '@wagmi/core/query'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsTextParameters<
  config extends Config = Config,
  selectData = GetEnsTextData,

export type UseEnsTextReturnType<selectData = GetEnsTextData> =
  UseQueryReturnType<selectData, GetEnsTextErrorType>

/** https://wagmi.sh/react/api/hooks/useEnsText */
export function useEnsText<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsTextData,
>(
  parameters: UseEnsTextParameters<config, selectData> = {},
): UseEnsTextReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getEnsTextQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
}
