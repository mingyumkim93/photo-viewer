<template>
  <!-- TODO: change to v-dialog component once Vuetify 3 supports it -->
  <v-card v-if="isShareDialogOpen" sm="6" md="4" class="share-dialog-container" elevation="20">
    <v-card-title> Creating your album to </v-card-title>
    <v-card-text> {{ albumURL }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="closeShareDialog"> Cancel </v-btn>
      <v-btn text @click="closeShareDialog"> Share </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "MainViewer",
  props: {
    isShareDialogOpen: {
      type: Boolean,
      required: true
    },
    closeShareDialog: {
      type: Function as PropType<() => void>,
      required: true
    },
    albumURL: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.share-dialog-container {
  position: absolute;
  z-index: 1;
}
</style>
