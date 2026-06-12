import {
  type WaitForTransactionReceiptErrorType,
  type WaitForTransactionReceiptParameters,
  type WaitForTransactionReceiptReturnType,
  waitForTransactionReceipt,
} from '../actions/waitForTransactionReceipt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type WaitForTransactionReceiptOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<WaitForTransactionReceiptParameters<config, chainId>> &
    ScopeKeyParameter
  >

export function waitForTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  return {
      return waitForTransactionReceipt(config, {
        ...parameters,
        onReplaced: options.onReplaced,
      }) as unknown as Promise<
        WaitForTransactionReceiptReturnType<config, chainId>
      >
    },
    queryKey: waitForTransactionReceiptQueryKey(options),
}

export type WaitForTransactionReceiptQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = WaitForTransactionReceiptReturnType<config, chainId>

export type WaitForTransactionReceiptData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = WaitForTransactionReceiptQueryFnData<config, chainId>

export function waitForTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  const { onReplaced: _, ...rest } = options
  return ['waitForTransactionReceipt', filterQueryOptions(rest)] as const
}

export type WaitForTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof waitForTransactionReceiptQueryKey<config, chainId>>
