import instance from "../axios-instance";
import type { IUserResponse } from "@/infrastructure/user/user.types";
import type { AxiosError } from "axios";


export function getUser ():Promise<IUserResponse> {
  return instance.get("/me")
    // .then(({ data }: { data: IAuthResponse}) => data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error: AxiosError<{message: string}>) => {
      return Promise.reject(error.response?.data.message || "Failed to get user");
    });
}