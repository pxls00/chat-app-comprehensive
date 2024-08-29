<template>
  <div class="bg-black">
    <div class="min-h-screen flex justify-center align-center p-[50px]">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthLayout",
  components: {
  },
});
</script>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
