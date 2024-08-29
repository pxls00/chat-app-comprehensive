import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router";

import $infrastructure from "../infrastructure/index";
import $service from "../service/index";

import MainLayout from "@/layouts/main-layout.vue";
import AuthLayout from "@/layouts/auth-layout.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: AuthLayout,
      beforeEnter (to, from, next) {
        beforeAuthRoute(next);
      },
      redirect: {
        name: "auth-signin",  
      },
      children: [
        {
          path: "/signin",
          name: "auth-signin",
          component: () => import("@/views/auth/auth-signin.vue"),
        },
        {
          path: "/signup",
          name: "auth-signup",
          component: () => import("@/views/auth/auth-signup.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "main",
      component: MainLayout,
      // alias: "/main",
      beforeEnter (to, from, next) {
        beforeEachRoute(to, from, next);
      },
      meta: { requiresAuth: true },
      redirect: {
        name: "chat-page", 
      },
      children: [
        {
          path: "chat",
          name: "chat-page",
          meta: { requiresAuth: true },
          component: () => import("@/views/main/chat/chat.vue") 
        },
      ],
    },
  ],
});

async function beforeEachRoute (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  try {
    if (!localStorage.getItem("token")) {
      const authResponse = await $infrastructure.auth.checkAuth();

      await $service.auth.setAuthData(authResponse);
    }
    next();
  } catch (error) {
    console.log(error);
    next("/auth");
  }
}

// router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
//   if (to.meta.requiresAuth && !localStorage.getItem("token")) {
//     await $service.auth.resetAuthData();
//     console.log("it is returning")
//     return {
//       path: "/signin",

//       query: { redirect: to.fullPath },
//     };
//   }
// });


async function beforeAuthRoute (next: NavigationGuardNext) {
  try {
    await $infrastructure.auth.logout();
    await $service.auth.resetAuthData();

  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
}


export default router;
