<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobsList" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobsResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobsResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import JobListing from '@/components/job-results/JobListing.vue';
import { useJobsStore } from '@/stores/jobs';

import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages';

const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const route = useRoute();
const currentPage = computed(() => Number.parseInt(route.query.page || 1));
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

const displayedJobsList = computed(() => {
  const page = currentPage.value;
  const firstIdx = (page - 1) * 10;
  const secondIdx = page * 10;
  return FILTERED_JOBS.value.slice(firstIdx, secondIdx);
});
</script>
