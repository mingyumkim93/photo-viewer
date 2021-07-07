<template>
  <v-app>
    <v-main>
      <PhotoViewer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PhotoViewer from "./components/PhotoViewer.vue";

export default defineComponent({
  name: "App",

  components: {
    PhotoViewer,
  },
});
</script>

<style scoped>
.v-application {
  background-color: black;
}
</style>
