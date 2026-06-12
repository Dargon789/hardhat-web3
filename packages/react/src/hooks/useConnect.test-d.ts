import type {
  ConnectErrorType,
  Connector,
  CreateConnectorFn,
} from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useConnect } from './useConnect.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('context', () => {
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: Connector | CreateConnectorFn
        }>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: Connector | CreateConnectorFn
        }>()
        expectTypeOf(error).toEqualTypeOf<ConnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: Connector | CreateConnectorFn
        }>()
        expectTypeOf(data).toEqualTypeOf<{
          chainId: number
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          | {
              chainId: number
            }
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ConnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: Connector | CreateConnectorFn
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

    | {
        chainId: number
      }
    | undefined
  >()
    | {
        chainId?: number | undefined
        connector: CreateConnectorFn | Connector
      }
    | undefined
  >()

    {
      connector,
      foo: 'bar',
    },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: typeof connector | CreateConnectorFn
          foo?: string | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<ConnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: typeof connector | CreateConnectorFn
          foo?: string | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<{
          accounts: readonly [Address, ...Address[]]
          chainId: number
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          | {
              accounts: readonly [Address, ...Address[]]
              chainId: number
            }
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ConnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: typeof connector | CreateConnectorFn
          foo?: string | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
