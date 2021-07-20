<template>
  <v-app @dragover.prevent @drop.prevent>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  components: { RouterView }
});
</script>
