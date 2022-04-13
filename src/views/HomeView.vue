<template>
  <div class="row q-gutter-xs">
    <template v-for="slot in slots" :key="slot.title">
      <div class="col">
        <CardSlot
          :id="slot.id"
          :title="slot.title"
          :subtitle="slot.subtitle"
        ></CardSlot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CardSlot from '@/components/CardSlot.vue';

  const slots = ref([
    {
      id: 1,
      title: 'Ações',
      subtitle: 'Sua gaveta de ações',
    },
    {
      id: 2,
      title: 'Imoveis',
      subtitle: 'Sua gaveta de imoveis',
    },
    {
      id: 3,
      title: 'Criptomoeda',
      subtitle: 'Sua gaveta de criptomoeda',
    },
    {
      id: 4,
      title: 'Renda fixa',
      subtitle: 'Sua gaveta de renda fixa',
    },
  ]);
</script>
