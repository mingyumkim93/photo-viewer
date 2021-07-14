<template>
  <v-container @drop="handleMediaDragAndDrop">
    <v-btn class="exit-button" v-if="!isEditMode" icon text @click="toggleEditmode" color="background">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <MediaSlider
      :medias="medias"
      :removeMedia="removeMedia"
      :isEditMode="isEditMode"
      :toggleEnlargedImage="toggleEnlargedImage"
      :theme="theme"
    />
    <Controls
      :handleMediaInput="handleMediaInput"
      :isEditMode="isEditMode"
      :toggleEditmode="toggleEditmode"
      :toggleTheme="toggleTheme"
      :theme="theme"
      :openShareDialog="openShareDialog"
      :isShareDialogOpen="isShareDialogOpen"
    />
    <ImageZoom v-if="enlargedImage" :image="enlargedImage" :toggleEnlargedImage="toggleEnlargedImage" />
    <ShareDialog
      :isShareDialogOpen="isShareDialogOpen"
      :albumURL="albumURL"
      :closeShareDialog="closeShareDialog"
      :shareAlbum="shareAlbum"
      :medias="medias"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import MediaSlider from "./MediaSlider.vue";
import Controls from "./Controls.vue";
import ImageZoom from "./ImageZoom.vue";
import ShareDialog from "./ShareDialog.vue";
import { Media } from "../types/Media";
import { MediaType } from "../types/MediaType";
import { Album } from "../types/Album";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default defineComponent({
  name: "MainViewer",
  components: { MediaSlider, Controls, ImageZoom, ShareDialog },
  props: {
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
    const { medias, handleMediaInput, handleMediaDragAndDrop, removeMedia } = useMedias();
    const { isShareDialogOpen, albumURL, openShareDialog, closeShareDialog, shareAlbum } = useShare();
    const isEditMode = ref(true);
    function toggleEditmode() {
      isEditMode.value = !isEditMode.value;
    }

    const enlargedImage = ref<Media | null>(null);
    function toggleEnlargedImage(image: Media) {
      enlargedImage.value = enlargedImage.value ? null : image;
    }

    return {
      medias,
      handleMediaInput,
      handleMediaDragAndDrop,
      removeMedia,
      isEditMode,
      toggleEditmode,
      enlargedImage,
      toggleEnlargedImage,
      isShareDialogOpen,
      albumURL,
      openShareDialog,
      closeShareDialog,
      shareAlbum
    };
  }
});

function useMedias() {
  const { SAMPLE_IMAGES } = useSampleImages();
  const medias = ref<Media[]>(SAMPLE_IMAGES);

  function handleMediaInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = [...input.files];
      addMedias(files);
      input.value = "";
    }
  }

  function handleMediaDragAndDrop(e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      const files = [...e.dataTransfer.files];
      addMedias(files);
    }
  }

  function addMedias(files: File[]) {
    const newMedias = files.map((file, index) => {
      const currentImageIds = medias.value.map((media) => media.id);
      const currentMaxId = currentImageIds.length > 0 ? Math.max(...currentImageIds) : 0;
      const type = file.type.split("/")[0] === "image" ? MediaType.Image : MediaType.Video;
      return {
        id: currentMaxId + 1 + index,
        url: URL.createObjectURL(file),
        type
      };
    });
    medias.value = [...medias.value, ...newMedias];
  }

  function removeMedia(id: number) {
    medias.value = medias.value.filter((media) => media.id !== id);
  }

  return { medias, handleMediaInput, handleMediaDragAndDrop, removeMedia };
}

function useSampleImages() {
  const SAMPLE_IMAGES: Media[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      type: MediaType.Image
    },
    {
      id: 2,
      url: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/minimalist-orange-armando-borges.jpg",
      type: MediaType.Image
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      type: MediaType.Image
    }
  ];

  return { SAMPLE_IMAGES };
}

function useShare() {
  const isShareDialogOpen = ref(false);
  const id = ref<string>("");
  const albumURL = ref<string>("");

  function openShareDialog() {
    id.value = uuidv4();
    albumURL.value = window.location.href + id.value;
    isShareDialogOpen.value = true;
  }

  function closeShareDialog() {
    id.value = "";
    albumURL.value = "";
    isShareDialogOpen.value = false;
  }

  async function shareAlbum(medias: Media[]) {
    //upload medias to db
    //show toast message
    const album: Album = {
      id: id.value,
      medias,
      createdAt: new Date()
    };
    return axios.post("api/medias", { album }).then((res) => console.log(res));
  }
  return { isShareDialogOpen, albumURL, openShareDialog, closeShareDialog, shareAlbum };
}
</script>

<style scoped>
.v-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.exit-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
