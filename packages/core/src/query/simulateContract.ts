import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

import {
  type SimulateContractErrorType,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  simulateContract,
} from '../actions/simulateContract.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type SimulateContractOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = UnionExactPartial<
  SimulateContractParameters<abi, functionName, args, config, chainId>
> &

export function simulateContractQueryOptions<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  options: SimulateContractOptions<
    abi,
    functionName,
    args,
    config,
  > = {} as any,
  return {
      return simulateContract(config, {
        ...(parameters as any),
      })
    },
}

export type SimulateContractQueryFnData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = SimulateContractReturnType<abi, functionName, args, config, chainId>

export type SimulateContractData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = SimulateContractQueryFnData<abi, functionName, args, config, chainId>

export function simulateContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'] | undefined,
>(
) {
  return ['simulateContract', filterQueryOptions(rest)] as const
}

export type SimulateContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<
>
