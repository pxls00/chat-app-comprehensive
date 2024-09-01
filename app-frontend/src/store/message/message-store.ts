import { defineStore } from "pinia";
import type { IMessageStore, IActiveTab, IChatItem, IMessageItem } from "./message-store.types";

export const useMessageStore = defineStore({
  id: "app",
  state: (): IMessageStore => {
    return {
      activeTab: {
        email: "",
        userid: "",
        connected: "false",
      },
      chatList: [],
      messages: [],
    };
  },

  actions: {
    setActiveTab(tab: IChatItem) {
      this.activeTab.email = tab.email
      this.activeTab.userid = tab.userid
      this.activeTab.connected = tab.connected
    },
    setChatList(list: IChatItem[]) {
      this.chatList = list
    },
    setMessageList(list: Array<IMessageItem>) {
      this.messages = list;
    }
  },
});