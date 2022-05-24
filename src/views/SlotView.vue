<template>
  <div>
    <p class="text-h4">{{ slotName }}</p>

    <div class="row q-gutter-xs q-mb-xs">
      <template v-for="i in 3" :key="i">
        <div class="col">
          <CardInfo
            title="Teste de titulo"
            subtitle="Testando subtitle para ver no q da isso aqui"
            info="100%"
          />
        </div>
      </template>
    </div>

    <div class="row q-gutter-xs q-mb-xs">
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

    <div class="row q-gutter-xs q-mb-xs">
      <div class="col col-12">
        <AssetsTable :rows="rows" />

        <AssetsBarChart :rows="rows" />
        <AssetsPieChart :rows="rows" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useSlotStore } from '@/stores/slot';
  import { useWalletStore } from '@/stores/wallet';
  import { useRoute } from 'vue-router';
  import CardInfo from '@/components/CardInfo.vue';
  import CardSlot from '@/components/CardSlot.vue';
  import AssetsBarChart from '@/components/slot/AssetsBarChart.vue';
  import AssetsPieChart from '@/components/slot/AssetsPieChart.vue';
  import AssetsTable from '@/components/slot/AssetsTable.vue';
  import type { SlotType } from '@/types/SlotType';

  const route = useRoute();
  const slotStore = useSlotStore();
  const walletStore = useWalletStore();

  const parentId = ref<string>(route.params.id as string);

  walletStore.slotId = parentId.value;

  const slotName = computed(() => {
    const slot = slotStore.all.find((item) => item.id === parentId.value);
    return slot?.title;
  });

  const slots = computed((): SlotType[] | [] => {
    if (parentId.value) {
      return slotStore.getSlotsByParentId(parentId.value);
    }

    return slotStore.getMainSlots;
  });

  const rows = computed(() => {
    return walletStore.getAssetsBySlot;
  });
</script>
