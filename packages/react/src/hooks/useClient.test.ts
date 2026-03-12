import { switchChain } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useClient } from './useClient.js'

test('default', async () => {

  expect(result.current?.chain.id).toEqual(1)

  await switchChain(config, { chainId: 456 })
  rerender()

  expect(result.current?.chain.id).toEqual(456)
})

    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current).toBeDefined()
})

  expect(result.current).toBeUndefined()
})
