<template>
<button 
    :class="[
      'text-dark bg-white transition ease-in-out duration-300',
      props.size === 'medium' ? 'py-[8px] px-[26px] rounded-[14px]' : props.size === 'small' ? 'py-[6px] px-[20px] rounded-[10px]' : 'py-[12px] px-[32px] rounded-[18px]'
    ]"
    :disabled='props.loading'
    :type="props.type"
    >
    <slot v-if='!props.loading' />
    <InfiniteSpinnerLoading v-else/>
    </button>
</template>

<script lang="ts" setup>
import InfiniteSpinnerLoading from "@/assets/svg/infinite-spinner-animated-loading.svg?component";

type TButtonPropsType = "button" | "submit" | "reset"
type TButtonPropsSize = "large" | "medium" | "small"
type TButtonPropsColor = "white" | "default" | "red"

interface IAppButtonProps {
  type: TButtonPropsType,
  color: TButtonPropsColor,
  loading: boolean 
  size?: TButtonPropsSize
}

const props = defineProps<IAppButtonProps>();

</script>