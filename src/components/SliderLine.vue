<template>
  <div class="line">
    <div class="value-slider" :style="{ left: computedValue + '%' }"></div>
    <span class="side-label">Низкая</span>
    <span class="side-label">Высокая</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface IProps {
  value: number;
}

const props = defineProps<IProps>();

const computedValue = computed(() => (props.value / 100) * 94 + 1);
</script>

<style scoped lang="scss">
.line {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5%;
  padding: 0 2%;
  background: linear-gradient(
    90deg,
    rgba(0, 97, 26, 1) 0%,
    rgba(255, 240, 0, 1) 50%,
    rgba(225, 0, 25, 1) 100%
  );
  border: 1px solid black;
  box-shadow: 0 0 8px black;
  border-radius: 2% / 25%;

  .value-slider {
    position: absolute;
    width: 4%;
    height: 140%;
    border-radius: 25% / 10%;
    background: #030303;
  }

  .side-label {
    font-size: 130%;
    color: black;
  }
}
</style>
