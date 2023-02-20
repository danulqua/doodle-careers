import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';
import type { Degree, Job } from '@/api/types';

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([]);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);

  const FETCH_JOBS = async () => {
    jobs.value = await getJobs();
  };

  const UPDATE_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations;
  };

  const UPDATE_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes;
  };

  const UPDATE_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees;
  };

  const CLEAR_JOB_FILTERS_SELECTION = () => {
    selectedOrganizations.value = [];
    selectedJobTypes.value = [];
    selectedDegrees.value = [];
  };

  const UNIQUE_ORGANIZATIONS = computed(() => {
    const uniqueOrganizations = new Set<string>();
    jobs.value.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  });

  const UNIQUE_JOB_TYPES = computed(() => {
    const uniqueJobTypes = new Set<string>();
    jobs.value.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  });

  const SHOULD_INCLUDE_JOB_BY_ORGANIZATION = computed(() => (job: Job) => {
    const noSelectedOrganizations = !selectedOrganizations.value.length;
    if (noSelectedOrganizations) return true;
    return selectedOrganizations.value.includes(job.organization);
  });

  const SHOULD_INCLUDE_JOB_BY_JOB_TYPE = computed(() => (job: Job) => {
    const noSelectedJobTypes = !selectedJobTypes.value.length;
    if (noSelectedJobTypes) return true;
    return selectedJobTypes.value.includes(job.jobType);
  });

  const SHOULD_INCLUDE_JOB_BY_DEGREE = computed(() => (degree: Degree) => {
    const noSelectedDegrees = !selectedDegrees.value.length;
    if (noSelectedDegrees) return true;
    return selectedDegrees.value.includes(degree.degree);
  });

  const FILTERED_JOBS = computed(() =>
    jobs.value
      .filter(SHOULD_INCLUDE_JOB_BY_ORGANIZATION.value)
      .filter(SHOULD_INCLUDE_JOB_BY_JOB_TYPE.value)
      .filter(SHOULD_INCLUDE_JOB_BY_DEGREE.value)
  );

  return {
    jobs,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    FETCH_JOBS,
    UPDATE_SELECTED_ORGANIZATIONS,
    UPDATE_SELECTED_JOB_TYPES,
    UPDATE_SELECTED_DEGREES,
    CLEAR_JOB_FILTERS_SELECTION,
    UNIQUE_ORGANIZATIONS,
    UNIQUE_JOB_TYPES,
    SHOULD_INCLUDE_JOB_BY_ORGANIZATION,
    SHOULD_INCLUDE_JOB_BY_JOB_TYPE,
    SHOULD_INCLUDE_JOB_BY_DEGREE,
    FILTERED_JOBS,
  };
});
