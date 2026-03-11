import { config, privateKey } from '@wagmi/test'
import { recoverMessageAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { useSignMessage } from './useSignMessage.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })



  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.current.data!,
    }),

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {

  const account = privateKeyToAccount(privateKey)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.current.data!,
    }),
  ).resolves.toEqual(account.address)
})
