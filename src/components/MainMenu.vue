<template>
  <div style="height: 100%">
    <WideButton
      text="Начать новую игру"
      style="height: 16%; font-size: 50%"
      @btn-click="() => startNewGame()"
    />
  </div>
</template>

<script setup lang="ts">
import WideButton from '@/components/WideButton.vue';
import { useAppStore } from '@/store/app.store';
import { useModalStore } from '@/store/modal.store';

const appStore = useAppStore();
const modalStore = useModalStore();
const startNewGame = () => {
  appStore.$reset();
  modalStore.closeModal();
};
</script>

<style scoped></style>
