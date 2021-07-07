<template>
  <v-container>
    <Swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index"
        ><v-img class="image" :src="image"
      /></SwiperSlide>
    </Swiper>
    <div class="button-group">
      <v-btn icon text color="black"
        ><v-icon color="white">mdi-view-carousel</v-icon></v-btn
      >
      <v-btn icon text color="black" @click="openFileInput"
        ><v-icon color="white">mdi-image-plus</v-icon></v-btn
      >
    </div>
    <input
      type="file"
      accept="image/*"
      hidden
      id="image-input"
      @change="addImage"
    />
  </v-container>
</template>

<script lang="ts">
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import { defineComponent, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { EffectCoverflow, Autoplay } from "swiper/core";

SwiperCore.use([EffectCoverflow, Autoplay]);

export default defineComponent({
  name: "PhotoViewer",
  components: { Swiper, SwiperSlide },
  setup() {
    const SAMPLE_IMAGES = [
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/minimalist-orange-armando-borges.jpg",
      "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    ];
    const images = ref<string[]>([...SAMPLE_IMAGES]);

    function addImage(e: Event) {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const imageURL = URL.createObjectURL(file);
        images.value = [...images.value, imageURL];
      }
    }

    function openFileInput() {
      const input = document.getElementById("image-input");
      if (input) input.click();
    }

    return { images, openFileInput, addImage };
  },
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

.swiper-container {
  width: 100%;
  padding-top: 50px;
}

.swiper-slide {
  width: 300px;
  height: 300px;
  background: #000;
}

.image {
  -webkit-box-reflect: below 1px
    linear-gradient(transparent, transparent, #0006);
}

.button-group {
  margin-top: 50px;
}
</style>
