import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    money: 9999999,
    income: 15045,
    population: 14880,
    food: 74545,
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
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    stats: {},
  }),
});
