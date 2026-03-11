<script setup lang="ts">

const chainId = useChainId()
</script>

<template>
  <h2>Switch Chain</h2>

  <div>Chain ID: {{ chainId }}</div>

  <button v-for="chain in chains" :key="chain.id" :disabled="chain.id === chainId" type="button"
    {{ chain.name }}
  </button>

  <div>
  </div>
</template>
