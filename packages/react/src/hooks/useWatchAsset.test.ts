import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'

import { useWatchAsset } from './useWatchAsset.js'

const connector = config.connectors[0]!

const tokenInfo = {
  address: '0x0000000000000000000000000000000000000000',
  symbol: 'NULL',
  decimals: 18,
}

test('default', async () => {
  await connect(config, { connector })



  expect(result.current.data).toEqual(true)

  await disconnect(config, { connector })
})
