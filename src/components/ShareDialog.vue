<template>
  <!-- TODO: change to v-dialog component once Vuetify 3 supports it -->
  <v-card v-if="isShareDialogOpen" sm="6" md="4" class="share-dialog-container" elevation="20">
    <v-card-title> Creating your album to </v-card-title>
    <v-card-text> {{ albumURL }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="closeShareDialog"> Cancel </v-btn>
      <v-btn text @click="handleShare" :disabled="isUploading"> Share </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Media } from "../types/Media";

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
    },
    shareAlbum: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(medias: Media[]) => Promise<void>>,
      required: true
    },
    medias: {
      type: Array as PropType<Media[]>,
      required: true
    }
  },
  setup(props) {
    const isUploading = ref(false);
    async function handleShare() {
      isUploading.value = true;
      await props.shareAlbum(props.medias);
      props.closeShareDialog();
      isUploading.value = false;
    }
    return { handleShare, isUploading };
  }
});
</script>

<style scoped>
.share-dialog-container {
  position: absolute;
  z-index: 1;
}
</style>
