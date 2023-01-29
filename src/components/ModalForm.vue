<template>
  <div class="overlay" v-show="isOpen">
    <div
      :style="{
        width: `calc(${width})`,
        height: `calc((${width}) * 1728 / 1299)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }"
    >
      <div
        class="modal-inner"
        :style="{
          width: `calc(${width} - 18%)`,
          height: `calc((${width} - 13%) * 1728 / 1299)`,
        }"
      >
        <h2 class="header">{{ header }}</h2>
        <div class="content">
          <v-runtime-template :template="content" />
        </div>
        <button class="close-button" @click="modalStore.closeModal()" />
        <img
          v-show="showWoman"
          class="modal-woman"
          src="../assets/woman.png"
          alt="woman"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/store/modal.store';
import VRuntimeTemplate from 'vue3-runtime-template';

interface IProps {
  width: string;
}

defineProps<IProps>();

const modalStore = useModalStore();
const { isOpen, header, content, showWoman } = storeToRefs(modalStore);
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-inner {
  position: relative;
  padding: 5%;
  background: #fff;
  background: url('../assets/modal-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .header {
    font-size: 400%;
    text-align: center;
    margin: 1% 0 2%;
  }

  .content {
    height: 80%;
    font-size: 180%;
    margin: 12% 0;
  }

  .close-button {
    position: absolute;
    top: -4%;
    right: -2%;
    width: 13%;
    aspect-ratio: 1/1;
    background: url('../assets/close-btn.png') no-repeat;
    background-size: 100% 100%;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  .modal-woman {
    position: absolute;
    bottom: -13%;
    right: -5%;
    width: 90%;
    pointer-events: none;
  }
}
</style>
