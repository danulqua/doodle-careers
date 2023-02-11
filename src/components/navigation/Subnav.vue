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

<script>
import { mapState } from 'pinia';
import { useJobsStore, FILTERED_JOBS } from '@/stores/jobs';

export default {
  name: 'Subnav',
  computed: {
    ...mapState(useJobsStore, {
      FILTERED_JOBS,
      countLabel() {
        return this.FILTERED_JOBS.length === 1 ? 'job' : 'jobs';
      },
    }),
    onJobsResultsPage() {
      return this.$route.name === 'JobsResults';
    },
  },
};
</script>
