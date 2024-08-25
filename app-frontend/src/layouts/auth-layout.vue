<template>
  <div class="auth-layout">
    <div class="auth-content">
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
