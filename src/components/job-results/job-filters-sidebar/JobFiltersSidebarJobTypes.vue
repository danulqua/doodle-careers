<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="UNIQUE_JOB_TYPES"
    :action="jobsStore.UPDATE_SELECTED_JOB_TYPES"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue';

import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
</script>
