import { connect, disconnect } from '@wagmi/core'
import { accounts, config, testClient } from '@wagmi/test'
import { parseEther } from 'viem'

import { useCallsStatus } from './useCallsStatus.js'
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

    useCallsStatus({ id: result.current.data?.id! }),
  )

  expect(result_2.current.data).toMatchInlineSnapshot(
    `
    {
      "atomic": false,
      "chainId": 1,
      "receipts": [],
      "status": "pending",
      "statusCode": 100,
      "version": "2.0.0",
    }
  `,
  )

  await testClient.mainnet.mine({ blocks: 1 })

    useCallsStatus({ id: result.current.data?.id! }),
  )

  expect(result_3.current.data?.status).toBe('success')
  expect(result_3.current.data?.statusCode).toBe(200)
  expect(
    result_3.current.data?.receipts?.map((x) => ({
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

  await disconnect(config, { connector })
})
