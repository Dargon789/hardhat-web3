import { accounts, address, chain } from '@wagmi/test'

import { useCall } from './useCall.js'

const name4bytes = '0x06fdde03'

const account = accounts[0]

test('default', async () => {
    useCall({
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
      },
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "call",
        {
          "chainId": 1,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

    useCall({
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      blockTag: 'safe',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
      },
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "call",
        {
          "blockTag": "safe",
          "chainId": 1,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

    useCall({
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      blockNumber: 16280770n,
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
      },
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "call",
        {
          "blockNumber": 16280770n,
          "chainId": 1,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
    useCall({
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      chainId: chain.mainnet2.id,
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
      },
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "call",
        {
          "chainId": 456,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
