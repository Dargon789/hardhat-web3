import { testClient } from '@wagmi/test'

import { useBlockNumber } from './useBlockNumber.js'

test('mounts', async () => {
  await testClient.mainnet.resetFork()



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
        "blockNumber",
        {
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: watch', async () => {
  await testClient.mainnet.restart()


  const blockNumber = result.current.data!

  await testClient.mainnet.mine({ blocks: 1 })
    expect(result.current.data).toEqual(blockNumber + 1n)
  })

  await testClient.mainnet.mine({ blocks: 1 })
    expect(result.current.data).toEqual(blockNumber + 2n)
  })
})
