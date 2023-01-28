import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    header: '',
    content: '',
    showWoman: true,
  }),
  actions: {
    openModal({
      header,
      content,
      showWoman = true,
    }: {
      header: string;
      content: string;
      showWoman?: boolean;
    }) {
      this.isOpen = true;
      this.header = header;
      this.content = content;
      this.showWoman = showWoman;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
});
