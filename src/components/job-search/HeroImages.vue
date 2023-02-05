<template>
  <div class="relative h-96 w-96">
    <img
      v-for="(img, idx) in images"
      :key="img"
      :src="img"
      alt="Build hero image"
      class="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300"
      :class="{ active: activeIndex === idx }"
    />
  </div>
</template>

<script>
import buildImg from '@/assets/images/hero-build.png';
import createImg from '@/assets/images/hero-create.png';
import designImg from '@/assets/images/hero-design.png';
import codeImg from '@/assets/images/hero-code.png';

export default {
  name: 'HeroImages',
  props: {
    activeIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      images: [buildImg, createImg, designImg, codeImg],
      interval: null,
    };
  },
};
</script>

<style>
.active {
  @apply opacity-100;
}
</style>
