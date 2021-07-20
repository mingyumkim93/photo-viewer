<template>
  <div @dblclick="enlarge">
    <v-img :src="media.url" />
    <v-btn v-if="isEditMode && isActive" icon text @click="remove"
      ><v-icon :color="textColor">mdi-delete</v-icon></v-btn
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Media } from "../types/Media";

export default defineComponent({
  name: "Photo",
  props: {
    media: {
      type: Object as PropType<Media>,
      required: true
    },
    isActive: {
      type: Boolean,
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
    textColor: {
      type: String,
      required: true
    }
  },
  setup(props) {
    function remove() {
      props.removeMedia(props.media.id);
    }

    function enlarge() {
      props.toggleEnlargedImage(props.media);
    }
    return { remove, enlarge };
  }
});
</script>

<style scoped>
.v-btn {
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: transparent;
}
</style>
