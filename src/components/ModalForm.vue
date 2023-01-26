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
        <div class="content">{{ content }}</div>
        <button class="close-button" @click="modalStore.closeModal()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "@/store/modal.store";

interface IProps {
  width: string;
}

defineProps<IProps>();

const modalStore = useModalStore();
const { isOpen, header, content } = storeToRefs(modalStore);
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
  padding: 4rem;
  background: #fff;
  background: url("../assets/modal-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .header {
    font-size: 5rem;
    text-align: center;
    margin: 2rem 0;
  }

  .content {
    font-size: 2.3rem;
    margin: 15% 0;
  }

  .close-button {
    position: absolute;
    top: -4rem;
    right: -2rem;
    width: 8rem;
    height: 8rem;
    background: url("../assets/close-btn.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    cursor: pointer;
  }
}
</style>
