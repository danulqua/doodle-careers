<template>
  <div class="mt-2 mb-4">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Computer programming, Finance degree"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();

const skillsSearchTerm = computed({
  get: () => jobsStore.skillsSearchTerm,
  set: (value: string) => jobsStore.UPDATE_SKILLS_SEARCH_TERM(value),
});
</script>
