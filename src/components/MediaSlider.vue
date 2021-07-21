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
    @swiper="onSwiper"
  >
    <SwiperSlide v-for="media in medias" :key="media.id" v-slot="{ isActive }">
      <Photo
        v-if="media.type === MediaType.Image"
        :media="media"
        :isActive="isActive"
        :removeMedia="removeMedia"
        :isEditMode="isEditMode"
        :toggleEnlargedImage="toggleEnlargedImage"
        :textColor="textColor"
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

import { defineComponent, PropType, ref, watch, nextTick } from "vue";
import SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { EffectCoverflow } from "swiper/core";
import Photo from "@/components/Photo.vue";
import Video from "@/components/Video.vue";
import { Media } from "@/types/Media";
import { MediaType } from "@/types/MediaType";

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
      required: false
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
    textColor: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const mySwiper = ref<SwiperType | null>(null);
    function onSwiper(swiper: SwiperType) {
      mySwiper.value = swiper;
    }

    watch(
      () => props.medias,
      async () => {
        await nextTick();
        mySwiper.value?.slideTo(props.medias.length);
      }
    );

    return { MediaType, onSwiper };
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
