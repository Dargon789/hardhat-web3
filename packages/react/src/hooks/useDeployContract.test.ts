import { connect, disconnect } from '@wagmi/core'
import { abi, bytecode, config, transactionHashRegex } from '@wagmi/test'

import { useDeployContract } from './useDeployContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
  })

  expect(result.current.data).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
})
