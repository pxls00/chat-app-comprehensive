import type { IAuthLoginRequest, IAuthRegisterRequest } from "./auth/auth.types";


export default class Infrastructure {
  static auth = {
    checkAuth () {
      return import("./auth/check-auth").then((module) => module.checkAuth());
    },
    login (payload: IAuthLoginRequest) {
      return import("./auth/login").then((module) => module.login(payload));
    },
    register (payload: IAuthRegisterRequest) {
      return import("./auth/register").then((module) => module.register(payload));
    },
    logout () {
      return import("./auth/logout").then((module) => module.logout());
    },
  };
}