import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async FETCH_JOBS() {
      this.jobs = await getJobs();
    },
  },
});
