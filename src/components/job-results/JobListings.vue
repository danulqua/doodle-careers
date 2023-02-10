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

<script>
import { mapState, mapActions } from 'pinia';

import JobListing from '@/components/job-results/JobListing.vue';
import {
  useJobsStore,
  FETCH_JOBS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
} from '@/stores/jobs';

export default {
  name: 'JobListings',
  components: { JobListing },
  mounted() {
    this.FETCH_JOBS();
  },
  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS]),
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page) || 1;
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      return previousPage >= 1 ? previousPage : undefined;
    },
    ...mapState(useJobsStore, {
      FILTERED_JOBS_BY_ORGANIZATIONS,
      nextPage() {
        const nextPage = this.currentPage + 1;
        const maxPage = Math.ceil(
          this.FILTERED_JOBS_BY_ORGANIZATIONS.length / 10
        );
        return nextPage <= maxPage ? nextPage : undefined;
      },
      displayedJobsList() {
        const page = this.currentPage;
        const firstIdx = (page - 1) * 10;
        const secondIdx = page * 10;

        return this.FILTERED_JOBS_BY_ORGANIZATIONS.slice(firstIdx, secondIdx);
      },
    }),
  },
};
</script>
