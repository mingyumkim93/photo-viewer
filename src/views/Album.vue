<template>
  <v-container>
    <v-progress-circular v-if="isLoading" indeterminate color="text"></v-progress-circular>
    <MediaSlider
      v-if="medias.length > 0"
      :medias="medias"
      :isEditMode="false"
      :toggleEnlargedImage="toggleEnlargedImage"
    />
    <div v-if="isNotFound">Not found</div>
    <ImageZoom v-if="enlargedImage" :image="enlargedImage" :toggleEnlargedImage="toggleEnlargedImage" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Media } from "@/types/Media";
import MediaSlider from "../components/MediaSlider.vue";
import ImageZoom from "../components/ImageZoom.vue";
import axios from "axios";

export default defineComponent({
  name: "Album",
  components: { MediaSlider, ImageZoom },
  setup() {
    const medias = ref<Media[]>([]);
    const isLoading = ref(true);
    const isNotFound = ref(false);
    const { enlargedImage, toggleEnlargedImage } = useEnlargedImage();

    onMounted(() => {
      //fetch medias
      const id = window.location.href.split("/").pop();
      const baseURL =
        // eslint-disable-next-line no-undef
        process.env.NODE_ENV === "production" ? "https://photo-viewer-alpha.vercel.app/" : "http://localhost:3000/";
      axios
        .get(baseURL + "api/medias", { params: { id } })
        .then((res) => {
          medias.value = res.data.medias;
          isLoading.value = false;
        })
        .catch(() => {
          //TODO: better error handling is needed
          isNotFound.value = true;
          isLoading.value = false;
        });
    });
    return { medias, isLoading, isNotFound, enlargedImage, toggleEnlargedImage };
  }
});

//TODO: this is duplicated from Main.vue
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
</style>
