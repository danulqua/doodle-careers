<template>
  <CollapsibleAccordion title="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li
            v-for="organization in UNIQUE_ORGANIZATIONS"
            :key="organization"
            class="flex min-h-[32px] w-1/2 items-baseline space-x-2"
          >
            <input
              type="checkbox"
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              class="cursor-pointer"
              @change="selectOrganization"
            />
            <label :for="organization" class="h-full cursor-pointer pr-4">
              {{ organization }}
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
  UNIQUE_ORGANIZATIONS,
  UPDATE_SELECTED_ORGANIZATIONS,
} from '@/stores/jobs';

import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';

export default {
  name: 'JobFiltersSidebarOrganizations',
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedOrganizations: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
  },
  methods: {
    ...mapActions(useJobsStore, [UPDATE_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.UPDATE_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
      this.$router.push({ name: 'JobsResults' });
    },
  },
};
</script>
