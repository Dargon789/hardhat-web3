---
title: usePublicClient
description: Hook for getting Viem `PublicClient` instance.
---

# usePublicClient


## Import

```ts
import { usePublicClient } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { usePublicClient } from 'wagmi'

function App() {
  const client = usePublicClient()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

::: warning
:::

## Parameters

```ts
import { type UsePublicClientParameters } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when getting Viem Public Client.

::: code-group
```ts [index.ts]
import { usePublicClient } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { config } from './config'

function App() {
  const client = usePublicClient({
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { usePublicClient } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const client = usePublicClient({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UsePublicClientReturnType } from 'wagmi'
```

`PublicClient | undefined`


## Action

- [`getPublicClient`](/core/api/actions/getPublicClient)
- [`watchPublicClient`](/core/api/actions/watchPublicClient)
