import type {
  Config,
  GetTransactionErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetTransactionData,
  type GetTransactionOptions,
  getTransactionQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
> = Compute<
  DeepMaybeRef<
  >
>

export type UseTransactionReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
> = UseQueryReturnType<selectData, GetTransactionErrorType>

/** https://wagmi.sh/vue/api/composables/useTransaction */
export function useTransaction<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
>(
): UseTransactionReturnType<config, chainId, selectData> {
  )
}
