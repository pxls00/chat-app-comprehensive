import axios from "axios";
import type { AxiosInstance } from "axios";
import type { IAuthResponse } from "./auth/auth.types";
// import { toast } from "vue3-toastify";


export const VITE_API_URL = import.meta.env.VITE_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL: `${VITE_API_URL}/api`,
  withCredentials: true,
  // headers: {
    // 'Access-Control-Allow-Origin': "*"
  // }
});

instance.interceptors.request.use((config) => {
  config.params = config.params || {};

  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  };

  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  return response;
}, async function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401) {
    console.log("user's token has expired so front sending the refresh request to get new access token by refresh token")
    try {
      const refreshTokenResponse = await axios.get<IAuthResponse>(`${VITE_API_URL}/auth/refresh`, { withCredentials: true });

      localStorage.setItem("token", refreshTokenResponse.data.accessToken);

      return instance.request(originalRequest);
    } catch (error) {
      return Promise.reject("User unauthorized");
    }
  }

  return Promise.reject(error);
});

export default instance;