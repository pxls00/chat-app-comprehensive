<template>
  <AuthForm :title="'Sign in'" @submit='submitAuthLogin'>
    <h5 class="heading heading--grey font-semibold heading--sm mb-[20px] text-left">Enter your email & password</h5>
    <div class="flex flex-col gap-[20px] flex">
      <AppField :errorMessage="v$.email.$error ? v$.email.$errors[0].$message : ''" title="Email Adress">
        <AppInput 
          v-model="formFields.email"
          type="text"
          placeholder="test@gmail.com" 
          :loading="loading" />
      </AppField>
      <AppField :errorMessage="v$.password.$error ? v$.password.$errors[0].$message : ''" title="Password">
        <AppInput 
          v-model="formFields.password"
          type="password"
          placeholder="test@1234"
          :loading="loading" />
      </AppField>
      <div class="ml-auto w-full mt-[50px] flex justify-end items-center gap-[20px]">
        <span class="heading heading--xxs text-dark">If you don't have account, <router-link :to="{name: 'auth-signup'}" class="underline underline-offset-4">sign up</router-link></span>
        <AppButton 
          @click="submitAuthLogin"
          :type="'submit'"
          :loading="loading"
          :color="'white'">
          Sign in
        </AppButton>
      </div>
    </div>
  </AuthForm>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import $infra from "@/infrastructure/index";
import $service from "@/service/index";

import AuthForm from "./components/form/form.vue"
import AppButton from "@/components/app/app-button.vue";
import AppField from "@/components/form-elements/app-field.vue";
import AppInput from "@/components/app/app-input.vue";
import type { IAuthLoginRequest } from "@/infrastructure/auth/auth.types";


interface ISignInFormFields {
  email: Ref<string>,
  password: Ref<string>,
}

const router = useRouter();
const loading = ref<boolean>(false);
const formFields = reactive<ISignInFormFields>({
  email: ref<string>(""),
  password: ref<string>(""),
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, formFields);


async function submitAuthLogin () {
  loading.value = true;
  try {
    const isFormCorrect = await v$.value.$validate();
    if(isFormCorrect) {
      const requestData = {
        email: formFields.email,
        password: formFields.password
      } as IAuthLoginRequest;

      // console.log(requestData)
      const authResponse = await $infra.auth.login(requestData);

      await $service.auth.setAuthData(authResponse);
      router.push({ name: "main" });
    }
  } catch (error) {
    console.log("error auth signin", error);
  } finally {
    loading.value = false;
  }
}


</script>