import type { AssetType } from '@/types/AssetType';
import { defineStore } from 'pinia';
import { useAlocStore } from './aloc';
import { useSlotStore } from './slot';

export type RootState = {
  all: AssetType[] | [];
};

export const useWalletStore = defineStore({
  id: 'wallet',
  state: () =>
    ({
      all: [
        {
          id: 1,
          name: 'Magazine luiza',
          ticker: 'MGLU4',
          quantity: 22,
          price: 5,
        },
        {
          id: 2,
          name: 'Petrobras',
          ticker: 'PETR4',
          quantity: 15,
          price: 15,
        },
        {
          id: 3,
          name: 'Tesla',
          ticker: 'TSLA4',
          quantity: 25,
          price: 25,
        },
        {
          id: 4,
          name: 'Vale',
          ticker: 'VALE4',
          quantity: 1,
          price: 35,
        },
      ],
    } as RootState),
  getters: {
    getAssetsBySlot: (state) => (slotId: any) => {
      const alocStore = useAlocStore();
      const slotStore = useSlotStore();
      const alocList = alocStore.all;
      const assetList = state.all;
      const arr: any[] = [];

      assetList.forEach((asset) => {
        alocList.forEach((aloc) => {
          if (asset.id === aloc.wallet_id) {
            const slot = slotStore.all.find((item) => item.id === slotId);

            arr.push({
              ...asset,
              slot_id: aloc.slot_id,
              slot_name: slot?.title,
              percent: aloc.percent,
              totalValue: asset.price * asset.quantity,
              // percent_current:
            });
          }
        });
      });

      const arrFiltered = arr.filter((item) => {
        return item.slot_id === slotId;
      });

      const totalSlotAmount = arrFiltered.reduce(
        (acumulador, elemento) => (acumulador += elemento.totalValue),
        0
      );

      return arrFiltered.map((item) => {
        const percent_current = item.totalValue / totalSlotAmount;
        const amount_target = totalSlotAmount * item.percent;
        return {
          ...item,
          // percent_current: item.totalValue / totalSlotAmount,
          percent_current,
          percent_diff: percent_current - item.percent,
          amount_target,
          quantity_target: amount_target / item.price,
        };
      });
    },
  },
  actions: {},
});
