<template>
  <section>
    <SquareButton
      v-for="item in industry"
      :key="item.label"
      :upper-text="`+${item.income.label} к приросту`"
      :inner-text="item.label"
      :lower-text="item.cost.toLocaleString()"
      subtitle="рублей"
      @btn-click="handleIndustryClick(item)"
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
    cost: Math.round(item.basicCost * Math.pow(1.1, appStore.industry[i])),
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
  appStore.industry[index] += 1;
  appStore.money -= item.cost;
  appStore.netIncome = Math.round(
    item.income.type === 'plain'
      ? appStore.netIncome + item.income.value
      : appStore.netIncome * (1 + item.income.value / 100)
  );
  appStore.population +=
    item.basicPopulationIncome + Math.floor(appStore.industry[index] / 10) * 10; // TODO is this ok?
  appStore.stats.industryBuilt += 1;
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  column-gap: 7%;
  width: 100%;
  height: 93%;
}
</style>
