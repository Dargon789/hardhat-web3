import { expect, test } from 'vitest'

import * as vue from './index.js'

test('exports', () => {
  expect(Object.keys(vue)).toMatchInlineSnapshot(`
    [
      "configKey",
      "WagmiPlugin",
      "BaseError",
      "WagmiInjectionContextError",
      "useBalance",
      "useBlockNumber",
      "useBytecode",
      "useChainId",
      "useChains",
      "useConfig",
      "useConnect",
      "useConnections",
      "useConnectors",
      "useDisconnect",
      "useEnsAddress",
      "useEnsAvatar",
      "useEnsName",
      "useEstimateGas",
      "useReadContract",
      "useReconnect",
      "useSendTransaction",
      "useSignMessage",
      "useSignTypedData",
      "useSimulateContract",
      "useSwitchAccount",
      "useTransaction",
      "useTransactionReceipt",
      "useWatchBlockNumber",
      "useWatchContractEvent",
      "useWriteContract",
      "ChainNotConfiguredError",
      "ConnectorAccountNotFoundError",
      "ConnectorChainMismatchError",
      "ConnectorUnavailableReconnectingError",
      "createStorage",
      "custom",
      "fallback",
      "http",
      "parseCookie",
      "serialize",
      "version",
    ]
  `)
})
