import { testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Block } from 'viem'

import { useWatchBlocks } from './useWatchBlocks.js'

test('default', async () => {
  const blocks: Block[] = []
    useWatchBlocks({
      onBlock(block) {
        blocks.push(block)
      },
    }),
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet.mine({ blocks: 1 })

  expect(blocks.length).toBe(3)
})
