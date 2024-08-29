<template>
  <div class="flex flex-col gap-[4px]">
    <h5 class="heading heading--xxs font-normal text-[14\px] color-white text-left">{{ props.title }}</h5>
    <slot />
    <span class='heading text-[12px] text-left text-dark font-light'> {{ props.errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';


interface IAppFieldProps {
  title: string,
  errorMessage: string | Ref<string>, 
}

const props = defineProps<IAppFieldProps>();
</script>