import { Abi as AbiSchema } from 'abitype/zod'
import type { Address } from 'viem'
import { z } from 'zod'

import type { ContractConfig } from '../config.js'
import { fromZodError } from '../errors.js'
import type { Compute } from '../types.js'
import { fetch } from './fetch.js'

export type SourcifyConfig<chainId extends number> = {
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number | undefined
  /**
   * Chain id to use for fetching ABI.
   *
   * If `address` is an object, `chainId` is used to select the address.
   *
   * See https://docs.sourcify.dev/docs/chains for supported chains.
   */
  chainId: (chainId extends ChainId ? chainId : never) | (ChainId & {})
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Compute<Omit<ContractConfig<ChainId, chainId>, 'abi'>>[]
}

const SourcifyResponse = z.object({
  abi: AbiSchema,
})

/** Fetches contract ABIs from Sourcify. */
export function sourcify<chainId extends ChainId>(
  config: SourcifyConfig<chainId>,
) {
  const { cacheDuration, chainId, contracts: contracts_ } = config

  const contracts = contracts_.map((x) => ({
    ...x,
    address:
      typeof x.address === 'string' ? { [chainId]: x.address } : x.address,
  })) as Omit<ContractConfig, 'abi'>[]

  return fetch({
    cacheDuration,
    contracts,
    async parse({ response }) {
      if (response.status === 404)
        throw new Error('Contract not found in Sourcify repository.')

      const json = await response.json()
      const parsed = await SourcifyResponse.safeParseAsync(json)
      if (!parsed.success)
        throw fromZodError(parsed.error, { prefix: 'Invalid response' })

      if (parsed.data.abi) return parsed.data.abi as ContractConfig['abi']
      throw new Error('contract not found')
    },
    request({ address }) {
      if (!address) throw new Error('address is required')

      let contractAddress: Address | undefined
      if (typeof address === 'string') contractAddress = address
      else if (typeof address === 'object') contractAddress = address[chainId]

      if (!contractAddress)
        throw new Error(
          `No address found for chainId "${chainId}". Make sure chainId "${chainId}" is set as an address.`,
        )
      return {
        url: `https://sourcify.dev/server/v2/contract/${chainId}/${contractAddress}?fields=abi`,
      }
    },
  })
}

// Supported chains
// https://docs.sourcify.dev/docs/chains
type ChainId =
  | 1 // Ethereum Mainnet
  | 17000 // Ethereum Testnet Holesky
  | 5 // Ethereum Testnet Goerli
  | 3 // Ethereum Testnet Ropsten
  | 4 // Ethereum Testnet Rinkeby
  | 10242 // Arthera Mainnet
  | 10243 // Arthera Testnet
  | 1313161554 // Aurora Mainnet
  | 1313161555 // Aurora Testnet
  | 13337 // Beam Testnet
  | 14 // Flare Mainnet
  | 17069 // Garnet Holesky
  | 192837465 // Gather Mainnet Network
  | 2037 // Kiwi Subnet
  | 212 // MAPO Makalu
  | 222000222 // Kanazawa
  | 23294 // Oasis Sapphire
  | 23295 // Oasis Sapphire Testnet
  | 2442 // Polygon zkEVM Cardona Testnet
  | 35441 // Q Mainnet
  | 35443 // Q Testnet
  | 534351 // Scroll Sepolia Testnet
  | 57 // Syscoin Mainnet
  | 5700 // Syscoin Tanenbaum Testnet
  | 5845 // Tangle
  | 6119 // UPTN
  | 660279 // Xai Mainnet
  | 7000 // ZetaChain Mainnet
  | 7001 // ZetaChain Testnet
  | 7777777 // Zora
  | 839999 // exSat Testnet
