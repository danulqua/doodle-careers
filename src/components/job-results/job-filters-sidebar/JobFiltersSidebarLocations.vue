<template>
  <div class="relative mt-2">
    <fa-icon
      :icon="['fas', 'location-dot']"
      class="absolute top-1/2 left-3 -translate-y-1/2 text-brand-gray-3"
    ></fa-icon>

    <input
      v-model.lazy.trim="locationsSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-brand-gray-1 p-3 pl-8 text-base shadow-gray"
      placeholder="San Francisco, London, Michigan"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();

const locationsSearchTerm = computed({
  get: () => jobsStore.locationsSearchTerm,
  set: (value: string) => jobsStore.UPDATE_LOCATIONS_SEARCH_TERM(value),
});
</script>
