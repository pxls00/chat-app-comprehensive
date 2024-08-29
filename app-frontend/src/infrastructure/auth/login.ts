import instance from "../axios-instance";
import type { IAuthResponse, IAuthLoginRequest } from "@/infrastructure/auth/auth.types";
import type { AxiosError } from "axios";


export function login (payload: IAuthLoginRequest):Promise<IAuthResponse> {
  return instance.post("/auth/login", payload)
    // .then(({ data }: { data: IAuthResponse}) => data)
    .then((res) => {
      return res.data;
    })
    .catch((error: AxiosError<{message: string}>) => {
      return Promise.reject(error.response?.data.message || "Failed to authorize user");
    });
}