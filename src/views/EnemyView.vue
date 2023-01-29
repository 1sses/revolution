<template>
  <section>
    <h1 class="country-name" style="text-align: center">{{ enemy.name }}</h1>
    <h2 class="title green">Уровень развития</h2>
    <InfoItem
      label="Население:"
      :value="`${enemy.population.toLocaleString()} человек`"
    />
    <InfoItem
      label="Бюджет страны:"
      :value="`${enemy.budget.toLocaleString()} руб.`"
    />
    <InfoItem
      label="Прирост бюджета:"
      :value="`${enemy.income.toLocaleString()} руб.`"
    />
    <h2 class="title green" style="margin-top: 5%">Данные об армии</h2>
    <InfoItem
      label="Танковая дивизия:"
      :value="`${enemy.military[0]} в строю`"
    />
    <InfoItem
      label="Авиационная эскадрилья:"
      :value="`${enemy.military[1]} в строю`"
    />
    <InfoItem
      label="Ракетный комплекс:"
      :value="`${enemy.military[2]} в строю`"
    />
    <InfoItem
      label="Подводная лодка:"
      :value="`${enemy.military[3]} в строю`"
      style="margin-top: 5%"
    />
    <InfoItem
      label="Тяжелый крейсер:"
      :value="`${enemy.military[4]} в строю`"
    />
    <InfoItem
      label="Атомная бомба:"
      :value="`${enemy.military[5]} единиц(ы)`"
    />
    <h2 class="title green" style="margin-top: 5%">
      Обороноспособность страны
    </h2>
    <SliderLine :value="defenseCapability" />
    <WideButton text="Атаковать" style="margin-top: 7%" @btn-click="attack" />
  </section>
</template>

<script setup lang="ts">
import SliderLine from '@/components/SliderLine.vue';
import InfoItem from '@/components/InfoItem.vue';
import WideButton from '@/components/WideButton.vue';
import { computed } from 'vue';
import {
  defenseCapacityFn,
  enemyStatFn,
  militaryPowerFn,
} from '@/utils/algorithms';
import { useAppStore } from '@/store/app.store';
import { countryNames } from '@/data/countries';
import { useModalStore } from '@/store/modal.store';
import { militaryItemsTemplate } from '@/data/military';

const appStore = useAppStore();
const modalStore = useModalStore();

const enemy = computed(() => ({
  name: countryNames[appStore.enemy],
  // TODO fix coefficients
  population: 5400 * enemyStatFn(appStore.enemy + 1, 1, 0),
  budget: 46800 * enemyStatFn(appStore.enemy + 1, 1, 0),
  income: 320 * enemyStatFn(appStore.enemy + 1, 1, 0),
  military: militaryItemsTemplate.map((item) =>
    enemyStatFn(
      appStore.enemy,
      item.statsGeneratorCoefficient,
      item.statsGeneratorFix
    )
  ),
}));

const defenseCapability = computed(() =>
  defenseCapacityFn(
    (militaryPowerFn(enemy.value.military) / appStore.militaryPower) * 100
  )
);

const attack = () => {
  if (defenseCapability.value > 85) {
    modalStore.openModal({
      header: 'Перевес сил',
      content:
        'Армия противника имеет слишком большой перевес сил.' +
        ' Отправять сейчас солдат в атаку - значит отправлять их нас смерть, мы не можем так поступить.',
    });
    return;
  }
  const random = Math.random() * 100;
  const isWin = random > defenseCapability.value;

  appStore.stats.conflicts += 1;
  isWin ? (appStore.stats.wins += 1) : (appStore.stats.loses += 1);

  const militaryLoss = [
    // TODO fix coefficients
    Math.round(Math.random() * appStore.military[0] * (isWin ? 0.2 : 0.8)),
    Math.round(Math.random() * appStore.military[1] * (isWin ? 0.2 : 0.8)),
    Math.round(Math.random() * appStore.military[2] * (isWin ? 0.2 : 0.8)),
    Math.round(Math.random() * appStore.military[3] * (isWin ? 0.2 : 0.8)),
    Math.round(Math.random() * appStore.military[4] * (isWin ? 0.2 : 0.8)),
    // Math.round(Math.random() * appStore.military[5] * (isWin ? 0.2 : 1)),
  ];
  for (let i = 0; i < 5; i++) {
    appStore.military[i] -= militaryLoss[i];
  }
  if (appStore.military[0] === 0) {
    appStore.military[0] = 1;
    militaryLoss[0] -= 1;
  }

  if (isWin) {
    const budgetProfit = Math.floor((Math.random() * enemy.value.budget) / 3);
    const incomeProfit = Math.floor((Math.random() * enemy.value.income) / 3);
    const populationProfit = Math.floor(
      (Math.random() * enemy.value.population) / 3
    );
    appStore.enemy += 1;
    appStore.money += budgetProfit;
    appStore.netIncome += incomeProfit;
    appStore.population += populationProfit;
    appStore.stats.industryCaptured += Math.round(
      (Math.random() * appStore.enemy) / 2 + 1
    );
    modalStore.openModal({
      header: 'Победа',
      showWoman: false,
      content: `
        <p style='font-size: 150%'>Награда</p>
        <span>В ходе операции вам удалось захватить часть территорий противника. Бюджет страны увеличен на ${budgetProfit} руб, прирост бюджета увеличен на ${incomeProfit} руб, население увеличено на ${populationProfit} человек.</span>
        <p style='font-size: 150%'>Потери</p>
        <span>Потери вашей армии составили: ${militaryLoss[0]} ед. танковых дивизий, ${militaryLoss[1]} ед. авиационных эскадр, ${militaryLoss[2]} ед. ракетных комплексов, ${militaryLoss[3]} ед. подводных лодок, ${militaryLoss[4]} ед. тяжелых крейсеров.</span>
      `,
    });
    if (appStore.enemy === countryNames.length) {
      modalStore.openModal({
        header: 'Победа',
        content: `
          Поздравляем, вы захватили сильнейшую страну и теперь являетесь таковой. Спасибо за ваше правление!
        `,
      });
      appStore.$reset();
    }
  } else {
    modalStore.openModal({
      header: 'Поражение',
      content: `
        <span>Противнику удалось отбить вашу атаку, операция провалена.</span>
        <p style='font-size: 150%'>Потери</p>
        <span>Потери вашей армии составили: ${militaryLoss[0]} ед. танковых дивизий, ${militaryLoss[1]} ед. авиационных эскадр, ${militaryLoss[2]} ед. ракетных комплексов, ${militaryLoss[3]} ед. подводных лодок, ${militaryLoss[4]} ед. тяжелых крейсеров.</span>
      `,
    });
  }
};
</script>

<style scoped lang="scss">
section {
  width: 100%;
  height: 95%;

  .title {
    font-size: 230%;
    margin-bottom: 3%;
  }

  .country-name {
    margin: -2% 0 5%;
    font-size: 500%;
    font-weight: 400;
  }

  h2,
  h3 {
    margin: 1% 0;
  }
}
</style>
