import { defineStore } from 'pinia';
import { militaryPowerFn } from '@/utils/algorithms';

export const useAppStore = defineStore('app', {
  state: () => ({
    money: 25000,
    netIncome: 10,
    population: 8000,
    food: 100000,
    famine: {
      isNotified: false,
      status: 0,
    },
    industry: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    military: [2, 1, 2, 0, 0, 0],
    invasion: {
      isNotified1: false,
      isNotified2: false,
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
      populationDiedFromFamine: 0,
    },
  }),
  getters: {
    income: (state): number =>
      state.famine.status === 0
        ? state.netIncome
        : Math.round(state.netIncome / 2),
    militaryPower: (state): number => militaryPowerFn(state.military),
    threatOfInvasion: (state): number => {
      const coefficient =
        (state.money / 700 + state.netIncome) /
        militaryPowerFn(state.military) /
        7;
      return coefficient > 100 ? 100 : coefficient;
    },
  },
});
