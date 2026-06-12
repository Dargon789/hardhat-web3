import { accounts, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionCountQueryOptions } from './getTransactionCount.js'

const address = accounts[0]

test('default', () => {
  expect(
    getTransactionCountQueryOptions(config, { address }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "transactionCount",
        {
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getTransactionCountQueryOptions(config, {
      address,
      chainId: chain.mainnet.id,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "transactionCount",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})

test('parameters: blockNumber', () => {
  expect(
    getTransactionCountQueryOptions(config, {
      address,
      blockNumber: 13677382n,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "transactionCount",
        {
          "blockNumber": 13677382n,
        },
      ],
    }
  `)
})

test('parameters: blockTag', () => {
  expect(
    getTransactionCountQueryOptions(config, {
      address,
      blockTag: 'earliest',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "transactionCount",
        {
          "blockTag": "earliest",
        },
      ],
    }
  `)
})
