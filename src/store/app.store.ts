import { defineStore } from 'pinia';
import { militaryPowerFn } from '@/utils/algorithms';

export const useAppStore = defineStore('app', {
  state: () => ({
    money: 250000000,
    income: 10,
    population: 8000,
    food: 100000,
    industry: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    military: [2, 1, 2, 0, 0, 10],
    enemy: 0,
    stats: {
      industryBuilt: 0,
      militaryBuilt: 0,
      conflicts: 0,
      wins: 0,
      loses: 0,
      industryCaptured: 0,
      industryLost: 0,
      populationDiedInConflicts: 0,
      populationDiedFromStarving: 0,
    },
  }),
  getters: {
    militaryPower: (state) => militaryPowerFn(state.military),
  },
});
