<template>
  <div class="tab-header flex flex-col gap-[10px] mb-[20px]">
    <div class="flex w-full">
      <slot name="search"/>
    </div>
    <AppButton @click="openAddFriendModal" :type="'button'" :loading="false"  :color="'default'" :size="'small'">
      Add Friend
    </AppButton>
  </div>
  <AppModal :isOpen="isOpenAddFriendModal" @close="closeAddFriendModal" ref="addFriendModal">
    <form @submit.prevent="submitAddFriendModal">
      <div class="modal-title w-full flex justify-center text-center mb-[20px] text-white heading heading--sm">Add Friend</div>
      <div class="modal-content w-full flex flex-col gap-[20px]">
        <AppField :errorMessage="v$.email.$error ? v$.email.$errors[0].$message : formFieldsEmailExistedError" title="Email Adress">
          <AppInput
            placeholder="Friend's email..."
            v-model="formFields.email"
            :loading="false"
          />
        </AppField>
      </div>
      <div class="modal-actions w-full flex justify-end mt-[30px]">
        <AppButton :type="'submit'" :loading="false" :size="'large'" :color="'default'">
          Add
        </AppButton>
      </div>
    </form>
  </AppModal>
</template>

<script lang="ts" setup>
import { ref, reactive, type Ref } from "vue";
import socket from "@/socket";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import AppInput from "@/components/app/app-input.vue";
import AppModal from "@/components/app/app-modal.vue";
import AppField from "@/components/form-elements/app-field.vue";
import AppButton from "@/components/app/app-button.vue";
import { useMessageStore } from "@/store/message/message-store";

const messageStore = useMessageStore();

interface IAddFriend {
  email: Ref<string>,
}

const formFields = reactive<IAddFriend>({
  email: ref<string>("")
})

const rules = {
  email: { required, email },
};
const v$ = useVuelidate(rules, formFields);

const formFieldsEmailExistedError = ref<string>('');
const isOpenAddFriendModal = ref<boolean>(false);
const searchUserName = ref<string>('');
const loading = ref<boolean>(false);

async function closeAddFriendModal() {
  isOpenAddFriendModal.value = false
  formFieldsEmailExistedError.value = ""
  formFields.email = "";
  v$.value.$reset()
}

async function submitAddFriendModal() {
  loading.value = true

  try {
    const isFormCorrect = await v$.value.$validate();
    if(isFormCorrect) {
      socket.emit("add_friend", formFields.email, ({error, done, friendItem}: {error: string, done: boolean, friendItem: any}) => {
        if(!done) {
          formFieldsEmailExistedError.value = error
          return
        }else {
          messageStore.setChatList([...messageStore.chatList, friendItem])
          closeAddFriendModal();
          console.log(done, friendItem);
        }
      })
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false
  }
} 

function openAddFriendModal() {
  isOpenAddFriendModal.value = true
}

</script>

