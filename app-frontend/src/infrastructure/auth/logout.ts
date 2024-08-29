import instance from "../axios-instance";
import type { IAuthResponse } from "@/infrastructure/auth/auth.types";
import type { AxiosError } from "axios";


export function logout ():Promise<IAuthResponse> {
  return instance.get("/auth/logout")
    .then(({ data }: { data: IAuthResponse}) => data)
    .catch((error: AxiosError<{message: string}>) => {
      return Promise.reject(error.response?.data.message || "Failed to log out");
    });
}