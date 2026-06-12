import { config, privateKey, typedData } from '@wagmi/test'
import { recoverTypedDataAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { useSignTypedData } from './useSignTypedData.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })


    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })

  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature: result.current.data!,
    }),

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {

  const account = privateKeyToAccount(privateKey)
    account,
    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })

  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature: result.current.data!,
    }),
  ).resolves.toEqual(account.address)
})
