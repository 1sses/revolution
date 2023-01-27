<template>
  <div class="square-button-wrapper">
    <span class="upper-text">{{ upperText }}</span>
    <button class="button green" @click="$emit('btn-click')">
      {{ innerText }}
    </button>
    <div>
      <p class="lower-text">{{ lowerText }}</p>
      <p class="lower-text">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface IProps {
  upperText: string | number;
  innerText: string | number;
  lowerText: string | number;
  subtitle?: string | number;
}

defineProps<IProps>();
</script>

<style scoped lang="scss">
.square-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2%;
  width: 28%;

  .button {
    display: block;
    padding: 13%;
    font-size: 140%;
    width: 100%;
    aspect-ratio: 1/1;
    border: none;
    background: url('../assets/square-button-bg.png');
    background-size: contain;
    cursor: pointer;
  }

  .upper-text,
  .lower-text {
    margin: 1% 0;
    font-size: 140%;
    text-align: center;
  }
}
</style>
