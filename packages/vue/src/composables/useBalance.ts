import type { Config, GetBalanceErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  getBalanceQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,
> = Compute<
>

export type UseBalanceReturnType<selectData = GetBalanceData> =
  UseQueryReturnType<selectData, GetBalanceErrorType>

/** https://wagmi.sh/vue/api/composables/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(
): UseBalanceReturnType<selectData> {
}
