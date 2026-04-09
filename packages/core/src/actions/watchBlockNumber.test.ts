import { config, testClient, wait } from '@wagmi/test'

import { watchBlockNumber } from './watchBlockNumber.js'

test('default', async () => {
  const blockNumbers: bigint[] = []
  const unwatch = watchBlockNumber(config, {
    onBlockNumber(blockNumber) {
      blockNumbers.push(blockNumber)
    },
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })

  expect(blockNumbers.length).toBe(3)

  unwatch()
})
