<template>
  <v-card width="70%" @dblclick="close" class="image-zoom-container">
    <v-img :src="image.url" />
    <v-btn icon text @click="close"><v-icon :color="textColor">mdi-close</v-icon></v-btn>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Media } from "@/types/Media";

export default defineComponent({
  name: "ImageZoom",
  props: {
    image: {
      type: Object as PropType<Media>,
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
    function close() {
      props.toggleEnlargedImage(props.image);
    }
    return { close };
  }
});
</script>

<style scoped>
.image-zoom-container {
  z-index: 1;
  position: absolute;
}

.v-btn {
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: transparent;
}
</style>
