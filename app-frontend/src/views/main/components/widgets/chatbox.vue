<template>
  <form @submit.prevent="submitMessage" class="flex gap-[20px] max-h-[70px] items-center py-[12px] px-[20px] bg-dark rounded-bl-lg rounded-br-lg h-full">
    <input v-model="formFields.message" class="resize-none flex-1  h-full bg-transparent focus:outline-none outline-none text-white" placeholder="Message..">
    <!-- <button type="submit" class="w-[50px] flex justify-center items-center text-white"></button> -->
    <AppButton @keydown.prevent :type="'submit'" :loading="false" :size="'small'" :color="'default'">
      Send
    </AppButton>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useMessageStore } from '@/store/message/message-store';
import type { IMessageItem } from '@/store/message/message-store.types';
import socket from '@/socket';
import { useUserStore } from '@/store/user/user-store';

import AppButton from '@/components/app/app-button.vue';

interface SocketEmitCallback<T> {
  error: string,
  done: boolean,
  messageItem: IMessageItem
}

const mesasgeStore = useMessageStore()
const userStore = useUserStore()

const formFields = reactive({
  message: ref<string>("")
})

function clearForm() {
  formFields.message = ""
}

function submitMessage() {
  try {
    console.log(userStore.user);
    const message = {
      to: mesasgeStore.activeTab.userid,
      from: null,
      content: formFields.message
    };
    socket.emit("dm", message, ({error, done, messageItem}: SocketEmitCallback<IMessageItem>) => {
      if(!done) {
        console.log(error);
        return
      }else {
        mesasgeStore.setMessageList([messageItem, ...mesasgeStore.messages])

      }
    });

    clearForm();
  } catch (error) {
    console.log(error)    
  }
}

</script>

write a callback function where we call setMessageList with actualMessagePayload.
and make the same addFriend emit's as dm to addFriend