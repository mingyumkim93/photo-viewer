<template>
  <v-container>
    <PhotoSlider :images="images" :removeImage="removeImage" />
    <Controls :addImage="addImage" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PhotoSlider from "./PhotoSlider.vue";
import Controls from "./Controls.vue";
import { Image } from "../types/Image";

export default defineComponent({
  name: "MainViewer",
  components: { PhotoSlider, Controls },
  setup() {
    const { images, addImage, removeImage } = useImages();

    return { images, addImage, removeImage };
  }
});

function useImages() {
  const { SAMPLE_IMAGES } = useSampleImages();
  const images = ref<Image[]>(SAMPLE_IMAGES);

  function addImage(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = [...input.files];
      const newImages = files.map((file, index) => {
        const currentImageIds = images.value.map((image) => image.id);
        const currentMaxId = Math.max(...currentImageIds);
        return {
          id: currentMaxId + 1 + index,
          imageURL: URL.createObjectURL(file)
        };
      });
      input.value = "";
      images.value = [...images.value, ...newImages];
    }
  }

  function removeImage(id: number) {
    images.value = images.value.filter((image) => image.id !== id);
  }

  return { images, addImage, removeImage };
}

function useSampleImages() {
  const SAMPLE_IMAGES: Image[] = [
    {
      id: 1,
      imageURL:
        "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
    {
      id: 2,
      imageURL:
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/minimalist-orange-armando-borges.jpg"
    },
    {
      id: 3,
      imageURL:
        "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    }
  ];

  return { SAMPLE_IMAGES };
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
