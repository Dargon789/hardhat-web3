import { connect, disconnect } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'
import { parseEther } from 'viem'

import { useSendCalls } from './useSendCalls.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })


    calls: [
      {
        data: '0xdeadbeef',
        to: accounts[1],
        value: parseEther('1'),
      },
      {
        to: accounts[2],
        value: parseEther('2'),
      },
      {
        to: accounts[3],
        value: parseEther('3'),
      },
    ],
  })

  expect(result.current.data).toMatchInlineSnapshot(
    `
    {
    }
  `,
  )

  await disconnect(config, { connector })
})
