<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ title }}</div>
      <div class="text-subtitle2">{{ subtitle }}</div>
      <div class="text-subtitle2">{{ percentText }}</div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat @click="goToSlot">Abrir</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  interface Props {
    id: number;
    title: string;
    subtitle: string;
    percent: number;
  }

  const props = defineProps<Props>();

  const goToSlot = () => {
    return router.push({ name: 'slot', params: { id: props.id } });
  };

  const percentText = computed(() => {
    return `${props.percent * 100}%`;
  });
</script>
