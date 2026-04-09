import { connect, disconnect } from '@wagmi/core'
import { accounts, config, testClient, wait } from '@wagmi/test'
import { parseEther } from 'viem'

import { useSendCalls } from './useSendCalls.js'
import { useWaitForCallsStatus } from './useWaitForCallsStatus.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

    useWaitForCallsStatus({ id: useSendCalls_render.result.current.data?.id }),
  )

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

  expect(useWaitForCallsStatus_render.result.current.fetchStatus).toBe('idle')
  useWaitForCallsStatus_render.rerender()
  expect(useWaitForCallsStatus_render.result.current.fetchStatus).toBe(
    'fetching',
  )

  await testClient.mainnet.mine({ blocks: 1 })

  expect(useWaitForCallsStatus_render.result.current.data?.status).toBe(
    'success',
  )
  expect(
    useWaitForCallsStatus_render.result.current.data?.receipts?.map((x) => ({
      ...x,
      blockHash: undefined,
    })),
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

  await testClient.mainnet.mine({ blocks: 1 })

  await disconnect(config, { connector })
})
