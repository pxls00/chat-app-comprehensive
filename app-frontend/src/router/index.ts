import { createRouter, createWebHistory } from "vue-router";

// import $infra from "../infrastructure/index";
// import $service from "../service/index";

import MainLayout from "@/layouts/main-layout.vue";
import AuthLayout from "@/layouts/auth-layout.vue";

import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: AuthLayout,
      beforeEnter (to, from, next) {
        // beforeAuthRoute(next);
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
      ],
    },
    {
      path: "/",
      name: "main",
      component: MainLayout,
      // alias: "/main",
      // beforeEnter (to, from, next) {
      //   beforeEachRoute(to, from, next);
      // },
      meta: { requiresAuth: true },
      redirect: {
        name: "main-pages", 
      },
      children: [
        {
          path: "chat",
          name: "main-pages",
          meta: { requiresAuth: true },
          component: () => import("@/views/main/chat/chat.vue") 
        },
      ],
    },
  ],
});

// async function beforeEachRoute (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
//   try {
//     console.log(localStorage.getItem("token"));

//     if (!localStorage.getItem("token")) {
//       console.log("router doesnt exist so it redirected to auth");
//       // const authResponse = await $infra.auth.checkAuth();
//       await $service.auth.resetAuthData();
    
//       return next("/auth");
//     }
//     next();
//   } catch (error) {
//     next("/auth");
//   }
// }

// router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
//   if (to.meta.requiresAuth && !localStorage.getItem("token")) {
//     await $service.auth.resetAuthData();

//     return {
//       path: "/signin",

//       query: { redirect: to.fullPath },
//     };
//   }
// });


// async function beforeAuthRoute (next: NavigationGuardNext) {
//   try {
//     // await $infra.auth.logout();
    
//     await $service.auth.resetAuthData();

//   } catch (error) {
//     console.log(error);
//   } finally {
//     next();
//   }
// }


export default router;
