import { renderHook } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useChains } from './useChains.js'

test('default', async () => {

  expect(result.current.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})

    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})
