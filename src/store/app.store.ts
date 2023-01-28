import { defineStore } from 'pinia';
import { militaryPowerFn } from '@/utils/algorithms';

export const useAppStore = defineStore('app', {
  state: () => ({
    money: 250000000,
    netIncome: 10,
    population: 8000,
    food: 10000,
    famine: {
      isNotified: false,
      status: 0,
    },
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
      populationDiedFromFamine: 0,
    },
  }),
  getters: {
    income: (state) =>
      state.famine.status === 0
        ? state.netIncome
        : Math.round(state.netIncome / 2),
    militaryPower: (state) => militaryPowerFn(state.military),
  },
});
