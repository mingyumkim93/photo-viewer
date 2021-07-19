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
    <ToastGroup :toasts="toasts" :removeToastMessage="removeToastMessage" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import MediaSlider from "../components/MediaSlider.vue";
import Controls from "../components/Controls.vue";
import ImageZoom from "../components/ImageZoom.vue";
import ShareDialog from "../components/ShareDialog.vue";
import ToastGroup from "../components/ToastGroup.vue";
import { Media } from "../types/Media";
import { MediaType } from "../types/MediaType";
import { Album } from "../types/Album";
import { Toast } from "../types/Toast";
import { ToastType } from "../types/ToastType";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import storage from "../lib/storage";

export default defineComponent({
  name: "Main",
  components: { MediaSlider, Controls, ImageZoom, ShareDialog, ToastGroup },
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
    const { toasts, addToastMessage, removeToastMessage } = useToast();
    const { isShareDialogOpen, albumURL, openShareDialog, closeShareDialog, shareAlbum } = useShare(addToastMessage);
    const { isEditMode, toggleEditmode } = useEditMode();
    const { enlargedImage, toggleEnlargedImage } = useEnlargedImage();

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
      shareAlbum,
      toasts,
      addToastMessage,
      removeToastMessage
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
        type,
        file
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

// eslint-disable-next-line no-unused-vars
function useShare(addToastMessage: (type: ToastType, text: string) => void) {
  const isShareDialogOpen = ref(false);
  const albumId = ref<string>("");
  const albumURL = ref<string>("");

  function openShareDialog() {
    albumId.value = uuidv4();
    albumURL.value = window.location.href + "album/" + albumId.value;
    isShareDialogOpen.value = true;
  }

  function closeShareDialog() {
    albumId.value = "";
    albumURL.value = "";
    isShareDialogOpen.value = false;
  }

  async function shareAlbum(medias: Media[]) {
    const mediasAfterUpload = await uploadMedias(medias);
    const album: Album = {
      id: albumId.value,
      medias: mediasAfterUpload,
      createdAt: new Date()
    };

    return axios
      .post("api/medias", { album })
      .then(() => {
        addToastMessage(ToastType.Success, "Your album is created");
      })
      .catch(() => {
        addToastMessage(ToastType.Error, "Something went wrong");
      });
  }

  async function uploadMedias(medias: Media[]): Promise<Media[]> {
    const mediasAfterUpload = Promise.all(
      medias.map(async (media) => {
        //upload image file to storage
        if (media.file) {
          const uploadTask = await storage.ref(`medias/${albumId.value}/${media.id}`).put(media.file);
          return {
            id: media.id,
            url: (await uploadTask.ref.getDownloadURL()) as string,
            type: media.type
          };
        }
        return media;
      })
    );

    return mediasAfterUpload;
  }

  return { isShareDialogOpen, albumURL, openShareDialog, closeShareDialog, shareAlbum };
}

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

function useEditMode() {
  const isEditMode = ref(true);
  function toggleEditmode() {
    isEditMode.value = !isEditMode.value;
  }

  return { isEditMode, toggleEditmode };
}

function useEnlargedImage() {
  const enlargedImage = ref<Media | null>(null);
  function toggleEnlargedImage(image: Media) {
    enlargedImage.value = enlargedImage.value ? null : image;
  }

  return { enlargedImage, toggleEnlargedImage };
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
