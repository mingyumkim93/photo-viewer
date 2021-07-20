<template>
  <div class="color-picker-container">
    <v-card class="d-flex-column justify-center pa-2">
      <div class="d-flex space-around">
        <label for="background" class="mr-2">Background</label>
        <input type="color" name="background" :value="backgroundColor" @input="setBackgroundColor" />
      </div>
      <div class="d-flex justify-space-between">
        <label for="text" class="mr-2">Text</label>
        <input type="color" name="text" :value="textColor" @input="setTextColor" />
      </div>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn text @click="toggleColorPickerOpen">close</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ColorPicker",
  props: {
    backgroundColor: { type: String, required: true },
    textColor: {
      type: String,
      required: true
    },
    setBackgroundColor: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(e: Event) => void>,
      required: true
    },
    setTextColor: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(e: Event) => void>,
      required: true
    },
    toggleColorPickerOpen: {
      type: Function as PropType<() => void>,
      required: true
    }
  }
});
</script>

<style scoped>
.color-picker-container {
  position: absolute;
  z-index: 1;
}
</style>
