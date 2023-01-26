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
  row-gap: 1rem;
  width: 25%;

  .button {
    display: block;
    padding: 1.5rem;
    font-size: 1.75rem;
    width: 100%;
    aspect-ratio: 1/1;
    border: none;
    background: url('../assets/button-bg.png');
    background-size: contain;
    cursor: pointer;
  }

  .upper-text,
  .lower-text {
    margin: 5px 0;
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>
