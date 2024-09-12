<template>
<button 
    :class="[
      'text-dark bg-white transition ease-in-out duration-300',
      size === 'medium' ? 'py-[8px] px-[26px] rounded-[14px]' : size === 'small' ? 'py-[6px] px-[20px] rounded-[10px]' : 'py-[12px] px-[32px] rounded-[18px]'
    ]"
    data-test-id="app-button"
    :disabled='loading'
    :type="type"
    >
    <slot v-if='!loading' />
    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
    <!-- <InfiniteSpinnerLoading v-else/> -->
    </button>
</template>

<script lang="ts">
// import InfiniteSpinnerLoading from "@/assets/svg/infinite-spinner-animated-loading.svg?component";

type TButtonPropsType = "button" | "submit" | "reset"
type TButtonPropsSize = "large" | "medium" | "small"
type TButtonPropsColor = "white" | "default" | "red"

import { type PropType } from "vue";

export default {
  name: "AppButton",
  props: {
    type: {
      required: true,
      type: String as PropType<TButtonPropsType>,
    },
    color: {
      required: true,
      type: String as PropType<TButtonPropsColor>,
    },
    loading: {
      required: true,
      type: Boolean
    },
    size: {
      required: false,
      type: String as PropType<TButtonPropsSize>,
    }
  }
}

</script>