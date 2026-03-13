import { connect, disconnect } from '@wagmi/core'
import { abi, address, config } from '@wagmi/test'

import { useWriteContract } from './useWriteContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })


    abi: abi.wagmiMintExample,
    address: address.wagmiMintExample,
    functionName: 'mint',
  })

  expect(result.current.data).toBeDefined()

  await disconnect(config, { connector })
})
