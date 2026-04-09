import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { accounts, addressRegex, config, mainnet } from '@wagmi/test'
import { expect, test } from 'vitest'

import { WagmiProvider } from './context.js'
import { useConnectorClient } from './hooks/useConnectorClient.js'

  function Component() {
    const { data } = useConnectorClient()
    return (
      <div>
        <h1>wevm</h1>
        <div>useConnectorClient: {data?.account?.address}</div>
      </div>
    )
  }

  const queryClient = new QueryClient()
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </WagmiProvider>,
  )
})

  const config = createConfig({
    chains: [mainnet],
    pollingInterval: 100,
    ssr: true,
    transports: {
      [mainnet.id]: http(),
    },
  })
  const queryClient = new QueryClient()

    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <h1>wevm</h1>
      </QueryClientProvider>
    </WagmiProvider>,
  )
})

test('mock reconnect', async () => {
  function Component() {
    return (
      <div>
        <h1>{address}</h1>
      </div>
    )
  }

  const connector = mock({
    accounts,
    features: { reconnect: true },
  })
  const config = createConfig({
    chains: [mainnet],
    connectors: [connector],
    storage: null,
    transports: {
      [mainnet.id]: http(),
    },
  })
  await connect(config, { connector })

  const queryClient = new QueryClient()
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </WagmiProvider>,
  )
})
