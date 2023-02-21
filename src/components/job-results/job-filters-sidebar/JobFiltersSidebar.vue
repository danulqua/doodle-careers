<template>
  <div class="flex w-96 flex-col border-r border-brand-gray-1 bg-white p-4">
    <section>
      <JobFiltersSidebarPrompt />
    </section>

    <JobFiltersSidebarSkills />

    <CollapsibleAccordion title="Locations">
      <JobFiltersSidebarLocations />
    </CollapsibleAccordion>

    <CollapsibleAccordion title="Degrees">
      <JobFiltersSidebarDegrees />
    </CollapsibleAccordion>

    <CollapsibleAccordion title="Job types">
      <JobFiltersSidebarJobTypes />
    </CollapsibleAccordion>

    <CollapsibleAccordion title="Organizations">
      <JobFiltersSidebarOrganizations />
    </CollapsibleAccordion>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import JobFiltersSidebarPrompt from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarPrompt.vue';
import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';
import JobFiltersSidebarDegrees from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarDegrees.vue';
import JobFiltersSidebarJobTypes from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarOrganizations from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarSkills from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarSkills.vue';
import JobFiltersSidebarLocations from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarLocations.vue';

import { useJobsStore } from '@/stores/jobs';

const route = useRoute();
const jobsStore = useJobsStore();

const parseQueryParams = () => {
  const role = (route.query.role as string) || '';
  const location = (route.query.location as string) || '';
  jobsStore.UPDATE_SKILLS_SEARCH_TERM(role);
  jobsStore.UPDATE_LOCATIONS_SEARCH_TERM(location);
};

onMounted(parseQueryParams);
</script>
