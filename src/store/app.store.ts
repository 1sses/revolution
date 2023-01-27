import { defineStore } from 'pinia';
import { militaryPowerFn } from '@/utils/algorithms';

export const useAppStore = defineStore('app', {
  state: () => ({
    money: 250000000,
    income: 10,
    population: 8000,
    food: 100000,
    industry: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    },
    military: {
      1: 2,
      2: 1,
      3: 2,
      4: 0,
      5: 0,
      6: 0,
    },
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
