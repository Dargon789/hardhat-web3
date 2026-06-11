'use client'
import type {
  Config,
  ResolvedRegister,
  VerifyTypedDataErrorType,
} from '@wagmi/core'
import {
  type VerifyTypedDataData,
  type VerifyTypedDataOptions,
  verifyTypedDataQueryOptions,
} from '@wagmi/core/query'
import type { TypedData } from 'viem'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseVerifyTypedDataParameters<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  config extends Config = Config,
  selectData = VerifyTypedDataData,

export type UseVerifyTypedDataReturnType<selectData = VerifyTypedDataData> =
  UseQueryReturnType<selectData, VerifyTypedDataErrorType>

/** https://wagmi.sh/react/api/hooks/useVerifyTypedData */
export function useVerifyTypedData<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config = ResolvedRegister['config'],
  selectData = VerifyTypedDataData,
>(
  parameters: UseVerifyTypedDataParameters<
    typedData,
    primaryType,
    config,
    selectData
  > = {} as any,
): UseVerifyTypedDataReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
    chainId: parameters.chainId ?? chainId,
}
