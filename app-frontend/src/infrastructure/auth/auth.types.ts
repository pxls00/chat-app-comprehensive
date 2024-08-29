import type { IUser } from "@/store/user/user-store.types";


export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser
}

export interface IAuthLoginRequest {
  email: string;
  password: string;
}

export interface IAuthRegisterRequest {
  email: string,
  password: string,
  name: string,
}
