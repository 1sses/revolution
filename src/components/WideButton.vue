<template>
  <div class="wide-button-wrapper">
    <button class="button green" @click="$emit('btn-click')">
      {{ text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface IProps {
  text: string;
}

defineProps<IProps>();
</script>

<style scoped lang="scss">
.wide-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 11.5%;

  .button {
    display: block;
    font-size: 400%;
    width: 100%;
    height: 100%;
    border: none;
    background: url('../assets/button-bg.png');
    background-size: contain;
    cursor: pointer;
  }
}
</style>
