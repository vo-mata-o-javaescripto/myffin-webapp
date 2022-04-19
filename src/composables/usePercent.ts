import type { SlotType } from '@/types/SlotType';

export function usePercent() {
  const totalPercent = (slots: SlotType[]) => {
    let total = 0;

    slots.forEach((item) => {
      total += item.percent;
    });

    return `${total * 100}%`;
  };

  return { totalPercent };
}
