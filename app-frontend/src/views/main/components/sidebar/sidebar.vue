<template>
  <div class="sidebar  p-[16px] flex flex-col fixed inset-y-0 left-0 max-w-[350px] w-full h-full">
    <div class="sidebar__content flex flex-col gap-[20px] bg-darkblue w-full h-full flex-grow rounded-lg pt-[20px] pb-[20px] px-[15px] shadow-lg">
      <AddFriend>
        <template #search>
          <input
            type="text"
            class="w-full bg-transparent border border-white rounded-lg outline:none focus:outline-none text-white placeholder:text-white py-[10px] px-[8px]"
            placeholder="Search..."
            :value="searchValue"
            @input="debouncedSearch"
          >
          <!-- <AppInput
            :size="'small'"

            :loading="false"
          /> -->
        </template>
      </AddFriend>
      <TransitionGroup tag="div" name="chats" class="tab-list overflow-x-hidden flex flex-col max-h-[70%] h-full overflow-y-auto gap-[10px]">
        <div 
          v-for="item in searchedChatLists" 
          :key="item.userid"
          @click="openTab(item)"
          :class="[
            'tab-item flex items-center cursor-pointer gap-[10px] w-full rounded-lg transition ease-in-out duration-300',
            messageStore.activeTab.userid === item.userid ? 'bg-active-dark border-4 border-dark py-[16px] px-[6px]': 'bg-dark py-[20px] px-[10px]'
          ]"
        >
          <span :class="['w-[14px] h-[14px] block rounded-full', item.connected === 'true' ? 'bg-green' : 'bg-red']"></span>
          <h4 class="heading heading--xxs">{{ item.email }}</h4>
        </div>
      </TransitionGroup>
      <div class="tab-footer mt-auto flex flex-col gap-[10px]">
        <!-- <AppButton :type="'button'" :loading="false" :size="'small'"  :color="'default'">
          Settings
        </AppButton> -->
        <AppButton :type="'button'" :loading="false" :size="'small'"  :color="'red'">
          Log out
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from "@/components/app/app-button.vue";
import AppInput from "@/components/app/app-input.vue";
import { useMessageStore } from '@/store/message/message-store';
import type { IChatItem } from '@/store/message/message-store.types';

import debounce from "@/utils/debounce";
import AddFriend from "../widgets/add-friend.vue";
import { computed, ref } from "vue";
const messageStore = useMessageStore();

const searchValue = ref<string>("");
const searchedChatLists = computed(() => {
  return messageStore.chatList.filter(item => item.email.includes(searchValue.value))
})

const debouncedSearch = debounce(async function ($event) {
  if(searchValue.value === $event.target.value) {
    return;
  }

  searchValue.value = $event.target.value; 
}, 500);

function openTab(item: IChatItem) {
  messageStore.setActiveTab(item)
}

</script>

<style lang="scss">
.chats-move,
.chats-enter-active,
.chats-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.chats-enter-from,
.chats-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.chats-leave-active {
  position: absolute;
}
</style>