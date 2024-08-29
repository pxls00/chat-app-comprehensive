import instance from "../axios-instance";
import type { IAuthRegisterRequest, IAuthResponse } from "@/infrastructure/auth/auth.types";
import type { AxiosError } from "axios";


export function register (payload: IAuthRegisterRequest):Promise<IAuthResponse> {
  return instance.post("/auth/register", payload)
    .then((res) => {
      return res.data;
    })
    .catch((error: AxiosError<{message: string}>) => {
      return Promise.reject(error.response?.data.message || "Failed to register user");
    });
}