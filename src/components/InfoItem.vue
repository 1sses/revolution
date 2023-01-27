<template>
  <p class="item">
    <span>{{ label }}</span>
    <span>{{ value }}</span>
  </p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface IProps {
  label: string;
  value: string | number;
}

defineProps<IProps>();
</script>

<style scoped lang="scss">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5% 0;
  font-size: 180%;
}
</style>
