import { accounts, config, testClient } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getCallsStatus } from './getCallsStatus.js'
import { sendCalls } from './sendCalls.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const { id } = await sendCalls(config, {
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
  await testClient.mainnet.mine({ blocks: 1 })
  const { receipts, status } = await getCallsStatus(config, {
    id,
  })

  expect(status).toBe('success')
  expect(
    receipts?.map((x) => ({ ...x, blockHash: undefined })),
  ).toMatchInlineSnapshot(
    `
    [
      {
        "blockHash": undefined,
        "logs": [],
        "status": "success",
      },
      {
        "blockHash": undefined,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
      },
      {
        "blockHash": undefined,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
      },
    ]
  `,
  )
  await disconnect(config, { connector })
})
