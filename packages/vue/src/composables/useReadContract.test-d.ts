import { abi } from '@wagmi/test'
import type { Address } from 'viem'

import type { DeepUnwrapRef } from '../types/ref.js'
import {
  type UseReadContractParameters,
  type UseReadContractReturnType,
  useReadContract,
} from './useReadContract.js'

test('select data', () => {
  const result = useReadContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<bigint>()
        return data?.toString()
      },
    },
  })
  expectTypeOf(result.data.value).toEqualTypeOf<string | undefined>()
})

test('UseReadContractParameters', () => {
  type Result = DeepUnwrapRef<
    UseReadContractParameters<typeof abi.erc20, 'balanceOf'>
  >
  expectTypeOf<{
    functionName?:
      | 'symbol'
      | 'name'
      | 'allowance'
      | 'balanceOf'
      | 'decimals'
      | 'totalSupply'
      | undefined
    args?: readonly [Address] | undefined
  }>().toEqualTypeOf<Pick<Result, 'args' | 'functionName'>>()
})

test('UseReadContractReturnType', () => {
  type Result = UseReadContractReturnType<typeof abi.erc20, 'balanceOf'>
  expectTypeOf<Result['data']['value']>().toEqualTypeOf<bigint | undefined>()
})

test('overloads', () => {
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
  })

    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: [],
  })

    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: ['0x'],
  })

    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: ['0x', '0x'],
          foo: `0x${string}`
          bar: `0x${string}`
})

test('deployless read (bytecode)', () => {
  const result = useReadContract({
    code: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
  })
  expectTypeOf(result.data.value).toEqualTypeOf<bigint | undefined>()
})
