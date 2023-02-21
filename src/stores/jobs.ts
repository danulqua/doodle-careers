import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';
import type { Job } from '@/api/types';

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([]);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);
  const skillsSearchTerm = ref('');
  const locationsSearchTerm = ref('');

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

  const UPDATE_SKILLS_SEARCH_TERM = (term: string) => {
    skillsSearchTerm.value = term;
  };

  const UPDATE_LOCATIONS_SEARCH_TERM = (term: string) => {
    locationsSearchTerm.value = term;
  };

  const CLEAR_JOB_FILTERS_SELECTION = () => {
    selectedOrganizations.value = [];
    selectedJobTypes.value = [];
    selectedDegrees.value = [];
    skillsSearchTerm.value = '';
    locationsSearchTerm.value = '';
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

  const SHOULD_INCLUDE_JOB_BY_DEGREE = computed(() => (job: Job) => {
    const noSelectedDegrees = !selectedDegrees.value.length;
    if (noSelectedDegrees) return true;
    return selectedDegrees.value.includes(job.degree);
  });

  const SHOULD_INCLUDE_JOB_BY_SKILL = computed(() => (job: Job) => {
    return job.title
      .toLowerCase()
      .includes(skillsSearchTerm.value.toLowerCase());
  });

  const SHOULD_INCLUDE_JOB_BY_LOCATION = computed(() => (job: Job) => {
    return job.locations.some((location) =>
      location.toLowerCase().includes(locationsSearchTerm.value.toLowerCase())
    );
  });

  const FILTERED_JOBS = computed(() =>
    jobs.value
      .filter(SHOULD_INCLUDE_JOB_BY_ORGANIZATION.value)
      .filter(SHOULD_INCLUDE_JOB_BY_JOB_TYPE.value)
      .filter(SHOULD_INCLUDE_JOB_BY_DEGREE.value)
      .filter(SHOULD_INCLUDE_JOB_BY_SKILL.value)
  );

  return {
    jobs,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    skillsSearchTerm,
    locationsSearchTerm,
    FETCH_JOBS,
    UPDATE_SELECTED_ORGANIZATIONS,
    UPDATE_SELECTED_JOB_TYPES,
    UPDATE_SELECTED_DEGREES,
    UPDATE_SKILLS_SEARCH_TERM,
    UPDATE_LOCATIONS_SEARCH_TERM,
    CLEAR_JOB_FILTERS_SELECTION,
    UNIQUE_ORGANIZATIONS,
    UNIQUE_JOB_TYPES,
    SHOULD_INCLUDE_JOB_BY_ORGANIZATION,
    SHOULD_INCLUDE_JOB_BY_JOB_TYPE,
    SHOULD_INCLUDE_JOB_BY_DEGREE,
    SHOULD_INCLUDE_JOB_BY_SKILL,
    SHOULD_INCLUDE_JOB_BY_LOCATION,
    FILTERED_JOBS,
  };
});
