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

    <div class="col col-12">
      <q-table title="Wallet" :rows="rows" :columns="columns" row-key="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useSlotStore } from '@/stores/slot';
  import { useWalletStore } from '@/stores/wallet';
  import { useRoute } from 'vue-router';
  import CardSlot from '@/components/CardSlot.vue';
  import type { SlotType } from '@/types/SlotType';
  import { usePercent } from '@/composables/usePercent';
  import type { QTableProps } from 'quasar';

  const route = useRoute();
  const slotStore = useSlotStore();
  const walletStore = useWalletStore();
  const percent = usePercent();

  const slots = ref<SlotType[] | []>([]);

  const parentId = ref(Number(route.params.id));

  slots.value = slotStore.getSlotsByParentId(parentId.value);

  const totalPercent = percent.totalPercent(slots.value);

  const columns: QTableProps['columns'] = [
    {
      name: 'name',
      field: 'name',
      label: 'Name',
      align: 'left',
      sortable: true,
    },
    {
      name: 'ticker',
      field: 'ticker',
      label: 'Ticker',
      sortable: true,
    },
    { name: 'quantity', field: 'quantity', label: 'Qty' },
    {
      name: 'price',
      field: 'price',
      label: 'R$',
      format: (val: any, row: any) => `R$ ${val * row.quantity}`,
    },
  ];

  const rows = walletStore.all;
  const assets = walletStore.getAssetsBySlot(parentId.value);
</script>
