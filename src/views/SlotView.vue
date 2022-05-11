<template>
  <div class="row q-gutter-xs">
    <div class="col col-12">
      <h4>{{ slotName }}</h4>
      <h4>Total da alocação gavetas: {{ totalPercent }}</h4>
      <h4>Total da alocação Ativos: {{ totalPercentAssets }}</h4>
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
      <BarChart :labels="barChart.labels" :data="barChart.data" />
      <PieChart :labels="pieChart.labels" :data="pieChart.data" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useSlotStore } from '@/stores/slot';
  import { useWalletStore } from '@/stores/wallet';
  import { useRoute } from 'vue-router';
  import CardSlot from '@/components/CardSlot.vue';
  import BarChart from '@/components/BarChart';
  import PieChart from '@/components/PieChart';
  import type { SlotType } from '@/types/SlotType';
  import { usePercent } from '@/composables/usePercent';
  import type { QTableProps } from 'quasar';

  const route = useRoute();
  const slotStore = useSlotStore();
  const walletStore = useWalletStore();
  const percent = usePercent();

  const slots = ref<SlotType[] | []>([]);

  const parentId = ref<string>(route.params.id as string);

  const slot = slotStore.all.find((item) => item.id === parentId.value);
  const slotName = slot?.title;

  slots.value = slotStore.getSlotsByParentId(parentId.value);

  const totalPercent = percent.totalPercent(slots.value);
  // debugger;
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

    {
      name: 'percent',
      field: 'percent',
      label: 'Alocação meta %',
      format: (val: any) => `${Number(val).toFixed(2)}%`,
    },
    {
      name: 'percent_current',
      field: 'percent_current',
      label: 'Alocação corrente %',
      format: (val: any) => `${val.toFixed(2)}%`,
    },
    {
      name: 'percent_diff',
      field: 'percent_diff',
      label: 'Ponto percentual',
      format: (val: any) => `${val.toFixed(2)}`,
    },
    { name: 'slot_name', field: 'slot_name', label: 'Gaveta' },
    {
      name: 'price',
      field: 'price',
      label: 'Preço',
      format: (val: any) =>
        val.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
    { name: 'quantity', field: 'quantity', label: 'Qty' },
    {
      name: 'quantity_target',
      field: 'quantity_target',
      label: 'Qty Meta',
      format: (val: any) => `${val.toFixed(2)}`,
    },
    {
      name: 'amount_target',
      field: 'amount_target',
      label: 'R$ Meta',
      format: (val: any) =>
        val.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
    {
      name: 'totalValue',
      field: 'totalValue',
      label: 'R$',
      format: (val: any) =>
        val.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
  ];

  walletStore.slotId = parentId.value;
  walletStore.setStockPrices();
  const rows = walletStore.getAssetsBySlot;

  const totalAssets = rows.reduce(
    (acumulador, elemento) => (acumulador += elemento.percent),
    0
  );

  const totalPercentAssets = `${(totalAssets * 100).toFixed(2)}%`;

  const barChart = {
    labels: rows.map((item) => item.name),
    data: rows.map((item) => {
      return Number((item.percent_diff * 100).toFixed(2));
    }),
  };

  const pieChart = {
    labels: rows.map((item) => item.name),
    data: rows.map((item) => {
      return Number((item.percent * 100).toFixed(2));
    }),
  };
</script>
