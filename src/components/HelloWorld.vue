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
  </v-container>
</template>

<script lang="ts">
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import { computed, defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { EffectCoverflow, Autoplay } from "swiper/core";

SwiperCore.use([EffectCoverflow, Autoplay]);

export default defineComponent({
  name: "HelloWorld",
  components: { Swiper, SwiperSlide },
  setup() {
    const SAMPLE_IMAGES = [
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/minimalist-orange-armando-borges.jpg",
      "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    ];

    const images = computed(() => [...SAMPLE_IMAGES]);

    return { images };
  },
});
</script>

<style scoped>
.v-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
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
</style>
