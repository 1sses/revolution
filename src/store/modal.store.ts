import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    queue: [] as any[],
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
      if (this.isOpen) {
        this.queue.push({ header, content, showWoman });
        return;
      }
      this.isOpen = true;
      this.header = header;
      this.content = content;
      this.showWoman = showWoman;
    },
    closeModal() {
      this.isOpen = false;
      if (this.queue.length > 0) {
        setTimeout(() => {
          const nextModal = this.queue.shift();
          this.openModal(nextModal);
        }, 1000);
      }
    },
  },
});
