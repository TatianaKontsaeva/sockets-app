<template>
  <q-page class="flex-center column">
    <q-input 
      outlined 
      class="q-pa-md"
      v-model="message"
    />
    <q-btn label="Send" @click="send"/>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");

socket.on("connected", (arg) => {
  console.log(arg); // world
});

export default defineComponent({
  name: "IndexPage",

  data() {
    return {
      message: null
    }
  },
  methods: {
    send () {
      socket.emit("message", this.message)
    }
  }
});
</script>
