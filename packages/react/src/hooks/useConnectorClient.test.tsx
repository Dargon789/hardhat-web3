import { connect, disconnect } from '@wagmi/core'
import { config, wait } from '@wagmi/test'
import * as React from 'react'
import { useConnect } from './useConnect.js'
import { useConnectorClient } from './useConnectorClient.js'
import { useDisconnect } from './useDisconnect.js'
import { useSwitchChain } from './useSwitchChain.js'

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
        "connectorClient",
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
    useConnectorClient: useConnectorClient(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.current.useConnectorClient.data).not.toBeDefined()

  result.current.useConnect.connect({
  })

    expect(result.current.useConnectorClient.data).toBeDefined(),
  )

  result.current.useDisconnect.disconnect()

    expect(result.current.useConnectorClient.data).not.toBeDefined(),
  )
})

test('behavior: switch chains', async () => {
  await connect(config, { connector })

    useConnectorClient: useConnectorClient(),
    useSwitchChain: useSwitchChain(),
  }))

  expect(result.current.useConnectorClient.data).not.toBeDefined()
    expect(result.current.useConnectorClient.data).toBeDefined(),
  )

  })
  expect(result.current.useConnectorClient.data?.chain.id).toEqual(456)

  expect(result.current.useConnectorClient.data?.chain.id).toEqual(1)

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {

})

test('behavior: disabled when connecting', async () => {

  config.setState((x) => ({ ...x, status: 'connecting' }))

  expect(result.current.isLoading).not.toBeTruthy()
})

test('behavior: re-render does not invalidate query', async () => {

  )

})

  })

})

function Parent() {
  const [renderCount, setRenderCount] = React.useState(1)

  const { data } = useConnectorClient()

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
  const { data } = useConnectorClient()
  return (
    <div>
      <span data-testid="child-client">{data?.uid}</span>
      <span data-testid="render-count">{renderCount}</span>
    </div>
  )
}
