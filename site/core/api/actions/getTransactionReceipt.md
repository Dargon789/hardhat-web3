<script setup>
const packageName = '@wagmi/core'
const actionName = 'getTransactionReceipt'
const typeName = 'getTransactionReceipt'
</script>

# getTransactionReceipt


## Import

```ts
import { getTransactionReceipt } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getTransactionReceipt } from '@wagmi/core'
import { config } from './config'

await getTransactionReceipt(config, {
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetTransactionReceiptParameters } from '@wagmi/core'
```

### hash

`` `0x${string}` ``

A transaction hash.

::: code-group
```ts [index.ts]
import { getTransactionReceipt } from '@wagmi/core'
import { config } from './config'

await getTransactionReceipt(config, {
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The ID of chain to return the transaction receipt from.

::: code-group
```ts [index.ts]
import { getTransactionReceipt } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

await getTransactionReceipt(config, {
  chainId: mainnet.id, // [!code focus]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetTransactionReceiptReturnType } from '@wagmi/core'
```


The transaction receipt.

## Error

```ts
import { type GetTransactionReceiptErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

