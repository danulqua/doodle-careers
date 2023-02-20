<template>
  <div class="flex justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <ActionButton
        text="Clear filters"
        type="secondary"
        @click="jobsStore.CLEAR_JOB_FILTERS_SELECTION"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/common/ActionButton.vue';
import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();
</script>
