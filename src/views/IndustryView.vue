<template>
  <section>
    <SquareButton
      v-for="item in industry"
      :key="item.label"
      :upper-text="`+${item.income} к приросту`"
      :inner-text="item.label"
      :lower-text="item.cost"
      subtitle="рублей"
      @click="handleIndustryClick(item)"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SquareButton from "@/components/SquareButton.vue";
import { useAppStore } from "@/store/app.store";

const appStore = useAppStore();

const industryItemsTemplate = [
  {
    label: "Построить завод",
    income: 10,
    basicCost: 500,
  },
  {
    label: "Проложить дорогу",
    income: 14,
    basicCost: 1200,
  },
  {
    label: "Наладить коммуникации",
    income: 18,
    basicCost: 2400,
  },
  {
    label: "Построить жилой квартал",
    income: 80,
    basicCost: 28000,
  },
  {
    label: "Построить АЭС",
    income: 120,
    basicCost: 50000,
  },
  {
    label: "Побороть преступность",
    income: 3,
    basicCost: 400000,
  },
  {
    label: "Разработать рудник",
    income: 250,
    basicCost: 70000,
  },
  {
    label: "Поставить нефтевышку",
    income: 360,
    basicCost: 100000,
  },
  {
    label: "Проложить нефтепровод",
    income: 7,
    basicCost: 1500000,
  },
];

const industry = computed(() =>
  industryItemsTemplate.map((item, i) => ({
    ...item,
    cost: Math.round(
      item.basicCost * Math.pow(1.1, appStore.industry[i + 1])
    ).toString(),
  }))
);

const handleIndustryClick = (item) => {
  const index = industryItemsTemplate.findIndex(
    (industryItem) => industryItem.label === item.label
  );
  // check for money and dept (modal)
  if (appStore.money < item.cost) return;
  appStore.industry[index + 1] += 1;
  appStore.money -= item.cost;
  appStore.income += item.income;
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  column-gap: 20px;
  width: 100%;
  height: 95%;
}
</style>
