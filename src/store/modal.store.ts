import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    isOpen: false,
    header: "",
    content: "",
  }),
  actions: {
    openModal({ header, content }: { header: string; content: string }) {
      this.isOpen = true;
      this.header = header;
      this.content = content;
    },
    closeModal() {
      this.isOpen = false;
      this.header = "";
      this.content = "";
    },
  },
});
