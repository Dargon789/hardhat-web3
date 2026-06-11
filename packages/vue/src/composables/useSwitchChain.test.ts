import { connect, disconnect } from '@wagmi/core'
import { chain, config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [switchChain] = renderComposable(() => useSwitchChain())

  expect(chainId1).toBeDefined()

  await waitFor(switchChain.isSuccess)

  expect(chainId2).toBeDefined()
  expect(chainId1).not.toBe(chainId2)

  await waitFor(switchChain.isSuccess)

  expect(chainId3).toBeDefined()
  expect(chainId1).toBe(chainId3)

  await disconnect(config, { connector })
})
