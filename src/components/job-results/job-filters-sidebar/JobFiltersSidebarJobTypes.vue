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
              type="checkbox"
              :id="jobType"
              v-model="selectedJobTypes"
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

<script>
import { mapState, mapActions } from 'pinia';
import {
  useJobsStore,
  UNIQUE_JOB_TYPES,
  UPDATE_SELECTED_JOB_TYPES,
} from '@/stores/jobs';

import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';

export default {
  name: 'JobFiltersSidebarJobTypes',
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_JOB_TYPES]),
  },
  methods: {
    ...mapActions(useJobsStore, [UPDATE_SELECTED_JOB_TYPES]),
    selectJobType() {
      this.UPDATE_SELECTED_JOB_TYPES(this.selectedJobTypes);
    },
  },
};
</script>
