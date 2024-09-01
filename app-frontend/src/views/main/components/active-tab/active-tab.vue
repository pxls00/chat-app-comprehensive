<template>
  <div class="active-tab p-[16px] flex flex-col fixed inset-y-0 right-0 flex-shrink w-full h-full">
    <div v-if="!!messageStore.activeTab.userid"class="active-tab__content flex flex-col gap-[20px] bg-darkblue w-full h-full flex-grow rounded-lg pt-[20px] pb-[20px] px-[15px] shadow-lg">
      <div class="rounded-tl-lg rounded-tr-lg bg-dark py-[12px] px-[20px] pb-[40px] flex justify-center items-center text-center">
        <h4 class="heading heading--xs">{{messageStore.activeTab.email}}</h4>
      </div>
      <div ref="messageListBlock" class="message-list flex flex-grow flex-col gap-[14px] bg-dark overflow-y-auto px-[20px] py-[14px] flex-col-reverse">
        <div 
          v-for="(item, idx) in messageList" :key="idx" 
          :class="[
            'message-item rounded-lg py-[8px] px-[12px]',
            !isMessageNotOur(item) ? 'bg-active-dark' : 'bg-white',
            !isMessageNotOur(item) ? 'mr-auto' : 'ml-auto'
          ]"
        >
          <p 
            :class="[!isMessageNotOur(item) ? 'text-white' : 'text-dark']"
          >{{item.content}}</p>
        </div>
      </div>
      <Chatbox />
    </div>
    <div v-else class="flex flex-col text-center items-center justify-center gap-[20px] bg-darkblue w-full h-full flex-grow rounded-lg pt-[20px] pb-[20px] px-[15px] shadow-lg">
      <p class="heading heading--sm text-white">Select chat to messaging...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chatbox from '../widgets/chatbox.vue';
// import AppButton from "@/components/app/app-button.vue";
// import AppInput from "@/components/app/app-input.vue";
import { useMessageStore } from '@/store/message/message-store';
import type { IMessageItem } from '@/store/message/message-store.types';
import { useUserStore } from '@/store/user/user-store';
import { computed, ref, watch } from 'vue';
// import type { IActiveTab } from '@/store/message/message-store.types';

const messageStore = useMessageStore();
const user = useUserStore()
const messageListBlock = ref<null | HTMLDivElement>(null);
const messageList = computed(() => {
  return messageStore.messages.filter((item) => item.to === messageStore.activeTab.userid || item.from === messageStore.activeTab.userid)
})


function isMessageNotOur(messageItem: IMessageItem) {
  return messageItem.to === messageStore.activeTab.userid
}

watch(() => messageStore.messages, () => {
  if(!!messageListBlock.value) {
    messageListBlock.value.scrollTop = messageListBlock.value.scrollHeight;
  }
})
</script>

<style scoped lang="scss">
.active-tab {
  max-width: calc(100% - 330px);
}
</style>