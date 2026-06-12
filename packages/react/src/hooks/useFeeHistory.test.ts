import { chain, wait } from '@wagmi/test'

import { useFeeHistory } from './useFeeHistory.js'

test('default', async () => {
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
    }),
  )


  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      chainId: chain.mainnet2.id,
    }),
  )


  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "chainId": 456,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockNumber', async () => {
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockNumber: 18677379n,
    }),
  )


  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "blockNumber": 18677379n,
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockTag', async () => {
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockTag: 'safe',
    }),
  )


  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "blockTag": "safe",
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: blockCount: undefined -> defined', async () => {
      useFeeHistory({
        rewardPercentiles: [25, 75],
      }),
  )

  {
    const { data, ...rest } = result.current
    expect(data).toBeTypeOf('undefined')
    expect(rest).toMatchInlineSnapshot(`
      {
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
          "feeHistory",
          {
            "blockCount": undefined,
            "chainId": 1,
            "rewardPercentiles": [
              25,
              75,
            ],
          },
        ],
        "refetch": [Function],
        "status": "pending",
      }
    `)
  }



  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: rewardPercentiles: undefined -> defined', async () => {
      useFeeHistory({
        blockCount: 4,
      }),
  )

  {
    const { data, ...rest } = result.current
    expect(data).toBeTypeOf('undefined')
    expect(rest).toMatchInlineSnapshot(`
      {
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
          "feeHistory",
          {
            "blockCount": 4,
            "chainId": 1,
            "rewardPercentiles": undefined,
          },
        ],
        "refetch": [Function],
        "status": "pending",
      }
    `)
  }



  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
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
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
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
