<template>
  <section>
    <h2 class="title" style="margin-top: 1%">Угроза вторжения</h2>
    <SliderLine :value="appStore.threatOfInvasion" />
    <h2 class="title" style="margin-top: 5%">Угроза атомной бомбардировки</h2>
    <SliderLine :value="15" />
    <div class="military-items">
      <SquareButton
        v-for="(item, i) in military"
        :key="item.label"
        :upper-text="`В строю: ${appStore.military[i]}`"
        :inner-text="item.label"
        :lower-text="item.cost.toLocaleString()"
        subtitle="рублей"
        @btn-click="handleIndustryClick(item)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import SquareButton from '@/components/SquareButton.vue';
import { useAppStore } from '@/store/app.store';
import { useModalStore } from '@/store/modal.store';
import { militaryItemsTemplate as military } from '@/data/military';
import SliderLine from '@/components/SliderLine.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const modalStore = useModalStore();

const handleIndustryClick = (item) => {
  const index = military.findIndex(
    (industryItem) => industryItem.label === item.label
  );
  if (appStore.money + appStore.income * 15 < item.cost) {
    modalStore.openModal({
      header: 'Действие невозможно',
      content:
        'Долг страны будет слишком велик, накопите достаточно ресурсов и попробуйте снова.',
    });
    return;
  }
  appStore.military[index] += 1;
  appStore.money -= item.cost;
  appStore.stats.militaryBuilt += 1;
};
</script>

<style scoped lang="scss">
section {
  width: 100%;
  height: 95%;

  .title {
    font-size: 200%;
  }

  .military-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    column-gap: 7%;
    height: 65%;
    margin-top: 12%;
  }
}
</style>
