<template>
  <v-container>
    <PhotoSlider :images="images" />
    <Controls :addImage="addImage" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PhotoSlider from "./PhotoSlider.vue";
import Controls from "./Controls.vue";

export default defineComponent({
  name: "MainViewer",
  components: { PhotoSlider, Controls },
  setup() {
    const SAMPLE_IMAGES = [
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/minimalist-orange-armando-borges.jpg",
      "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    ];
    const images = ref<string[]>([...SAMPLE_IMAGES]);

    function addImage(e: Event) {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const imageURL = URL.createObjectURL(file);
        images.value = [...images.value, imageURL];
      }
      return "a";
    }

    return { images, addImage };
  }
});
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
