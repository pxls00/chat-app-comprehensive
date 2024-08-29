<template>
  <input
    :value="modelValue"
    @input="updateModelValue"
    :disabled='loading'
    class="bg-transparent px-[20px] py-[12px] border border-white rounded-lg outline:none focus:outline-none text-white placeholder:text-white"
  />
</template>

<script setup lang="ts">
interface IAppFieldProps {
  modelValue: string,
  loading: boolean, 
}

interface IAppFieldsEmits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<IAppFieldProps>();
const emits = defineEmits<IAppFieldsEmits>()

function updateModelValue(event: Event) {
  const inputEl = event.target as HTMLInputElement
  emits("update:modelValue", inputEl.value)
}
</script>