<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { RouterView } from 'vue-router';
  import { useWalletStore } from './stores/wallet';

  const walletStore = useWalletStore();

  const assetsNotEmpty = computed(() => {
    return walletStore.all.length > 0;
  });

  watch(
    assetsNotEmpty,
    async (val) => {
      if (val) {
        await walletStore.setStockPrices();
      }
    },
    { immediate: true }
  );
</script>

<template>
  <RouterView />
</template>

<style></style>
