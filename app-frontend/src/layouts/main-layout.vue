<template>
    <div class="wrapper">
      <div class="wrapper__content">
        <RouterView />
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
  