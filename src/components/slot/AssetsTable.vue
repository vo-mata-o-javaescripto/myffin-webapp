<template>
  <template v-if="rows.length > 0">
    <q-table title="Wallet" :rows="rows" :columns="columns" row-key="name" />
  </template>
</template>

<script setup lang="ts">
  import type { QTableProps } from 'quasar';

  defineProps({
    rows: { type: Array, required: false, default: () => [] },
  });

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
        Number(val).toLocaleString('pt-br', {
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
</script>
