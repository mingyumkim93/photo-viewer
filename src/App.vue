<template>
  <v-app @dragover.prevent @drop.prevent :theme="theme" backgroundColor="background">
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { theme, toggleTheme } from "./lib/theme";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  components: { RouterView },
  setup() {
    return { theme, toggleTheme };
  }
});
</script>
