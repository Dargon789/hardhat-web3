import { QueryClientProvider } from '@tanstack/react-query'
import { abi, address, bytecode, chain, config, wait } from '@wagmi/test'
import { createElement } from 'react'

import { useReadContract } from './useReadContract.js'

test('default', async () => {
    useReadContract({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "readContract",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "args": [
            "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          ],
          "chainId": 1,
          "functionName": "balanceOf",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
    useReadContract({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      chainId: chain.mainnet2.id,
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "readContract",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "args": [
            "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          ],
          "chainId": 456,
          "functionName": "balanceOf",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: config', async () => {
    () =>
      useReadContract({
        address: address.wagmiMintExample,
        abi: abi.wagmiMintExample,
        functionName: 'balanceOf',
        args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        config,
      }),
    {
      wrapper: ({ children }) =>
        createElement(QueryClientProvider, { client: queryClient }, children),
    },
  )


  expect(result.current).toMatchInlineSnapshot(`
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "readContract",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "args": [
            "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          ],
          "chainId": 1,
          "functionName": "balanceOf",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: deployless read (bytecode)', async () => {
    useReadContract({
      abi: abi.wagmiMintExample,
      functionName: 'name',
      code: bytecode.wagmiMintExample,
    }),
  )


  expect(result.current.data).toMatchInlineSnapshot(`"wagmi"`)
})

test('behavior: disabled when properties missing', async () => {

  await wait(100)
})
