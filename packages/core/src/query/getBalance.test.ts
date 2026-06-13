import { accounts, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBalanceQueryOptions } from './getBalance.js'

const address = accounts[0]

test('default', () => {
  expect(getBalanceQueryOptions(config, { address })).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "balance",
        {
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getBalanceQueryOptions(config, { address, chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "balance",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
