<script setup lang="ts">

const chainId = useChainId()
</script>

<template>
  <h2>Connect</h2>

  <button v-for="connector in connectors" :key="connector.id" type="button" @click="connect({ connector, chainId })">
    {{ connector.name }}
  </button>

  <div>
    {{ status }}
    {{ error?.message }}
  </div>
</template>
