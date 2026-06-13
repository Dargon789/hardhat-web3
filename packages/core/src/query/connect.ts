import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type ConnectErrorType,
  type ConnectParameters,
  type ConnectReturnType,
  connect,
} from '../actions/connect.js'
import type { Config, Connector } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

export function connectMutationOptions<config extends Config>(config: config) {
  return {
    mutationFn(variables) {
      return connect(config, variables)
    },
    mutationKey: ['connect'],
  } as const satisfies MutationOptions<
    ConnectErrorType,
  >
}


export type ConnectVariables<
  config extends Config,
  connector extends Connector | CreateConnectorFn,

export type ConnectMutate<config extends Config, context = unknown> = <
  connector extends
    | config['connectors'][number]
    | Connector
    | CreateConnectorFn,
>(
  options?:
    | Compute<
        MutateOptions<
          ConnectErrorType,
          context
        >
      >
    | undefined,
) => void

export type ConnectMutateAsync<config extends Config, context = unknown> = <
  connector extends
    | config['connectors'][number]
    | Connector
    | CreateConnectorFn,
>(
  options?:
    | Compute<
        MutateOptions<
          ConnectErrorType,
          context
        >
      >
    | undefined,
