import { connect, disconnect } from '@wagmi/core'
import * as React from 'react'
import { useConnect } from './useConnect.js'
import { useDisconnect } from './useDisconnect.js'
import { useSwitchChain } from './useSwitchChain.js'
import { useWalletClient } from './useWalletClient.js'

// Almost identical implementation to `useConnectorClient` (except for return type)
// Should update both in tandem

const connector = config.connectors[0]!

test('default', async () => {


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": undefined,
      "dataUpdatedAt": 0,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": false,
      "isFetchedAfterMount": false,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": true,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": false,
      "isSuccess": false,
      "queryKey": [
        "walletClient",
        {
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)
})

test('behavior: connected on mount', async () => {
  await connect(config, { connector })



  const { data, queryKey: _, ...rest } = result.current
  expect(data).toMatchObject(
    expect.objectContaining({
      account: expect.any(Object),
      chain: expect.any(Object),
    }),
  )
  expect(rest).toMatchInlineSnapshot(`
    {
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": false,
      "isSuccess": true,
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})

test('behavior: connect and disconnect', async () => {
    useConnect: useConnect(),
    useWalletClient: useWalletClient(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.current.useWalletClient.data).not.toBeDefined()

  result.current.useConnect.connect({
  })


  result.current.useDisconnect.disconnect()

    expect(result.current.useWalletClient.data).not.toBeDefined(),
  )
})

test('behavior: switch chains', async () => {
  await connect(config, { connector })

    useWalletClient: useWalletClient(),
    useSwitchChain: useSwitchChain(),
  }))

  expect(result.current.useWalletClient.data).not.toBeDefined()

  })
  expect(result.current.useWalletClient.data?.chain.id).toEqual(456)

  expect(result.current.useWalletClient.data?.chain.id).toEqual(1)

  await disconnect(config, { connector })
})

test('behavior: re-render does not invalidate query', async () => {


  })



})

function Parent() {
  const [renderCount, setRenderCount] = React.useState(1)

  const { data } = useWalletClient()

  return (
    <>
      <div data-testid="address">{address}</div>
      <div data-testid="client">{data?.uid}</div>
      <Child key={renderCount} renderCount={renderCount} />

      <button
        type="button"
        data-testid="connect"
        onClick={() => connect({ connector: connectors[0]! })}
      >
        Connect
      </button>
      <button
        type="button"
        data-testid="rerender"
        onClick={() => setRenderCount((prev) => prev + 1)}
      >
        Re-render
      </button>
    </>
  )
}

  const { renderCount } = props
  const { data } = useWalletClient()
  return (
    <div>
      <span data-testid="child-client">{data?.uid}</span>
      <span data-testid="render-count">{renderCount}</span>
    </div>
  )
}
