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

<script setup lang="ts">
import buildImg from '@/assets/images/hero-build.png';
import createImg from '@/assets/images/hero-create.png';
import designImg from '@/assets/images/hero-design.png';
import codeImg from '@/assets/images/hero-code.png';

defineProps({
  activeIndex: {
    type: Number,
    required: true,
  },
});

const images = [buildImg, createImg, designImg, codeImg];
</script>

<style>
.active {
  @apply opacity-100;
}
</style>
