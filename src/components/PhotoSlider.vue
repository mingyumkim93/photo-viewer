<template>
  <Swiper
    :effect="'coverflow'"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 20,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true
    }"
  >
    <SwiperSlide
      :class="{ light: theme === 'light', dark: theme === 'dark' }"
      v-for="image in images"
      :key="image.id"
      v-slot="{ isActive }"
    >
      <Photo
        :image="image"
        :isActive="isActive"
        :removeImage="removeImage"
        :isEditMode="isEditMode"
        :toggleEnlargedImage="toggleEnlargedImage"
      />
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts">
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";

import { defineComponent, PropType } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { EffectCoverflow } from "swiper/core";
import Photo from "./Photo.vue";
import { Image } from "../types/Image";

SwiperCore.use([EffectCoverflow]);

export default defineComponent({
  name: "PhotoSlider",
  components: { Swiper, SwiperSlide, Photo },
  props: {
    images: {
      type: Object as PropType<Image[]>,
      required: true
    },
    removeImage: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(id: number) => void>,
      required: true
    },
    isEditMode: {
      type: Boolean,
      required: true
    },
    toggleEnlargedImage: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(image: Image) => void>,
      required: true
    },
    theme: {
      type: String,
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

.swiper-container >>> .swiper-wrapper {
  align-items: center;
}

.swiper-slide {
  width: 500px;
  height: auto;
}
</style>
