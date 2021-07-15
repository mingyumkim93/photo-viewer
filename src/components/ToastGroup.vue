<template>
  <div class="toast-group d-flex flex-column justify-space-around ma-3">
    <ToastMessage v-for="toast in toasts" :key="toast.id" :toast="toast" :removeToastMessage="removeToastMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Toast } from "../types/Toast";
import ToastMessage from "./ToastMessage.vue";

export default defineComponent({
  name: "ToastGroup",
  components: { ToastMessage },
  props: {
    toasts: {
      type: Array as PropType<Toast[]>,
      required: true
    },
    removeToastMessage: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(id: number) => void>,
      required: true
    }
  },
  setup() {}
});
</script>

<style scoped>
.toast-group {
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 1;
}
</style>
