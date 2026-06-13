'use client'
import type { Config, GetBalanceErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  getBalanceQueryOptions,
} from '@wagmi/core/query'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,

export type UseBalanceReturnType<selectData = GetBalanceData> =
  UseQueryReturnType<selectData, GetBalanceErrorType>

/** https://wagmi.sh/react/api/hooks/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(
  parameters: UseBalanceParameters<config, selectData> = {},
): UseBalanceReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getBalanceQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
}
