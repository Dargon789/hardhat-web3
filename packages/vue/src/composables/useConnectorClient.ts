import { useQueryClient } from '@tanstack/vue-query'
import type {
  Config,
  Connector,
  GetConnectorClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  getConnectorClientQueryOptions,
} from '@wagmi/core/query'
import { computed, ref, watchEffect } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseConnectorClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = Compute<
  DeepMaybeRef<
  >
>

export type UseConnectorClientReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetConnectorClientErrorType>

/** https://wagmi.sh/vue/api/composables/useConnectorClient */
export function useConnectorClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
): UseConnectorClientReturnType<config, chainId, selectData> {
  )

  const addressRef = ref(address)
  watchEffect(() => {
    const previousAddress = addressRef.value
    if (!address && previousAddress) {
      addressRef.value = undefined
    } else if (address.value !== previousAddress) {
      addressRef.value = address.value
    }
  })

}
