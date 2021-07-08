<template>
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
      slideShadows: true
    }"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false
    }"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <v-img class="image" :src="image" />
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts">
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { EffectCoverflow, Autoplay } from "swiper/core";

SwiperCore.use([EffectCoverflow, Autoplay]);

export default defineComponent({
  name: "PhotoSlider",
  components: { Swiper, SwiperSlide },
  props: {
    images: {
      type: Array,
      required: true
    }
  }
});
</script>

<style scoped>
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
  -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, #0006);
}
</style>
