<template>
  <input
    :value="modelValue"
    @input="updateModelValue"
    :disabled='loading'
    :class="[
      'w-full bg-transparent border border-white rounded-lg outline:none focus:outline-none text-white placeholder:text-white',
      props.size === 'medium' ? 'py-[16px] px-[10px]' : props.size === 'small' ? 'py-[10px] px-[8px]' : 'px-[20px] py-[12px]'
    ]"
  />
</template>

<script setup lang="ts">
type TInputPropsSize = "large" | "medium" | "small"

interface IAppFieldProps {
  modelValue: string,
  size?: TInputPropsSize
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