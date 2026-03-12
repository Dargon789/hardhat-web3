import {
  type WaitForCallsStatusErrorType,
  type WaitForCallsStatusParameters,
  type WaitForCallsStatusReturnType,
  waitForCallsStatus,
} from '../actions/waitForCallsStatus.js'
import type { Config } from '../createConfig.js'
import { filterQueryOptions } from '../query/utils.js'
import type { ScopeKeyParameter } from '../types/properties.js'

    >

  config: config,
  return {
      return status
    },
    queryKey: waitForCallsStatusQueryKey(options),
}

export type WaitForCallsStatusQueryFnData = WaitForCallsStatusReturnType

export type WaitForCallsStatusData = WaitForCallsStatusQueryFnData

  return ['callsStatus', filterQueryOptions(options)] as const
}

export type WaitForCallsStatusQueryKey = ReturnType<
  typeof waitForCallsStatusQueryKey
>
