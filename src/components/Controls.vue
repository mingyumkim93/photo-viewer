<template>
  <div v-if="isEditMode" class="button-group">
    <v-btn class="ma-1" icon text color="background" @click="toggleEditmode">
      <v-icon>mdi-view-carousel</v-icon>
    </v-btn>
    <v-btn class="ma-1" icon text color="background" @click="openFileInput">
      <v-icon>mdi-plus-box</v-icon>
    </v-btn>
    <v-btn class="ma-1" v-if="theme === 'dark'" icon text color="background" @click="toggleTheme">
      <v-icon>mdi-lightbulb-on</v-icon>
    </v-btn>
    <v-btn class="ma-1" v-if="theme === 'light'" icon text color="background" @click="toggleTheme">
      <v-icon>mdi-lightbulb-off</v-icon>
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
    toggleTheme: {
      type: Function as PropType<() => void>,
      required: true
    },
    theme: {
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
