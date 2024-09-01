<template>
    <div class="flex gap-[20px]">
        <Sidebar />
        <ActiveTab />
    </div>
    <!-- <h1 class="text-3xl font-bold underline">
        Hello world!
    </h1> -->
    <!-- <router-link to="/signin">Sign in </router-link> -->
</template>

<script setup lang="ts">
import { useMessageStore } from "@/store/message/message-store";
import Sidebar from "../components/sidebar/sidebar.vue"
import ActiveTab from "../components/active-tab/active-tab.vue";
import socket from "@/socket";
import $infrastructure from "@/infrastructure/index";
import $service from "@/service/index";
const messageStore = useMessageStore()

socket.connect();

socket.on("friend_list", (friendList) => {
    console.log("friend_list", friendList)
    messageStore.setChatList(friendList)
})

socket.on("messages", (messages) => {
    messageStore.setMessageList(messages)
})

socket.on("add_friend", (user) => {
    console.log(user);
    messageStore.setChatList([user, ...messageStore.chatList])
})

socket.on("dm", (message) => {
    console.log(message)
    messageStore.setMessageList([message, ...messageStore.messages])
})

socket.on("connected", (status, email) => {
    console.log("action", status, email)
    const friends = [...messageStore.chatList]
    messageStore.setChatList(friends.map(friend => {
        if(friend.email === email) {
            friend.connected = status
        }
        return friend
    }))
}) 

socket.on("connect_error", async () => {
    console.log("we got error")
    await $infrastructure.auth.logout();
    await $service.auth.resetAuthData();
})

</script>