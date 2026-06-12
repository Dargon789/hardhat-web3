import { connect, disconnect } from '@wagmi/core'
import { abi, address, config, wait } from '@wagmi/test'

import { useSimulateContract } from './useSimulateContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

    useSimulateContract({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "chainId": 1,
        "request": {
          "abi": [
            {
              "inputs": [],
              "name": "mint",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "account": {
            "type": "json-rpc",
          },
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "args": undefined,
          "chainId": 1,
          "dataSuffix": undefined,
          "functionName": "mint",
        },
        "result": undefined,
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
        "simulateContract",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 1,
          "functionName": "mint",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {

  await wait(100)
})
