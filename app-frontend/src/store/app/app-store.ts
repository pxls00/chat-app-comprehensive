import { defineStore } from "pinia";
import type { IAppStore } from "./app-store.types";

export const useAppStore = defineStore({
  id: "app",
  state: (): IAppStore => {
    return {
      loading: true,
      // modal: {
      //   isOpen: false,
      //   modalName: "",
      // },
    };
  },

  actions: {
    // openModal(modalName: string) {
    //   this.modal.isOpen = true;
    //   this.modal.modalName = modalName;
    // },
    // closeModal() {
    //   this.modal.isOpen = false;
    //   this.modal.modalName = "";
    // }
  },
});