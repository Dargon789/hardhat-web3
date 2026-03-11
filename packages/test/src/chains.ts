import type { Compute } from '@wagmi/core/internal'
import { getRpcUrls } from './utils.js'

export type Chain = Compute<
    port: number
  }
>

const mainnetFork = {

export const mainnet = {
  ...getRpcUrls({ port: 8545 }),
  fork: mainnetFork,
} as const satisfies Chain

export const mainnet2 = {
  ...getRpcUrls({ port: 8546 }),
  id: 456,
  nativeCurrency: { decimals: 18, name: 'wagmi', symbol: 'WAG' },
  fork: mainnetFork,
} as const satisfies Chain

export const optimism = {
  ...getRpcUrls({ port: 8547 }),
  fork: {
    blockNumber: 107_317_577n,
  },
} as const satisfies Chain

export const chain = {
  mainnet,
  mainnet2,
  optimism,
}
