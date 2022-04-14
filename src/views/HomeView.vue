<template>
  <div class="row q-gutter-xs">
    <div class="col col-12">
      <h4>Total da alocação: {{ totalPercent }}</h4>
    </div>

    <template v-for="slot in slots" :key="slot.title">
      <div class="col">
        <CardSlot
          :id="slot.id"
          :title="slot.title"
          :subtitle="slot.subtitle"
          :percent="slot.percent"
        ></CardSlot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useSlotStore } from '@/stores/slot';
  import CardSlot from '@/components/CardSlot.vue';
  import type { SlotType } from '@/types/SlotType';
  import { computed } from '@vue/reactivity';

  const slotStore = useSlotStore();

  const slots = ref<SlotType[] | []>([]);

  slots.value = slotStore.getMainSlots;

  const totalPercent = computed(() => {
    let total = 0;
    slots.value.forEach((item) => {
      total += item.percent;
    });

    return `${total * 100}%`;
  });
</script>
