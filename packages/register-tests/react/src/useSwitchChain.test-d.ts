import { expectTypeOf, test } from 'vitest'
import { useSwitchChain } from 'wagmi'

test('default', () => {

    { chainId: 1 },
    {
      onSuccess(data) {
        expectTypeOf(data).toEqualTypeOf(mainnet)
      },
    },
  )

  expectTypeOf<Result['chainId']>().toEqualTypeOf<ChainId>()
})
