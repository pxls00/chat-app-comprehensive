<template>
    <div class="wrapper">
      <div class="wrapper__content min-h-screen w-full bg-dark">
        <RouterView />
        <Transition>
          <div class="wrapper__modals">
  
          </div>
        </Transition>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "MainLayout",
    components: {
    },
  });
  </script>
  
  <script setup lang="ts">
  import { RouterView } from "vue-router";
  </script>
  

<style scoped lang="scss">

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>