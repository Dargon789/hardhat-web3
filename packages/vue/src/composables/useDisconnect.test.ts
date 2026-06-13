import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { beforeEach, expect, test } from 'vitest'

import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test('default', async () => {
  const [disconnect] = renderComposable(() => useDisconnect())



    Boolean(isDisconnected),
  )

})
