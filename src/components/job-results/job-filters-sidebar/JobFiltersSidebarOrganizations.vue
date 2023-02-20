<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="UNIQUE_ORGANIZATIONS"
    :action="jobsStore.UPDATE_SELECTED_ORGANIZATIONS"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue';

import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
</script>
