<template>
  <div>
    <video width="500" controls :id="`video${media.id}`">
      <source :src="media.url" />
    </video>
    <v-btn v-if="isEditMode && isActive" icon text @click="remove"><v-icon>mdi-delete</v-icon></v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
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
    }
  },
  setup(props) {
    function remove() {
      props.removeMedia(props.media.id);
    }

    watch(
      () => props.isActive,
      () => {
        const video = document.getElementById(`video${props.media.id}`) as HTMLVideoElement;
        if (!props.isActive) video.pause();
      }
    );

    return { remove };
  }
});
</script>

<style scoped>
.v-btn {
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: transparent;
  z-index: 1;
}
</style>
