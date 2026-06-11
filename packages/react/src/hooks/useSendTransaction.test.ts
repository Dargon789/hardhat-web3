import { connect, disconnect } from '@wagmi/core'
import { config, transactionHashRegex } from '@wagmi/test'
import { parseEther } from 'viem'

import { useSendTransaction } from './useSendTransaction.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })


    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })

  expect(result.current.data).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
})
