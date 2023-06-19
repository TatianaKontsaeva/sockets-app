<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
