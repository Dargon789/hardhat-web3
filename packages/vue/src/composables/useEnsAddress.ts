import type {
  Config,
  GetEnsAddressErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsAddressData,
  type GetEnsAddressOptions,
  getEnsAddressQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAddressParameters<
  config extends Config = Config,
  selectData = GetEnsAddressData,
> = Compute<
  DeepMaybeRef<
  >
>

export type UseEnsAddressReturnType<selectData = GetEnsAddressData> =
  UseQueryReturnType<selectData, GetEnsAddressErrorType>

/** https://wagmi.sh/vue/api/composables/useEnsAddress */
export function useEnsAddress<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAddressData,
>(
): UseEnsAddressReturnType<selectData> {
}
