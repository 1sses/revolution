<template>
  <section>
    <h1 class="country-name" style="text-align: center">Замбия</h1>
    <h2 class="title green">Уровень развития</h2>
    <InfoItem label="Население:" value="18000 человек" />
    <InfoItem label="Бюджет страны:" value="68400 руб." />
    <InfoItem label="Прирост бюджета:" value="180 руб." />
    <h2 class="title green" style="margin-top: 5%">Данные об армии</h2>
    <InfoItem label="Танковая дивизия:" value="4 в строю" />
    <InfoItem label="Авиационная эскадрилья:" value="3 в строю" />
    <InfoItem label="Ракетный комплекс:" value="2 в строю" />
    <InfoItem
      label="Подводная лодка:"
      value="0 в строю"
      style="margin-top: 5%"
    />
    <InfoItem label="Тяжелый крейсер:" value="0 в строю" />
    <InfoItem label="Атомная бомба:" value="0 в строю" />
    <h2 class="title green" style="margin-top: 5%">
      Обороноспособность страны
    </h2>
    <SliderLine :value="29" />
    <WideButton text="Атаковать" style="margin-top: 5%" />
  </section>
</template>

<script setup lang="ts">
import SliderLine from '@/components/SliderLine.vue';
import InfoItem from '@/components/InfoItem.vue';
import WideButton from '@/components/WideButton.vue';
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
