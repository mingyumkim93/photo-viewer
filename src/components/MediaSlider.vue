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
      v-for="media in medias"
      :key="media.id"
      v-slot="{ isActive }"
    >
      <Photo
        v-if="media.type === MediaType.Image"
        :media="media"
        :isActive="isActive"
        :removeMedia="removeMedia"
        :isEditMode="isEditMode"
        :toggleEnlargedImage="toggleEnlargedImage"
      />
      <Video
        v-if="media.type === MediaType.Video"
        :media="media"
        :isActive="isActive"
        :removeMedia="removeMedia"
        :isEditMode="isEditMode"
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
import Video from "./Video.vue";
import { Media } from "../types/Media";
import { MediaType } from "../types/MediaType";

SwiperCore.use([EffectCoverflow]);

export default defineComponent({
  name: "MediaSlider",
  components: { Swiper, SwiperSlide, Photo, Video },
  props: {
    medias: {
      type: Object as PropType<Media[]>,
      required: true
    },
    removeMedia: {
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
      type: Function as PropType<(image: Media) => void>,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  setup() {
    return { MediaType };
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
  max-width: 500px;
  height: auto;
}
</style>
