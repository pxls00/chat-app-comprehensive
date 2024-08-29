import { useUserStore } from "@/store/user/user-store";
// import $infra from "@/infrastructure/index";

import type { IAuthResponse } from "@/infrastructure/auth/auth.types";
import type { IUserResponse } from "@/infrastructure/user/user.types";


export async function setAuthData (authResponse: IAuthResponse): Promise<IUserResponse> {
  const userStore = useUserStore();
  
  localStorage.setItem("token", authResponse.accessToken);
  
  userStore.setUser(authResponse.user);

  return await authResponse.user;
}