<template>
  <section>
    <SquareButton
      v-for="item in industry"
      :key="item.label"
      :upper-text="`+${item.income} к приросту`"
      :inner-text="item.label"
      :lower-text="item.cost.toLocaleString()"
      subtitle="рублей"
      @click="handleIndustryClick(item)"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SquareButton from '@/components/SquareButton.vue';
import { useAppStore } from '@/store/app.store';
import { useModalStore } from '@/store/modal.store';
import { industryItemsTemplate } from '@/data/industry';

const appStore = useAppStore();
const modalStore = useModalStore();

const industry = computed(() =>
  industryItemsTemplate.map((item, i) => ({
    ...item,
    cost: Math.round(item.basicCost * Math.pow(1.1, appStore.industry[i + 1])),
  }))
);

const handleIndustryClick = (item) => {
  const index = industryItemsTemplate.findIndex(
    (industryItem) => industryItem.label === item.label
  );
  if (appStore.money + appStore.income * 30 < item.cost) {
    modalStore.openModal({
      header: 'Действие невозможно',
      content:
        'Долг страны будет слишком велик, накопите достаточно ресурсов и попробуйте снова.',
    });
    return;
  }
  appStore.industry[index + 1] += 1;
  appStore.money -= item.cost;
  appStore.income += item.income;
  appStore.population +=
    item.basicPopulationIncome +
    Math.floor(appStore.industry[index + 1] / 10) * 10; // TODO is this ok?
  appStore.stats.industryBuilt += 1;
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
