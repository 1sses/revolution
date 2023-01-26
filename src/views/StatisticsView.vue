<template>
  <section>
    <h2 class="green title">Статистика развития</h2>
    <InfoItem label="Предприятий построено:" value="0" />
    <InfoItem label="Сформировано ВС:" value="0" />
    <InfoItem label="Атомное оружие:" value="Нет" />
    <h2 class="green title" style="text-align: center">Статус:</h2>
    <h1 class="status-name" style="text-align: center">Миниполис</h1>
    <h2 class="green title">Военная аналитика</h2>
    <InfoItem label="Участий в военных конфликтах:" value="0" />
    <InfoItem label="Побед:" value="0" />
    <InfoItem label="Поражений:" value="0" />
    <InfoItem label="Предприятий захвачено:" value="0" />
    <InfoItem label="Предприятий потеряно:" value="0" />
    <h2 class="green title">Данные о гражданах</h2>
    <InfoItem label="Погибло в конфликтах:" value="0" />
    <InfoItem label="Прогибло от голода:" value="0" />
  </section>
</template>

<script setup lang="ts">
import InfoItem from "@/components/InfoItem.vue";
</script>

<style scoped lang="scss">
section {
  width: 100%;
  color: floralwhite;

  .green {
    color: #c1cd32;
  }

  .title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .status-name {
    margin: 1rem 0 3rem;
    font-size: 5rem;
    font-weight: 400;
  }

  h2,
  h3 {
    margin: 1rem 0;
    font-weight: 400;
  }
}
</style>
