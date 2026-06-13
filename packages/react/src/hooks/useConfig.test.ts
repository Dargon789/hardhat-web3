import { createWrapper, renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useConfig } from './useConfig.js'

  expect(result.current).toBeDefined()
})

  vi.spyOn(console, 'error').mockImplementation(() => {})

    renderHook(() => useConfig(), {
})
