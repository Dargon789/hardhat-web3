<script setup lang="ts">
import Balance from './components/Balance.vue'
import BlockNumber from './components/BlockNumber.vue'
import Client from './components/Client.vue'
import Connect from './components/Connect.vue'
import Connections from './components/Connections.vue'
import ConnectorClient from './components/ConnectorClient.vue'
import ReadContract from './components/ReadContract.vue'
import SendTransaction from './components/SendTransaction.vue'
import SwitchChain from './components/SwitchChain.vue'
import WriteContract from './components/WriteContract.vue'
</script>

<template>
  <Balance />
  <Connect />
  <Connections />
  <SwitchChain />
  <BlockNumber />
  <ReadContract />
  <SendTransaction />
  <WriteContract />
  <Client />
  <ConnectorClient />
</template>
