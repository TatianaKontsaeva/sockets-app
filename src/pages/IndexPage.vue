<template>
  <q-page class="flex-center">
    <div class="q-pa-md row justify-center">
      <div  style="width: 400px;" >
        <h3>Chat</h3>
        <q-chat-message 
          name="me" 
          :text="['hey, how are you?']" 
          sent 
        />
        <q-chat-message 
          name="Jane" 
          :text="['doing fine, how r you?']" 
        />
      </div>
    </div>
    <div class="flex-center column">
      <!-- <q-input 
        outlined 
        class="q-pa-md input" 
        v-model="room_id" 
      /> -->
      <q-input 
        label="Your name"
        outlined 
        class="q-pa-md input" 
        v-model="name"
      />
      <q-input 
        label="Your message"
        outlined 
        class="q-pa-md input" 
        v-model="message" 
        @keydown.enter="send" 
      />
      <q-btn 
        label="Send" 
        @click="send"
        @keydown.enter="send" 
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
const { io } = require("socket.io-client");

//with middleware
// const socket = io("http://localhost:3001", {
//   auth: {
//     token: 'secret'
//   }
// });

// socket.on("connected", (arg) => {
//   console.log(arg); // world
// });

const socket = io("http://localhost:3001");

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
      name: null,
      message: null,
      room_id: 1,
    };
  },
  methods: {
    send() {
      socket.emit("message", {
        name: this.name,
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
