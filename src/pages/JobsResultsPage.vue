<template>
  <div class="flex w-full flex-row flex-nowrap">
    <JobFiltersSidebar />
    <JobListings />
  </div>
</template>

<script setup lang="ts">
import JobFiltersSidebar from '@/components/job-results/job-filters-sidebar/JobFiltersSidebar.vue';
import JobListings from '@/components/job-results/JobListings.vue';
</script>
