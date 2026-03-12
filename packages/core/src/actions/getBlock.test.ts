import { config, mainnet } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlock } from './getBlock.js'

test('default', async () => {
  await expect(getBlock(config)).resolves.toBeDefined()
})

test('args: blockNumber', async () => {
  const { transactions, ...block } = await getBlock(config, {
    blockNumber: mainnet.fork.blockNumber,
  })
  expect(transactions).toMatchObject(
    expect.arrayContaining([expect.any(String)]),
  )
  expect(block).toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "difficulty": 0n,
      "extraData": "0x546974616e2028746974616e6275696c6465722e78797a29",
      "miner": "0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97",
      "nonce": "0x0000000000000000",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "totalDifficulty": null,
      "uncles": [],
      "withdrawals": [
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
        },
      ],
    }
  `)
})

test('args: includeTransactions', async () => {
  const { transactions } = await getBlock(config, {
    includeTransactions: true,
    blockNumber: mainnet.fork.blockNumber,
  })
  expect(transactions).toMatchObject(
    expect.arrayContaining([expect.any(Object)]),
  )
})
