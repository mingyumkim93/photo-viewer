<template>
  <!-- TODO: use v-snackbar component once Vuetify 3 supports it -->
  <v-card :color="toast.type" class="mt-2 d-flex align-center">
    <v-card-text>
      {{ toast.text }}
    </v-card-text>
    <v-spacer></v-spacer>
    <div class="mr-2">
      <v-btn :color="toast.type" text @click="handleClose"> Close </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Toast } from "@/types/Toast";

export default defineComponent({
  name: "ToastGroup",
  props: {
    toast: {
      type: Object as PropType<Toast>,
      required: true
    },
    removeToastMessage: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(id: number) => void>,
      required: true
    }
  },
  setup(props) {
    function handleClose() {
      props.removeToastMessage(props.toast.id);
    }

    return { handleClose };
  }
});
</script>
