import { accounts } from '@wagmi/test'
import { type Address, parseEther } from 'viem'

import { useEstimateGas } from './useEstimateGas.js'

test('default', async () => {
    useEstimateGas({
      account: accounts[0],
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": 21000n,
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
        "estimateGas",
        {
          "chainId": 1,
          "to": "0xd2135CfB216b74109775236E36d4b433F1DF507B",
          "value": 10000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {

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
        "estimateGas",
        {
          "account": undefined,
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)



  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": 53001n,
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
        "estimateGas",
        {
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
