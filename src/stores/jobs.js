import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS';
export const UPDATE_SELECTED_ORGANIZATIONS = 'UPDATE_SELECTED_ORGANIZATIONS';

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    selectedOrganizations: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs();
    },
    [UPDATE_SELECTED_ORGANIZATIONS](organizations) {
      this.selectedOrganizations = organizations;
    },
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set();
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
      return uniqueOrganizations;
    },
  },
});
