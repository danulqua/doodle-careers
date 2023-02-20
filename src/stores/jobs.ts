import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';
import type { Degree, Job } from '@/api/types';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS';
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES';
export const UPDATE_SELECTED_ORGANIZATIONS = 'UPDATE_SELECTED_ORGANIZATIONS';
export const UPDATE_SELECTED_JOB_TYPES = 'UPDATE_SELECTED_JOB_TYPES';
export const UPDATE_SELECTED_DEGREES = 'UPDATE_SELECTED_DEGREES';
export const CLEAR_JOB_FILTERS_SELECTION = 'CLEAR_JOB_FILTERS_SELECTION';
export const FILTERED_JOBS = 'FILTERED_JOBS';

export const SHOULD_INCLUDE_JOB_BY_ORGANIZATION =
  'SHOULD_INCLUDE_JOB_BY_ORGANIZATION';
export const SHOULD_INCLUDE_JOB_BY_JOB_TYPE = 'SHOULD_INCLUDE_JOB_BY_JOB_TYPE';
export const SHOULD_INCLUDE_JOB_BY_DEGREE = 'SHOULD_INCLUDE_JOB_BY_DEGREE';

export interface JobsState {
  jobs: Job[];
  selectedOrganizations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
}

export const useJobsStore = defineStore('jobs', {
  state: (): JobsState => ({
    jobs: [],
    selectedOrganizations: [],
    selectedJobTypes: [],
    selectedDegrees: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs();
    },
    [UPDATE_SELECTED_ORGANIZATIONS](organizations: string[]) {
      this.selectedOrganizations = organizations;
    },
    [UPDATE_SELECTED_JOB_TYPES](types: string[]) {
      this.selectedJobTypes = types;
    },
    [UPDATE_SELECTED_DEGREES](degrees: string[]) {
      this.selectedDegrees = degrees;
    },
    [CLEAR_JOB_FILTERS_SELECTION]() {
      this.selectedOrganizations = [];
      this.selectedJobTypes = [];
      this.selectedDegrees = [];
    },
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set<string>();
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
      return uniqueOrganizations;
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set<string>();
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
      return uniqueJobTypes;
    },
    [SHOULD_INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job: Job) => {
      const noSelectedOrganizations = !state.selectedOrganizations.length;
      if (noSelectedOrganizations) return true;
      return state.selectedOrganizations.includes(job.organization);
    },
    [SHOULD_INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job: Job) => {
      const noSelectedJobTypes = !state.selectedJobTypes.length;
      if (noSelectedJobTypes) return true;
      return state.selectedJobTypes.includes(job.jobType);
    },
    [SHOULD_INCLUDE_JOB_BY_DEGREE]: (state) => (job: Degree) => {
      const noSelectedJobDegrees = !state.selectedDegrees.length;
      if (noSelectedJobDegrees) return true;
      return state.selectedDegrees.includes(job.degree);
    },
    [FILTERED_JOBS](state): Job[] {
      return state.jobs
        .filter(this.SHOULD_INCLUDE_JOB_BY_ORGANIZATION)
        .filter(this.SHOULD_INCLUDE_JOB_BY_JOB_TYPE)
        .filter(this.SHOULD_INCLUDE_JOB_BY_DEGREE);
    },
  },
});
