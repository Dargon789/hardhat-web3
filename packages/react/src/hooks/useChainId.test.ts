import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useChainId } from './useChainId.js'

test('default', async () => {

  expect(result.current).toMatchInlineSnapshot('1')

  config.setState((x) => ({ ...x, chainId: 456 }))
  rerender()

  expect(result.current).toMatchInlineSnapshot('456')
})

    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current).toBeDefined()
})
