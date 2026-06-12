import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'

import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test('default', async () => {
    useDisconnect: useDisconnect(),
  }))



  )

})
