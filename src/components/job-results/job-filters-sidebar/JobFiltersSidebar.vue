<template>
  <div class="flex w-96 flex-col border-r border-brand-gray-1 bg-white p-4">
    <section>
      <div class="flex justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filters" type="secondary" />
        </div>
      </div>
    </section>

    <JobFiltersSidebarCheckboxGroup
      title="Job types"
      :unique-values="UNIQUE_JOB_TYPES"
      :action="jobsStore.UPDATE_SELECTED_JOB_TYPES"
    />

    <JobFiltersSidebarCheckboxGroup
      title="Organizations"
      :unique-values="UNIQUE_ORGANIZATIONS"
      :action="jobsStore.UPDATE_SELECTED_ORGANIZATIONS"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

import ActionButton from '@/components/common/ActionButton.vue';
import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue';

import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
</script>
