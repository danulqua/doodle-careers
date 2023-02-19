<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import getSpotlights from '@/api/getSpotlights';

import type { Spotlight } from '@/api/types';

const spotlights = ref<Spotlight[]>([]);

onMounted(() => {
  getSpotlights().then((data) => (spotlights.value = data));
});
</script>
