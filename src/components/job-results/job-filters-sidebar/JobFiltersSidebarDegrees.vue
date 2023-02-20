<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="UNIQUE_DEGREES"
    :action="jobsStore.UPDATE_SELECTED_DEGREES"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue';

import { useJobsStore } from '@/stores/jobs';
import { useDegreesStore } from '@/stores/degrees';

const degreesStore = useDegreesStore();
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);

const jobsStore = useJobsStore();
</script>
