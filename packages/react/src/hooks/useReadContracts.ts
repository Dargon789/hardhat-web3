'use client'
import type {
  Config,
  ReadContractsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ReadContractsData,
  type ReadContractsOptions,
  readContractsQueryOptions,
} from '@wagmi/core/query'
import { useMemo } from 'react'
import type { ContractFunctionParameters } from 'viem'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseReadContractsParameters<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  config extends Config = Config,
  selectData = ReadContractsData<contracts, allowFailure>,
> = Compute<
>

export type UseReadContractsReturnType<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  selectData = ReadContractsData<contracts, allowFailure>,
> = UseQueryReturnType<selectData, ReadContractsErrorType>

/** https://wagmi.sh/react/api/hooks/useReadContracts */
export function useReadContracts<
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractsData<contracts, allowFailure>,
>(
  parameters: UseReadContractsParameters<
    contracts,
    allowFailure,
    config,
    selectData
  > = {},
): UseReadContractsReturnType<contracts, allowFailure, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
      )
  })
}
