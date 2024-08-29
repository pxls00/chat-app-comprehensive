import instance from "../axios-instance";
import type { IAuthResponse } from "@/infrastructure/auth/auth.types";
import type { AxiosError } from "axios";


export function checkAuth ():Promise<IAuthResponse> {
  return instance.get("/auth/refresh", { withCredentials: true})
    // .then(({ data }: { data: IAuthResponse}) => data)
    .then((res) => {
      return res.data;
    })
    .catch((error: AxiosError<{message: string}>) => {
      return Promise.reject("User unauthorized");
    });
}