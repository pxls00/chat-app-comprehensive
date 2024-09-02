<template>
  <AuthForm @submit='submitAuthSignup' :title="'Sign up'">
    <h5 class="heading heading--grey font-semibold heading--sm mb-[20px] text-left">Create your name & email & password</h5>
    <div class="flex flex-col gap-[20px] flex">
      <AppField :errorMessage="''"title="Name">
        <AppInput 
          v-model="formFields.name"
          type="text"
          placeholder="John" 
          :loading="loading" />
      </AppField>
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
          placeholder="test1234"
          :loading="loading" />
      </AppField>
      <div class="ml-auto w-full mt-[50px] flex justify-end items-center gap-[20px]">
        <span class="heading heading--xxs text-dark">If you aleardy have account, <router-link :to="{name: 'auth-signin'}" class="underline underline-offset-4">sign in</router-link></span>
        <AppButton 
          :type="'submit'"
          :loading="loading"
          :color="'default'">
          Sign up
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
import type { IAuthRegisterRequest } from "@/infrastructure/auth/auth.types";


interface ISignUpFormFields {
  name: Ref<string>,
  email: Ref<string>,
  password: Ref<string>,
}

const router = useRouter();
const loading = ref<boolean>(false);
const formFields = reactive<ISignUpFormFields>({
  name: ref<string>(""),
  email: ref<string>(""),
  password: ref<string>(""),
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, formFields);


async function submitAuthSignup () {
  loading.value = true;
  
  try {
    const isFormCorrect = await v$.value.$validate();
    if(isFormCorrect) {
      const requestData = {
        name: formFields.name,
        email: formFields.email,
        password: formFields.password
      } as IAuthRegisterRequest;

      const authResponse = await $infra.auth.register(requestData);

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