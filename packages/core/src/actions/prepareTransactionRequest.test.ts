import { accounts, config, privateKey } from '@wagmi/test'
import { parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { prepareTransactionRequest } from './prepareTransactionRequest.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const request = await prepareTransactionRequest(config, {
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })

  const {
    gas: _gas,
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)

  await disconnect(config, { connector })
})

test('parameters: account', async () => {
  await connect(config, { connector })

  const request = await prepareTransactionRequest(config, {
    account: accounts[0],
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })

  const {
    gas: _gas,
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const account = privateKeyToAccount(privateKey)

  const request = await prepareTransactionRequest(config, {
    account,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })

  const {
    gas: _gas,
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "account": {
        "nonceManager": undefined,
        "sign": [Function],
        "signAuthorization": [Function],
        "signMessage": [Function],
        "signTransaction": [Function],
        "signTypedData": [Function],
        "source": "privateKey",
        "type": "local",
      },
      "chainId": 1,
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)
})
