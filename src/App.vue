<template>
  <v-app @dragover.prevent @drop.prevent :theme="theme" backgroundColor="background">
    <v-main>
      <MainViewer :toggleTheme="toggleTheme" :theme="theme" :addToastMessage="addToastMessage" />
      <ToastGroup :toasts="toasts" :removeToastMessage="removeToastMessage" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MainViewer from "./components/MainViewer.vue";
import ToastGroup from "./components/ToastGroup.vue";
import { Toast } from "./types/Toast";
import { ToastType } from "./types/ToastType";

export default defineComponent({
  name: "App",
  components: { MainViewer, ToastGroup },
  setup() {
    const theme = ref("dark");
    const { toasts, addToastMessage, removeToastMessage } = useToast();
    function toggleTheme() {
      theme.value = theme.value === "dark" ? "light" : "dark";
    }

    return { theme, toggleTheme, toasts, addToastMessage, removeToastMessage };
  }
});

function useToast() {
  const toasts = ref<Toast[]>([]);

  function getNextToastId() {
    const currentToastIds = toasts.value.map((toast) => toast.id);
    const currentMaxId = currentToastIds.length > 0 ? Math.max(...currentToastIds) : 0;
    const id = currentMaxId + 1;
    return id;
  }

  function addToastMessage(type: ToastType, text: string) {
    const id = getNextToastId();
    const toast: Toast = { id, type, text };
    toasts.value = [...toasts.value, toast];
  }

  function removeToastMessage(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  return { toasts, addToastMessage, removeToastMessage };
}
</script>
