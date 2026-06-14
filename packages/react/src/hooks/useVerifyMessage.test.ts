import type { Hex } from 'viem'
import { useVerifyMessage } from './useVerifyMessage.js'


test('default', async () => {
    useVerifyMessage({
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
    useVerifyMessage({
      chainId: chain.mainnet2.id,
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "chainId": 456,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockNumber', async () => {
    useVerifyMessage({
      blockNumber: 12345678n,
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "blockNumber": 12345678n,
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockTag', async () => {
    useVerifyMessage({
      blockTag: 'pending',
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "blockTag": "pending",
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: signature: undefined -> defined', async () => {
      useVerifyMessage({
        address,
        message: 'This is a test message for viem!',
      }),
  )

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
        "verifyMessage",
        {
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": undefined,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)



  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {

  await wait(100)
})
