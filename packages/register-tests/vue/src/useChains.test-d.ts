import { useChains } from '@wagmi/vue'
import { expectTypeOf, test } from 'vitest'

test('default', () => {
  const chains = useChains()

  expectTypeOf(chains.value[0]).toEqualTypeOf<typeof celo>()
  expectTypeOf(chains.value[2]).toEqualTypeOf<typeof optimism>()
})
