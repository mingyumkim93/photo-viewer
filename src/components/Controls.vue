<template>
  <div v-if="isEditMode" class="button-group">
    <v-btn class="ma-1" :color="backgroundColor" icon text @click="toggleEditmode">
      <v-icon :color="textColor">mdi-view-carousel</v-icon>
    </v-btn>
    <v-btn class="ma-1" :color="backgroundColor" icon text @click="openFileInput">
      <v-icon :color="textColor">mdi-plus-box</v-icon>
    </v-btn>
    <v-btn class="ma-1" :color="backgroundColor" icon text @click="toggleColorPickerOpen">
      <v-icon :color="textColor"> mdi-palette</v-icon>
    </v-btn>
    <v-btn class="ma-1" :color="backgroundColor" icon text @click="openShareDialog" :disabled="isShareDialogOpen">
      <v-icon :color="textColor">mdi-share</v-icon>
    </v-btn>
    <input type="file" accept="image/*, video/*" hidden id="media-input" @change="handleMediaInput" multiple />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Controls",
  props: {
    handleMediaInput: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(e: Event) => void>,
      required: true
    },
    isEditMode: {
      type: Boolean,
      required: true
    },
    toggleEditmode: {
      type: Function as PropType<() => void>,
      required: true
    },
    openShareDialog: {
      type: Function as PropType<() => void>,
      required: true
    },
    isShareDialogOpen: {
      type: Boolean,
      required: true
    },
    toggleColorPickerOpen: {
      type: Function as PropType<() => void>,
      required: true
    },
    backgroundColor: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      required: true
    }
  },
  setup() {
    function openFileInput() {
      const input = document.getElementById("media-input");
      if (input) input.click();
    }

    return { openFileInput };
  }
});
</script>

<style scoped>
.button-group {
  margin-top: 50px;
}
</style>
