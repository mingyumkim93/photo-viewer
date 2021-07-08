<template>
  <v-app>
    <v-main>
      <MainViewer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainViewer from "./components/MainViewer.vue";

export default defineComponent({
  name: "App",

  components: { MainViewer }
});
</script>

<style scoped>
.v-application {
  background-color: black;
}
</style>
