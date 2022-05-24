<template>
  <template v-if="rows.length > 0">
    <BarChart :labels="barChart.labels" :data="barChart.data" />
  </template>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import BarChart from '@/components/BarChart';

  const props = defineProps({
    rows: { type: Array, required: false, default: () => [] },
  });

  const barChart = computed(() => {
    const rowsLocal = props.rows;

    return {
      labels: rowsLocal.map((item: any) => item.name) as any[],
      data: rowsLocal.map((item: any) =>
        Number((item.percent_diff * 100).toFixed(2))
      ) as any[],
    };
  });
</script>
