<template>
<button 
    class="text-dark bg-white py-[12px] px-[32px] rounded-[18px] transition ease-in-out duration-300"
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
type TButtonPropsColor = "green"

interface IAppButtonProps {
  type: TButtonPropsType,
  color: TButtonPropsColor,
  loading: boolean 
}

const props = defineProps<IAppButtonProps>();

</script>