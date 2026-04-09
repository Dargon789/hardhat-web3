import { useSwitchChain } from '@wagmi/vue'
import { expectTypeOf, test } from 'vitest'


test('default', () => {
  const switchChain = useSwitchChain()

  switchChain.switchChain(
    { chainId: 1 },
    {
      onSuccess(data) {
        expectTypeOf(data).toEqualTypeOf(mainnet)
      },
    },
  )

  type Result = Parameters<(typeof switchChain)['switchChain']>[0]
  expectTypeOf<Result['chainId']>().toEqualTypeOf<ChainId>()
})
