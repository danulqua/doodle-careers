import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS';
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES';
export const UPDATE_SELECTED_ORGANIZATIONS = 'UPDATE_SELECTED_ORGANIZATIONS';
export const UPDATE_SELECTED_JOB_TYPES = 'UPDATE_SELECTED_JOB_TYPES';
export const FILTERED_JOBS = 'FILTERED_JOBS';

export const SHOULD_INCLUDE_JOB_BY_ORGANIZATION =
  'SHOULD_INCLUDE_JOB_BY_ORGANIZATION';
export const SHOULD_INCLUDE_JOB_BY_JOB_TYPE = 'SHOULD_INCLUDE_JOB_BY_JOB_TYPE';

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
      this.selectedJobTypes = types;
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
    [SHOULD_INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job) => {
      const noSelectedOrganizations = !state.selectedOrganizations.length;
      if (noSelectedOrganizations) return true;
      return state.selectedOrganizations.includes(job.organization);
    },
    [SHOULD_INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job) => {
      const noSelectedJobTypes = !state.selectedJobTypes.length;
      if (noSelectedJobTypes) return true;
      return state.selectedJobTypes.includes(job.jobType);
    },
    [FILTERED_JOBS](state) {
      return state.jobs
        .filter(this.SHOULD_INCLUDE_JOB_BY_ORGANIZATION)
        .filter(this.SHOULD_INCLUDE_JOB_BY_JOB_TYPE);
    },
  },
});
