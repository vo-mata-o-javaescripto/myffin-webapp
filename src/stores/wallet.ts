import { defineStore } from 'pinia';
import { useSlotStore } from './slot';

export type RootState = {
  all: any[];
};

export const useWalletStore = defineStore({
  id: 'wallet',
  state: () =>
    ({
      all: [],
    } as RootState),
  getters: {
    getAssetsBySlot: (state) => (slotId: any) => {
      const slotStore = useSlotStore();
      const assetList = state.all;
      const arr: any[] = [];

      assetList.forEach((asset) => {
        const slot = slotStore.all.find((item) => item.id === slotId);

        arr.push({
          ...asset,
          slot_name: slot?.title,
          totalValue: Number(asset.price) * Number(asset.quantity),
        });
      });

      const arrFiltered = arr.filter((item) => {
        return item.slot === slotId;
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
          percent_current,
          percent_diff: percent_current - item.percent,
          amount_target,
          quantity_target: amount_target / item.price,
        };
      });
    },
  },
  actions: {
    getAllSlots() {
      try {
        fetch('http://localhost:8055/items/wallet')
          .then((response) => response.json())
          .then((data) => {
            this.all = data.data;
          });
      } catch (error) {
        return error;
      }
    },
  },
});
