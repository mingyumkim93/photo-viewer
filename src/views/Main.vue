<template>
  <v-container @drop="handleMediaDragAndDrop" fluid :style="'background-color:' + backgroundColor">
    <v-btn class="exit-button" v-if="!isEditMode" icon text @click="toggleEditmode" :color="backgroundColor">
      <v-icon :color="textColor">mdi-close</v-icon>
    </v-btn>
    <MediaSlider
      :medias="medias"
      :removeMedia="removeMedia"
      :isEditMode="isEditMode"
      :toggleEnlargedImage="toggleEnlargedImage"
      :textColor="textColor"
    />
    <Controls
      :handleMediaInput="handleMediaInput"
      :isEditMode="isEditMode"
      :toggleEditmode="toggleEditmode"
      :openShareDialog="openShareDialog"
      :isShareDialogOpen="isShareDialogOpen"
      :toggleColorPickerOpen="toggleColorPickerOpen"
      :backgroundColor="backgroundColor"
      :textColor="textColor"
    />
    <ImageZoom
      v-if="enlargedImage"
      :image="enlargedImage"
      :toggleEnlargedImage="toggleEnlargedImage"
      :textColor="textColor"
    />
    <ShareDialog
      :isShareDialogOpen="isShareDialogOpen"
      :albumURL="albumURL"
      :closeShareDialog="closeShareDialog"
      :shareAlbum="shareAlbum"
      :medias="medias"
    />
    <ColorPicker
      v-if="isColorPickerOpen"
      :backgroundColor="backgroundColor"
      :textColor="textColor"
      :setBackgroundColor="setBackgroundColor"
      :setTextColor="setTextColor"
      :toggleColorPickerOpen="toggleColorPickerOpen"
    />
    <ToastGroup :toasts="toasts" :removeToastMessage="removeToastMessage" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onBeforeMount, computed } from "vue";
import { mediaStore } from "@/store/mediaStore";
import { colorStore } from "@/store/colorStore";
import MediaSlider from "../components/MediaSlider.vue";
import Controls from "../components/Controls.vue";
import ImageZoom from "../components/ImageZoom.vue";
import ShareDialog from "../components/ShareDialog.vue";
import ToastGroup from "../components/ToastGroup.vue";
import ColorPicker from "../components/ColorPicker.vue";
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
  components: { MediaSlider, Controls, ImageZoom, ShareDialog, ToastGroup, ColorPicker },
  setup() {
    const { medias, handleMediaInput, handleMediaDragAndDrop, removeMedia } = useMedias();
    const { toasts, addToastMessage, removeToastMessage } = useToast();
    const { isEditMode, toggleEditmode } = useEditMode();
    const { enlargedImage, toggleEnlargedImage } = useEnlargedImage();
    const { isColorPickerOpen, backgroundColor, textColor, toggleColorPickerOpen, setBackgroundColor, setTextColor } =
      useColorPicker();
    const { isShareDialogOpen, albumURL, openShareDialog, closeShareDialog, shareAlbum } = useShare(
      addToastMessage,
      backgroundColor,
      textColor
    );

    onBeforeMount(async () => {
      await mediaStore.init();
      await colorStore.init();
    });

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
      removeToastMessage,
      isColorPickerOpen,
      backgroundColor,
      textColor,
      toggleColorPickerOpen,
      setBackgroundColor,
      setTextColor
    };
  }
});

function useMedias() {
  const medias = computed<Media[]>(() => mediaStore.getState().medias);

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
      const files = [...e.dataTransfer.files].filter(
        (file) => file.type.includes("image") || file.type.includes("video")
      );
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
    // medias.value = [...medias.value, ...newMedias];
    mediaStore.addMedias(newMedias);
  }

  function removeMedia(id: number) {
    // medias.value = medias.value.filter((media) => media.id !== id);
    mediaStore.removeMedia(id);
  }

  return { medias, handleMediaInput, handleMediaDragAndDrop, removeMedia };
}

function useShare(
  // eslint-disable-next-line no-unused-vars
  addToastMessage: (type: ToastType, text: string, secondButtonText?: string, secondButtonHandler?: Function) => void,
  backgroundColor: Ref<string>,
  textColor: Ref<string>
) {
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
      createdAt: new Date(),
      backgroundColor: backgroundColor.value,
      textColor: textColor.value
    };

    return axios
      .post("api/medias", { album })
      .then((res) => {
        const albumURL = window.location.href + "album/" + res.data.albumId;
        function moveToAlbum() {
          window.open(albumURL);
        }
        addToastMessage(ToastType.Success, "Your album is created", "Move to album", moveToAlbum);
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

  function addToastMessage(type: ToastType, text: string, secondButtonText?: string, secondButtonHandler?: Function) {
    const id = getNextToastId();
    const toast: Toast = { id, type, text, secondButtonText, secondButtonHandler };
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

function useColorPicker() {
  const isColorPickerOpen = ref(false);
  const backgroundColor = computed(() => colorStore.getState().backgroundColor);
  const textColor = computed(() => colorStore.getState().textColor);

  function setBackgroundColor(e: InputEvent) {
    // backgroundColor.value = (e.target as HTMLInputElement).value;
    colorStore.setBackgroundColor((e.target as HTMLInputElement).value);
  }

  function setTextColor(e: InputEvent) {
    // textColor.value = (e.target as HTMLInputElement).value;
    colorStore.setTextColor((e.target as HTMLInputElement).value);
  }

  function toggleColorPickerOpen() {
    isColorPickerOpen.value = !isColorPickerOpen.value;
  }

  return { isColorPickerOpen, backgroundColor, textColor, toggleColorPickerOpen, setBackgroundColor, setTextColor };
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
