import { address, chain, wait } from '@wagmi/test'
import type { Address } from 'viem'
import { useStorageAt } from './useStorageAt.js'

test('default', async () => {
    useStorageAt({
      address: address.wagmiMintExample,
      slot: '0x0',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x7761676d6900000000000000000000000000000000000000000000000000000a",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockNumber', async () => {
    useStorageAt({
      address: address.wagmiMintExample,
      blockNumber: 16280770n,
      slot: '0x0',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x7761676d6900000000000000000000000000000000000000000000000000000a",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": 16280770n,
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockTag', async () => {
    useStorageAt({
      address: address.wagmiMintExample,
      blockTag: 'safe',
      slot: '0x0',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x7761676d6900000000000000000000000000000000000000000000000000000a",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockTag": "safe",
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
    useStorageAt({
      address: address.wagmiMintExample,
      chainId: chain.optimism.id,
      slot: '0x0',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 10,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {
      useStorageAt({
        slot: '0x0',
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
        "getStorageAt",
        {
          "address": undefined,
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x7761676d6900000000000000000000000000000000000000000000000000000a",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 1,
          "slot": "0x0",
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
