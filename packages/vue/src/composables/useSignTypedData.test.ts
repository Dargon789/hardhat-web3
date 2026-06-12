import { config, privateKey, typedData } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { recoverTypedDataAddress } from 'viem'
import { expect, test } from 'vitest'
import { useSignTypedData } from './useSignTypedData.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [result] = renderComposable(() => useSignTypedData())

    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })
  await waitFor(result.isSuccess)

  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature: result.data.value!,
    }),

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const [result] = renderComposable(() => useSignTypedData())

  const account = privateKeyToAccount(privateKey)
    account,
    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })
  await waitFor(result.isSuccess)

  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature: result.data.value!,
    }),
  ).resolves.toEqual(account.address)
})
