import { accounts, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { verifyMessageQueryOptions } from './verifyMessage.js'

const address = accounts[0]

test('default', () => {
  expect(
    verifyMessageQueryOptions(config, {
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "verifyMessage",
        {
          "message": "This is a test message for viem!",
          "signature": "0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    verifyMessageQueryOptions(config, {
      chainId: chain.mainnet2.id,
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "verifyMessage",
        {
          "chainId": 456,
          "message": "This is a test message for viem!",
          "signature": "0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c",
        },
      ],
    }
  `)
})

test('parameters: blockNumber', () => {
  expect(
    verifyMessageQueryOptions(config, {
      blockNumber: 1234567890n,
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "verifyMessage",
        {
          "blockNumber": 1234567890n,
          "message": "This is a test message for viem!",
          "signature": "0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c",
        },
      ],
    }
  `)
})

test('parameters: blockTag', () => {
  expect(
    verifyMessageQueryOptions(config, {
      blockTag: 'safe',
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "verifyMessage",
        {
          "blockTag": "safe",
          "message": "This is a test message for viem!",
          "signature": "0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c",
        },
      ],
    }
  `)
})
