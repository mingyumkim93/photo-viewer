<template>
  <div @dblclick="enlarge">
    <v-img :src="image.imageURL" />
    <v-btn v-if="isEditMode && isActive" icon text @click="remove"><v-icon>mdi-delete</v-icon></v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Image } from "../types/Image";

export default defineComponent({
  name: "Photo",
  props: {
    image: {
      type: Object as PropType<Image>,
      required: true
    },
    isActive: {
      type: Boolean,
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
  },
  setup(props) {
    function remove() {
      props.removeImage(props.image.id);
    }

    function enlarge() {
      props.toggleEnlargedImage(props.image);
    }
    return { remove, enlarge };
  }
});
</script>

<style scoped>
.v-img {
  -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, #0006);
}

.v-btn {
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: transparent;
}
</style>
