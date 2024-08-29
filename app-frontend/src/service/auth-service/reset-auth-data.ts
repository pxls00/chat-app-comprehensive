import { useUserStore } from "@/store/user/user-store";

export function resetAuthData () {
  const userStore = useUserStore();

  localStorage.removeItem("token");
  userStore.resetUser();
}