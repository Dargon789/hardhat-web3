import { useEnsResolver } from './useEnsResolver.js'

test('default', async () => {
    useEnsResolver({
      name: 'wevm.eth',
    }),
  )


  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
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
        "ensResolver",
        {
          "chainId": 1,
          "name": "wevm.eth",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
