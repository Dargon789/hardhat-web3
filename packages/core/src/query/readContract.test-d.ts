import { abi, config } from '@wagmi/test'

import { readContractQueryOptions } from './readContract.js'

test('default', async () => {
  const options = readContractQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
  })
  expectTypeOf(result).toEqualTypeOf<bigint>()
})
