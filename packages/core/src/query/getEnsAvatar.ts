import {
  type GetEnsAvatarErrorType,
  type GetEnsAvatarParameters,
  type GetEnsAvatarReturnType,
  getEnsAvatar,
} from '../actions/getEnsAvatar.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

    GetEnsAvatarQueryFnData,
    GetEnsAvatarErrorType,
    GetEnsAvatarQueryKey<config>
  >
}

export type GetEnsAvatarQueryFnData = GetEnsAvatarReturnType

export type GetEnsAvatarData = GetEnsAvatarQueryFnData

export function getEnsAvatarQueryKey<config extends Config>(
) {
  return ['ensAvatar', filterQueryOptions(options)] as const
}

export type GetEnsAvatarQueryKey<config extends Config> = ReturnType<
  typeof getEnsAvatarQueryKey<config>
>
