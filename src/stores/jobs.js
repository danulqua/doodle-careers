import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS';
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES';
export const UPDATE_SELECTED_ORGANIZATIONS = 'UPDATE_SELECTED_ORGANIZATIONS';
export const UPDATE_SELECTED_JOB_TYPES = 'UPDATE_SELECTED_JOB_TYPES';
export const FILTERED_JOBS_BY_ORGANIZATIONS = 'FILTERED_JOBS_BY_ORGANIZATIONS';
export const FILTERED_JOBS_BY_JOB_TYPES = 'FILTERED_JOBS_BY_JOB_TYPES';

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    selectedOrganizations: [],
    selectedJobTypes: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs();
    },
    [UPDATE_SELECTED_ORGANIZATIONS](organizations) {
      this.selectedOrganizations = organizations;
    },
    [UPDATE_SELECTED_JOB_TYPES](types) {
      this.selectedTypes = types;
    },
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set();
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
      return uniqueOrganizations;
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set();
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
      return uniqueJobTypes;
    },
    [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
      if (!this.selectedOrganizations.length) return state.jobs;

      return state.jobs.filter((job) =>
        this.selectedOrganizations.includes(job.organization)
      );
    },
    [FILTERED_JOBS_BY_JOB_TYPES](state) {
      if (!this.selectedJobTypes.length) return state.jobs;

      return state.jobs.filter((job) =>
        this.selectedJobTypes.includes(job.jobType)
      );
    },
  },
});
