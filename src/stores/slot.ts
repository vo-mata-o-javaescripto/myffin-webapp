import { defineStore } from 'pinia';

export type RootState = {
  all: any[];
};

export const useSlotStore = defineStore({
  id: 'slot',
  state: () =>
    ({
      all: [],
    } as RootState),
  getters: {
    getMainSlots: (state) => state.all.filter((item) => !item.parent_id),
    getSlotsByParentId: (state) => (parent_id: string) => {
      return state.all.filter((item) => item.parent_id === parent_id);
    },
  },
  actions: {
    getAllSlots() {
      try {
        fetch('http://localhost:8055/items/slot')
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
