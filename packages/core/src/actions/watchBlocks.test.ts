import { config, testClient, wait } from '@wagmi/test'
import type { Block } from 'viem'
import { watchBlocks } from './watchBlocks.js'

test('default', async () => {
  const blocks: Block[] = []
  const unwatch = watchBlocks(config, {
    onBlock(block) {
      blocks.push(block)
    },
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet.mine({ blocks: 1 })

  expect(blocks.length).toBe(3)

  unwatch()
})
