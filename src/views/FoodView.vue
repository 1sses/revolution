<template>
  <section>
    <SquareButton
      v-for="item in food"
      :key="item.label"
      :upper-text="`+${item.income.label} к еде`"
      :inner-text="item.label"
      :lower-text="item.cost.toLocaleString()"
      subtitle="рублей"
      @btn-click="handleFoodClick(item)"
    />
  </section>
</template>

<script setup lang="ts">
import SquareButton from '@/components/SquareButton.vue';
import { useAppStore } from '@/store/app.store';
import { useModalStore } from '@/store/modal.store';
import { foodItemsTemplate as food } from '@/data/food';

const appStore = useAppStore();
const modalStore = useModalStore();

const handleFoodClick = (item) => {
  if (appStore.money + appStore.income * 60 < item.cost) {
    modalStore.openModal({
      header: 'Действие невозможно',
      content:
        'Долг страны будет слишком велик, накопите достаточно ресурсов и попробуйте снова.',
    });
    return;
  }
  appStore.money -= item.cost;
  appStore.food = Math.round(
    item.income.type === 'plain'
      ? appStore.food + item.income.value
      : appStore.food * (1 + item.income.value / 100)
  );
  // end famine
  if (appStore.food > 0) {
    appStore.famine.status = 0;
    appStore.famine.isNotified = false;
  }
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
