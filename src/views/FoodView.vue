<template>
  <section>
    <SquareButton
      v-for="item in food"
      :key="item.label"
      :upper-text="`+${item.income} к приросту`"
      :inner-text="item.label"
      :lower-text="item.cost.toLocaleString()"
      subtitle="рублей"
      @click="handleFoodClick(item)"
    />
  </section>
</template>

<script setup lang="ts">
import SquareButton from "@/components/SquareButton.vue";
import { useAppStore } from "@/store/app.store";
import { useModalStore } from "@/store/modal.store";
import { foodItemsTemplate as food } from "@/data/food";

const appStore = useAppStore();
const modalStore = useModalStore();

const handleFoodClick = (item) => {
  if (appStore.money + appStore.income * 60 < item.cost) {
    modalStore.openModal({
      header: "Действие невозможно",
      content:
        "Долг страны будет слишком велик, накопите достаточно ресурсов и попробуйте снова.",
    });
    return;
  }
  appStore.money -= item.cost;
  appStore.food += item.income;
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
