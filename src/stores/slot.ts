import type { SlotType } from '@/types/SlotType';
import { defineStore } from 'pinia';

export type RootState = {
  all: SlotType[] | [];
};

export const useSlotStore = defineStore({
  id: 'slot',
  state: () =>
    ({
      all: [
        {
          id: 1,
          title: 'Ações',
          subtitle: 'Sua gaveta de ações',
          percent: 0.3,
        },
        {
          id: 2,
          title: 'Imoveis',
          subtitle: 'Sua gaveta de imoveis',
          percent: 0.5,
        },
        {
          id: 3,
          title: 'Criptomoeda',
          subtitle: 'Sua gaveta de criptomoeda',
          percent: 0.15,
        },
        {
          id: 4,
          title: 'Renda fixa',
          subtitle: 'Sua gaveta de renda fixa',
          percent: 0.05,
        },
        {
          id: 5,
          title: 'Ações Brasil',
          subtitle: 'Lorem ipsom',
          percent: 0.6,
          parent_id: 1,
        },
        {
          id: 6,
          title: 'Ações EUA',
          subtitle: 'Lorem ipsom',
          percent: 0.4,
          parent_id: 1,
        },
        {
          id: 7,
          title: 'Ações BR Filha',
          subtitle: 'Lorem ipsom',
          percent: 0.4,
          parent_id: 5,
        },
      ],
    } as RootState),
  getters: {
    getMainSlots: (state) => state.all.filter((item) => !item.parent_id),
    getSlotsByParentId: (state) => (parent_id: number) => {
      return state.all.filter((item) => item.parent_id === parent_id);
    },
  },
  actions: {},
});
