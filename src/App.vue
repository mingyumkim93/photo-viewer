<template>
  <v-app @dragover.prevent @drop.prevent :theme="theme" backgroundColor="background">
    <v-main>
      <MainViewer :toggleTheme="toggleTheme" :theme="theme" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MainViewer from "./components/MainViewer.vue";

export default defineComponent({
  name: "App",
  components: { MainViewer },
  setup() {
    const theme = ref("dark");
    function toggleTheme() {
      theme.value = theme.value === "dark" ? "light" : "dark";
    }

    return { theme, toggleTheme };
  }
});
</script>
