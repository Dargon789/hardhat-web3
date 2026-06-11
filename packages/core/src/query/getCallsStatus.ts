import {
  type GetCallsStatusErrorType,
  type GetCallsStatusParameters,
  type GetCallsStatusReturnType,
  getCallsStatus,
} from '../actions/getCallsStatus.js'
import type { Config } from '../createConfig.js'
import { filterQueryOptions } from '../query/utils.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'

  GetCallsStatusParameters & ScopeKeyParameter
  >

  config: config,
  return {
      const status = await getCallsStatus(config, parameters)
      return status
    },
    queryKey: getCallsStatusQueryKey(options),
}

export type GetCallsStatusQueryFnData = GetCallsStatusReturnType

export type GetCallsStatusData = GetCallsStatusQueryFnData

  return ['callsStatus', filterQueryOptions(options)] as const
}

export type GetCallsStatusQueryKey = ReturnType<typeof getCallsStatusQueryKey>
