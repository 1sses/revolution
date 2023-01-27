<template>
  <section>
    <h1 class="country-name" style="text-align: center">{{ enemy.name }}</h1>
    <h2 class="title green">Уровень развития</h2>
    <InfoItem label="Население:" :value="`${enemy.population} человек`" />
    <InfoItem label="Бюджет страны:" :value="`${enemy.budget} руб.`" />
    <InfoItem label="Прирост бюджета:" :value="`${enemy.income} руб.`" />
    <h2 class="title green" style="margin-top: 5%">Данные об армии</h2>
    <InfoItem
      label="Танковая дивизия:"
      :value="`${enemy.military[1]} в строю`"
    />
    <InfoItem
      label="Авиационная эскадрилья:"
      :value="`${enemy.military[2]} в строю`"
    />
    <InfoItem
      label="Ракетный комплекс:"
      :value="`${enemy.military[3]} в строю`"
    />
    <InfoItem
      label="Подводная лодка:"
      :value="`${enemy.military[4]} в строю`"
      style="margin-top: 5%"
    />
    <InfoItem
      label="Тяжелый крейсер:"
      :value="`${enemy.military[5]} в строю`"
    />
    <InfoItem
      label="Атомная бомба:"
      :value="`${enemy.military[6]} единиц(ы)`"
    />
    <h2 class="title green" style="margin-top: 5%">
      Обороноспособность страны
    </h2>
    <SliderLine :value="defenseCapability" />
    <WideButton text="Атаковать" style="margin-top: 5%" @btn-click="attack" />
  </section>
</template>

<script setup lang="ts">
import SliderLine from '@/components/SliderLine.vue';
import InfoItem from '@/components/InfoItem.vue';
import WideButton from '@/components/WideButton.vue';
import { computed, watchEffect } from 'vue';
import {
  defenseCapacityFn,
  enemyStatsFn,
  militaryPowerFn,
} from '@/utils/algorithms';
import { useAppStore } from '@/store/app.store';
import { countryNames } from '@/data/countries';
import { useModalStore } from '@/store/modal.store';

const appStore = useAppStore();
const modalStore = useModalStore();

const enemy = computed(() => {
  return {
    name: countryNames[appStore.enemy],
    // TODO add random
    population: 18000,
    budget: 68400,
    income: 180,
    military: {
      // TODO fix coefficients
      1: enemyStatsFn(appStore.enemy, 1, 1),
      2: enemyStatsFn(appStore.enemy, 3.5, 1),
      3: enemyStatsFn(appStore.enemy, 7, 1),
      4: enemyStatsFn(appStore.enemy, 15, -0.9),
      5: enemyStatsFn(appStore.enemy, 100, -0.9),
      6: enemyStatsFn(appStore.enemy, 1000, -0.5),
    },
  };
});

const defenseCapability = computed(() =>
  defenseCapacityFn(
    (militaryPowerFn(enemy.value.military) / appStore.militaryPower) * 100
  )
);

// watchEffect(() => {
//   console.log(enemy.value.military, appStore.militaryPower);
// });

const attack = () => {
  const random = Math.random() * 100;
  if (random > defenseCapability.value) {
    appStore.enemy += 1;
    const budgetProfit = Math.floor(
      Math.random() * (enemy.value.budget - enemy.value.budget / 2) +
        enemy.value.income / 2
    );
    const incomeProfit = Math.floor(
      Math.random() * (enemy.value.income - enemy.value.income / 2) +
        enemy.value.income / 2
    );
    const populationProfit = Math.floor(
      Math.random() * (enemy.value.population - enemy.value.population / 2) +
        enemy.value.population / 2
    );
    // TODO stats update
    modalStore.openModal({
      header: 'Победа',
      content: `В ходе операции вам удалось захватить часть территорий противника. Бюджет страны увеличен на ${budgetProfit} руб, прирост бюджета увеличен на ${incomeProfit} руб, население увеличено на ${populationProfit} человек.`,
    });
  } else {
    console.log('lose');
  }
};
</script>

<style scoped lang="scss">
section {
  width: 100%;
  height: 95%;

  .title {
    font-size: 250%;
    margin-bottom: 3%;
  }

  .country-name {
    margin: 0 0 5%;
    font-size: 500%;
    font-weight: 400;
  }

  h2,
  h3 {
    margin: 1% 0;
  }
}
</style>
