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

    <!-- <div class="col col-12">
      <h4>{{ slotName }}</h4>
      <h4>Total da alocação gavetas: {{ totalPercent }}</h4>
      <h4>Total da alocação Ativos: {{ totalPercentAssets }}</h4>
    </div> -->

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
        <q-table
          title="Wallet"
          :rows="rows"
          :columns="columns"
          row-key="name"
        />
        <template v-if="rows.length > 0">
          <BarChart :labels="barChart.labels" :data="barChart.data" />
          <PieChart :labels="pieChart.labels" :data="pieChart.data" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useSlotStore } from '@/stores/slot';
  import { useWalletStore } from '@/stores/wallet';
  import { useRoute } from 'vue-router';
  import CardInfo from '@/components/CardInfo.vue';
  import CardSlot from '@/components/CardSlot.vue';
  import BarChart from '@/components/BarChart';
  import PieChart from '@/components/PieChart';
  import type { SlotType } from '@/types/SlotType';
  import { usePercent } from '@/composables/usePercent';
  import type { QTableProps } from 'quasar';
  import { computed } from '@vue/reactivity';

  const route = useRoute();
  const slotStore = useSlotStore();
  const walletStore = useWalletStore();
  const percent = usePercent();

  const slots = ref<SlotType[] | []>([]);

  let parentId = ref<string>(route.params.id as string);

  parentId = ref<string>(route.params.id as string);
  walletStore.slotId = parentId.value;
  walletStore.setStockPrices();

  const slot = slotStore.all.find((item) => item.id === parentId.value);
  const slotName = slot?.title;

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

  const rows = computed(() => {
    return walletStore.getAssetsBySlot;
  });

  const totalAssets = rows.value.reduce(
    (acumulador, elemento) => (acumulador += elemento.percent),
    0
  );

  const totalPercentAssets = `${(totalAssets * 100).toFixed(2)}%`;

  let pieChart = ref({
    labels: [] as any[],
    data: [] as any[],
  });

  const barChart = computed(() => {
    const rowsLocal = rows.value;

    return {
      labels: rowsLocal.map((item) => item.name) as any[],
      data: rowsLocal.map((item) =>
        Number((item.percent_diff * 100).toFixed(2))
      ) as any[],
    };
  });

  watch(
    rows,
    async (val: any[]) => {
      if (val.length > 0) {
        pieChart.value = {
          labels: val.map((item) => item.name),
          data: val.map((item) => {
            return Number((item.percent * 100).toFixed(2));
          }),
        };
      }
    },
    { immediate: true }
  );
</script>
