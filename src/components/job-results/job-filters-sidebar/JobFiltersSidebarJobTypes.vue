<template>
  <CollapsibleAccordion title="Job types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li
            v-for="jobType in UNIQUE_JOB_TYPES"
            :key="jobType"
            class="flex min-h-[32px] w-1/2 items-baseline space-x-2"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              type="checkbox"
              :value="jobType"
              class="cursor-pointer"
              @change="selectJobType"
            />
            <label :for="jobType" class="h-full cursor-pointer pr-4">
              {{ jobType }}
            </label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';

import { useJobsStore } from '@/stores/jobs';

const selectedJobTypes = ref([]);

const router = useRouter();
const jobsStore = useJobsStore();
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);

function selectJobType() {
  jobsStore.UPDATE_SELECTED_JOB_TYPES(selectedJobTypes.value);
  router.push({ name: 'JobsResults' });
}
</script>
