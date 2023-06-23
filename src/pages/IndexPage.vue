<template> 
  <q-page class="flex-center">
    <div class="q-pa-lg flex-center">
      <div v-for="message in messages" :key="message">
        <q-chat-message :sent="name === message.name" :name="message.name">
          <p>{{ message.message }}</p></q-chat-message
        >
        <!-- <q-chat-message :name="message.name" ><p></p>
         </q-chat-message
        > -->
        <!-- <q-chat-message name="Jane" :text="[mess]" /> -->
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
      <q-btn label="Send" @click="send" />
    </div>
  </q-page>
</template>

<script>
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");

export default {
  name: "IndexPage",
  data() {
    return {
      messages: [],
      name: null,
      message: null,
      room_id: null,
    };
  },
  methods: {
    send() {
      const message = {
        name: this.name,
        message: this.message,
        room_id: this.room_id,
      };

      socket.emit("message", message);
      this.message = "";
    },
  },
  mounted() {
    socket.on("connect_error", (error) => {
      console.error(error);
    });

    socket.on("message", (data) => {
      console.log(data)
      this.messages.unshift(data);
    });
  },
};
</script>
<style>
.input {
  width: 50%;
}
</style>
