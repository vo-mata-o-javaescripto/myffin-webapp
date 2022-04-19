import type { AssetType } from '@/types/AssetType';
import { defineStore } from 'pinia';
import { useAlocStore } from './aloc';

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
          quantity: 10,
          price: 5,
        },
        {
          id: 2,
          name: 'Petrobras',
          ticker: 'PETR4',
          quantity: 3,
          price: 15,
        },
        {
          id: 3,
          name: 'Tesla',
          ticker: 'TSLA4',
          quantity: 25,
          price: 25,
        },
      ],
    } as RootState),
  getters: {
    getAssetsBySlot: (state) => (slotId: any) => {
      const alocStore = useAlocStore();
      const alocList = alocStore.all;
      const assetList = state.all;
      const arr: any[] = [];

      assetList.forEach((asset) => {
        alocList.forEach((aloc) => {
          if (asset.id === aloc.wallet_id) {
            arr.push({
              ...asset,
              slot_id: aloc.slot_id,
              percent: aloc.percent,
            });
          }
        });
      });

      return arr.filter((item) => {
        return item.slot_id === slotId;
      });
    },
  },
  actions: {},
});
