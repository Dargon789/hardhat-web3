import { test } from 'vitest'
import { createConnector } from './createConnector.js'

test('default', () => {
  createConnector(() => {
    return {
      id: 'test',
      name: 'Test Connector',
      type: 'test',
      async setup() {},
      async connect() {
      },
      async disconnect() {},
      async getAccounts() {
        return []
      },
      async getChainId() {
        return 123
      },
      async isAuthorized() {
        return true
      },
      onAccountsChanged() {},
      onChainChanged() {},
      async onDisconnect(_error) {},
      async getProvider() {},
    }
  })
})
