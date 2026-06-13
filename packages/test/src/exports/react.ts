import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  type RenderHookOptions,
  type RenderHookResult,
  type RenderResult,
import { WagmiProvider } from 'wagmi'

import { config } from '../config.js'

export const queryClient = new QueryClient()

) {
  type Props = { children?: React.ReactNode | undefined }
  return function CreatedWrapper({ children }: Props) {
      Wrapper,
      props,
    )
  }
}

  queryClient.clear()
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
    ...options,
  })
}

export function render(
  queryClient.clear()
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
  })
}
