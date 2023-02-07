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
import axios from 'axios';
import JobListing from '@/components/job-results/JobListing.vue';

export default {
  name: 'JobListings',
  components: { JobListing },
  data() {
    return {
      jobs: [],
    };
  },
  mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    axios.get(`${baseUrl}/jobs`).then((res) => {
      this.jobs = res.data;
    });
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page) || 1;
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      return previousPage >= 1 ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.jobs.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedJobsList() {
      const page = this.currentPage;
      const firstIdx = (page - 1) * 10;
      const secondIdx = page * 10;

      return this.jobs.slice(firstIdx, secondIdx);
    },
  },
};
</script>
