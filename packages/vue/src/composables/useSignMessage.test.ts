import { config, privateKey } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { recoverMessageAddress } from 'viem'
import { expect, test } from 'vitest'
import { useSignMessage } from './useSignMessage.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [result] = renderComposable(() => useSignMessage())

  await waitFor(result.isSuccess)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.data.value!,
    }),

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const [result] = renderComposable(() => useSignMessage())

  const account = privateKeyToAccount(privateKey)
  await waitFor(result.isSuccess)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.data.value!,
    }),
  ).resolves.toEqual(account.address)
})
