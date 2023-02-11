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
              :id="organization"
              v-model="selectedOrganizations"
              type="checkbox"
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

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';

import { useJobsStore } from '@/stores/jobs';

const selectedOrganizations = ref([]);

const router = useRouter();
const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);

function selectOrganization() {
  jobsStore.UPDATE_SELECTED_ORGANIZATIONS(selectedOrganizations.value);
  router.push({ name: 'JobsResults' });
}
</script>
