import { connect, disconnect } from '@wagmi/core'
import { chain, config } from '@wagmi/test'

import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

    useSwitchChain: useSwitchChain(),
  }))

  expect(chainId1).toBeDefined()

    expect(result.current.useSwitchChain.isSuccess).toBeTruthy(),
  )

  expect(chainId2).toBeDefined()
  expect(chainId1).not.toBe(chainId2)

    expect(result.current.useSwitchChain.isSuccess).toBeTruthy(),
  )

  expect(chainId3).toBeDefined()
  expect(chainId1).toBe(chainId3)

  await disconnect(config, { connector })
})
