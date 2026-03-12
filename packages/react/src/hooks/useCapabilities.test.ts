import { connect, disconnect } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'

import { useCapabilities } from './useCapabilities.js'

const connector = config.connectors[0]!

test('mounts', async () => {
  await connect(config, { connector })



    {
      "data": {
        "8453": {
          "paymasterService": {
            "supported": true,
          },
          "sessionKeys": {
            "supported": true,
          },
        },
        "84532": {
          "paymasterService": {
            "supported": true,
          },
        },
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
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})

test('args: account', async () => {
  await connect(config, { connector })



    {
      "data": {
        "8453": {
          "paymasterService": {
            "supported": false,
          },
          "sessionKeys": {
            "supported": true,
          },
        },
        "84532": {
          "paymasterService": {
            "supported": false,
          },
        },
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
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})
