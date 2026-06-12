import { expectTypeOf, test } from 'vitest'
import { useChains } from 'wagmi'

test('default', () => {
  const chains = useChains()

  expectTypeOf(chains[0]).toEqualTypeOf<typeof celo>()
  expectTypeOf(chains[2]).toEqualTypeOf<typeof optimism>()
})
