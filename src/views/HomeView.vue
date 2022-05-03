<template>
  <div class="row q-gutter-xs">
    <div class="col col-12">
      <h4>Total da alocação: {{ totalPercent }}</h4>
    </div>

    <template v-for="slot in slotsComp" :key="slot.title">
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
  import { onMounted, ref } from 'vue';
  import { useSlotStore } from '@/stores/slot';
  import { useWalletStore } from '@/stores/wallet';
  import CardSlot from '@/components/CardSlot.vue';
  import type { SlotType } from '@/types/SlotType';
  import { usePercent } from '@/composables/usePercent';
  import { computed } from '@vue/reactivity';

  const slotStore = useSlotStore();
  const walletStore = useWalletStore();
  const percent = usePercent();

  const slots = ref<SlotType[] | []>([]);

  onMounted(async () => {
    await slotStore.getAllSlots();
    await walletStore.getAllSlots();
  });

  const slotsComp = computed(() => {
    return slotStore.getMainSlots;
  });

  slots.value = slotStore.getMainSlots;
  const totalPercent = percent.totalPercent(slots.value);
</script>
