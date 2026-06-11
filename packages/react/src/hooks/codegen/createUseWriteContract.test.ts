import { renderHook } from '@wagmi/test/react'

import { createUseWriteContract } from './createUseWriteContract.js'

test('default', () => {
  const useWriteErc20 = createUseWriteContract({
    abi: abi.erc20,
  })

  renderHook(() => useWriteErc20())
})
