import { defineStore } from "pinia";
import type {IUser, IUserStore} from "./user-store.types";

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserStore => {
    return {
      user: {
        email: "",
        name: null,
        uuid: null,
      },
    };
  },

  actions: {
    setUser (payload: IUser) {
      console.log("set useer", payload)
      this.user = {
        email: payload.email || "",
        name: payload.name || "",
        uuid: payload.uuid || "",
      };
    },
    resetUser () {
      console.log("reset user")
      this.user = {
        email: "",
        name: "",
        uuid: "",
      };
    },
  },
});