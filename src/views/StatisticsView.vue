<template>
  <section>
    <h2 class="green title">Статистика развития</h2>
    <InfoItem label="Предприятий построено:" :value="stats.industryBuilt" />
    <InfoItem label="Сформировано ВС:" :value="stats.militaryBuilt" />
    <InfoItem label="Атомное оружие:" :value="military[6] > 0 ? 'Да' : 'Нет'" />
    <h2 class="green title" style="text-align: center; margin-top: 5%">
      Статус:
    </h2>
    <h1 class="status-name" style="text-align: center">{{ status }}</h1>
    <h2 class="green title">Военная аналитика</h2>
    <InfoItem label="Участий в военных конфликтах:" :value="stats.conflicts" />
    <InfoItem label="Побед:" :value="stats.wins" />
    <InfoItem label="Поражений:" :value="stats.loses" />
    <InfoItem label="Предприятий захвачено:" :value="stats.industryCaptured" />
    <InfoItem label="Предприятий потеряно:" :value="stats.industryLost" />
    <h2 class="green title" style="margin-top: 5%">Данные о гражданах</h2>
    <InfoItem
      label="Погибло в конфликтах:"
      :value="stats.populationDiedInConflicts"
    />
    <InfoItem
      label="Прогибло от голода:"
      :value="stats.populationDiedFromStarving"
    />
  </section>
</template>

<script setup lang="ts">
import InfoItem from '@/components/InfoItem.vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
import { computed } from 'vue';

const appStore = useAppStore();
const { stats, population, military } = storeToRefs(appStore);
const status = computed(() => {
  // TODO change names
  switch (true) {
    case population.value < 10000:
      return 'Миниполис';
    case population.value < 100000:
      return 'Малый город';
    case population.value < 1000000:
      return 'Город';
    case population.value < 10000000:
      return 'Мегаполис';
    case population.value < 100000000:
      return 'Метрополис';
    default:
      return '';
  }
});
</script>

<style scoped lang="scss">
section {
  width: 100%;

  .title {
    font-size: 250%;
    margin-bottom: 3%;
  }

  .status-name {
    margin: 0 0 8%;
    font-size: 500%;
    font-weight: 400;
  }

  h2,
  h3 {
    margin: 1% 0;
  }
}
</style>
