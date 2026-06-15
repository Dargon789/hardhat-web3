import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { estimateFeesPerGas } from './estimateFeesPerGas.js'

test('types', async () => {
      gasPrice?: undefined
      maxFeePerGas: bigint
      maxPriorityFeePerGas: bigint
    }>()

      gasPrice: bigint
      maxFeePerGas?: undefined
      maxPriorityFeePerGas?: undefined
    }>()

      gasPrice?: undefined
      maxFeePerGas: bigint
      maxPriorityFeePerGas: bigint
    }>()
})
