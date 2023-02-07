<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in jobs" :key="job.id" :job="job" />
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
};
</script>
