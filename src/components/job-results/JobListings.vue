<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobsList" :key="job.id" :job="job" />
    </ol>
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
    axios.get('http://localhost:3000/jobs').then((res) => {
      this.jobs = res.data;
    });
  },
  computed: {
    displayedJobsList() {
      const page = Number.parseInt(this.$route.query.page) || 1;
      const firstIdx = (page - 1) * 10;
      const secondIdx = page * 10;

      return this.jobs.slice(firstIdx, secondIdx);
    },
  },
};
</script>
