<template>
  <div class="flex h-16 items-center border-b border-brand-gray-1 px-8 text-sm">
    <div v-if="onJobsResultsPage">
      <fa-icon :icon="['fas', 'search']" class="mr-3" />
      <span
        ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span>
        {{ countLabel }} found</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useJobsStore } from '@/stores/jobs';

const route = useRoute();
const onJobsResultsPage = computed(() => route.name === 'JobsResults');

const jobsStore = useJobsStore();
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
const countLabel = computed(() =>
  FILTERED_JOBS.value.length === 1 ? 'job' : 'jobs'
);
</script>
