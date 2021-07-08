<template>
  <div v-if="isEditMode" class="button-group">
    <v-btn icon text color="black" @click="toggleEditmode">
      <v-icon color="white">mdi-view-carousel</v-icon>
    </v-btn>
    <v-btn icon text color="black" @click="openFileInput">
      <v-icon color="white">mdi-image-plus</v-icon>
    </v-btn>
    <input type="file" accept="image/*" hidden id="image-input" @change="handleImageInput" multiple />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Controls",
  props: {
    handleImageInput: {
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
    }
  },
  setup() {
    function openFileInput() {
      const input = document.getElementById("image-input");
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
