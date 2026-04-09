<script setup>
const packageName = '@wagmi/core'
const actionName = 'getWalletClient'
const typeName = 'GetWalletClient'
</script>

# getWalletClient


## Import

```ts
import { getWalletClient } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getWalletClient } from '@wagmi/core'
import { config } from './config'

const client = getWalletClient(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

::: warning
:::

## Parameters

```ts
import { type GetWalletClientParameters } from '@wagmi/core'
```

### account

`Address | Account | undefined`

Account to use with client. Throws if account is not found on [`connector`](#connector).

::: code-group
```ts [index.ts]
import { getWalletClient } from '@wagmi/core'
import { config } from './config'

const client = getWalletClient(config, {
  account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use with client.

::: code-group
```ts [index.ts]
import { getWalletClient } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const client = getWalletClient(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

- Connector to get client for.
- Defaults to current connector.

::: code-group
```ts [index.ts]
import { getConnections, getWalletClient } from '@wagmi/core'
import { config } from './config'

const connections = getConnections(config)
const client = getWalletClient(config, {
  connector: connections[0]?.connector, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetChainIdReturnType } from '@wagmi/core'
```

`WalletClient`


## Error

```ts
import { type GetWalletClientErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->
