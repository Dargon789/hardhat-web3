import type {
  Config,
  ResolvedRegister,
  WaitForTransactionReceiptErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type WaitForTransactionReceiptData,
  type WaitForTransactionReceiptOptions,
  waitForTransactionReceiptQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWaitForTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = Compute<
  DeepMaybeRef<
  >
>

export type UseWaitForTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = UseQueryReturnType<selectData, WaitForTransactionReceiptErrorType>

/** https://wagmi.sh/vue/api/composables/useWaitForTransactionReceipt */
export function useWaitForTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
>(
    config,
    chainId,
    selectData
  > = {},
): UseWaitForTransactionReceiptReturnType<config, chainId, selectData> {
}
