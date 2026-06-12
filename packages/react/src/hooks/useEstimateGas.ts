'use client'
import type {
  Config,
  EstimateGasErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import {
  type EstimateGasData,
  type EstimateGasOptions,
  estimateGasQueryOptions,
} from '@wagmi/core/query'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEstimateGasParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,

export type UseEstimateGasReturnType<selectData = EstimateGasData> =
  UseQueryReturnType<selectData, EstimateGasErrorType>

/** https://wagmi.sh/react/api/hooks/useEstimateGas */
export function useEstimateGas<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
>(
  parameters?: UseEstimateGasParameters<config, chainId, selectData>,
): UseEstimateGasReturnType<selectData>

export function useEstimateGas(
  parameters: UseEstimateGasParameters = {},
): UseEstimateGasReturnType {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = estimateGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
}
