<template>
  <div class="flex w-full flex-row flex-nowrap">
    <JobFiltersSidebar />
    <JobListings />
  </div>
</template>

<script>
import JobFiltersSidebar from '@/components/job-results/job-filters-sidebar/JobFiltersSidebar.vue';
import JobListings from '@/components/job-results/JobListings.vue';

export default {
  name: 'JobsResultsPage',
  components: { JobFiltersSidebar, JobListings },
};
</script>
