import type { AlocType } from '@/types/AlocType';
import { defineStore } from 'pinia';

export type RootState = {
  all: AlocType[] | [];
};

export const useAlocStore = defineStore({
  id: 'aloc',
  state: () =>
    ({
      all: [
        {
          id: 1,
          slot_id: 5,
          wallet_id: 1,
          percent: 0.3,
        },
        {
          id: 1,
          slot_id: 5,
          wallet_id: 2,
          percent: 0.7,
        },
        {
          id: 1,
          slot_id: 6,
          wallet_id: 3,
          percent: 1,
        },
      ],
    } as RootState),
  getters: {},
  actions: {},
});
