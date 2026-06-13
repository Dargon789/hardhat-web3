import {
  type GetBalanceErrorType,
  type GetBalanceParameters,
  type GetBalanceReturnType,
  getBalance,
} from '../actions/getBalance.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

  >

  config: config,
  return {
      const balance = await getBalance(config, {
        ...(parameters as GetBalanceParameters),
      })
      return balance ?? null
    },
    queryKey: getBalanceQueryKey(options),
}

export type GetBalanceQueryFnData = Compute<GetBalanceReturnType>

export type GetBalanceData = GetBalanceQueryFnData

export function getBalanceQueryKey<config extends Config>(
) {
  return ['balance', filterQueryOptions(options)] as const
}

export type GetBalanceQueryKey<config extends Config> = ReturnType<
  typeof getBalanceQueryKey<config>
>
