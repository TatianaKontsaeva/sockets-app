<template>
  <q-page class="flex-center column">
    <q-input outlined class="q-pa-md input" v-model="room_id" />
    <q-input outlined class="q-pa-md input" v-model="message" />
    <q-btn label="Send" @click="send" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001", {
  auth: {
    token: 'secret'
  }
});

// socket.on("connected", (arg) => {
//   console.log(arg); // world
// });

socket.on("message", (data) => {
  console.log(data); 
});

socket.on("connection_error", (data) => {
  console.log(data); 
});


export default defineComponent({
  name: "IndexPage",

  data() {
    return {
      message: null,
      room_id: 1,
    };
  },
  methods: {
    send() {
      socket.emit("message", {
        message: this.message,
        room_id: this.room_id,
      });
    },
  },
});
</script>
<style>
.input {
  width: 50%;
}
</style>