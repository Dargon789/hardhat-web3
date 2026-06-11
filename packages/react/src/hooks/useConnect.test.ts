import { disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { useConnect } from './useConnect.js'

const connector = config.connectors[0]!

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
    useConnect: useConnect(),
  }))


  })

  )

})
