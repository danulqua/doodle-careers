<template>
  <div class="flex w-96 flex-col border-r border-brand-gray-1 bg-white p-4">
    <section>
      <JobFiltersSidebarPrompt />
    </section>

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
import JobFiltersSidebarPrompt from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarPrompt.vue';
import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';
import JobFiltersSidebarDegrees from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarDegrees.vue';
import JobFiltersSidebarJobTypes from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarOrganizations from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations.vue';
</script>
