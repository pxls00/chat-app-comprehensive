<template>
  <Teleport to="body">
    <Transition>
      <div v-if="props.isOpen" class="modal fixed inset-0 w-full h-screen z-20 flex justify-center items-center">
        <div @click="closeModal" class="modal__overlay absolute inset-0 z-20 bg-overlay"></div>
        <div @click="closeModal" class="modal__close absolute z-20 top-0 right-0 p-[20px] bg-white">
          x
        </div>
        <div class="modal__content w-full max-w-[500px] max-h-[80%] h-max-content overflow-y-auto z-20 bg-cyan-500 rounded-[22px] pt-[40px] pb-[20px] px-[22px] shadow-lg shadow-cyan-500/50">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
interface IAppModalEmits {
  (e: 'close'):void
}

interface IAppModalProps {
  isOpen: boolean,
}

const emits = defineEmits<IAppModalEmits>();
const props = defineProps<IAppModalProps>();

function closeModal() {
  emits("close")
}
</script>

<style scoped lang="scss">

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>