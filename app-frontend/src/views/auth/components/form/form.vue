<template>
  <form @submit.prevent="submitForm" class="flex flex-col max-h-max h-full max-w-[500px] w-full bg-cyan-500 rounded-[22px] pt-[40px] pb-[20px] px-[22px] text-center shadow-lg shadow-cyan-500/50">
    <h2 class='heading heading--lg mb-[40px]'>{{ props.title }}</h2>
    <slot></slot>
  </form>

</template>

<script lang="ts" setup>

interface IAuthFormComponentProps {
  title: string,
}

interface IAuthFormComponentEmits {
  (e: 'submit'): void

}

const props = defineProps<IAuthFormComponentProps>();
const emits = defineEmits<IAuthFormComponentEmits>()


function submitForm() {
  emits("submit")
}

</script>