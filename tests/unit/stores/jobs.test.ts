import type { Mock } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';

import { useJobsStore } from '@/stores/jobs';
import { createJob } from 'tests/utils/createJob';
import { createDegree } from 'tests/utils/createDegree';
import { useDegreesStore } from '@/stores/degrees';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('stores job listings', () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });

  it('stores selected organizations', () => {
    const store = useJobsStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it('stores selected types', () => {
    const store = useJobsStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it('stores selected degrees', () => {
    const store = useJobsStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it('stores search term for skills and qualifications', () => {
    const store = useJobsStore();
    expect(store.skillsSearchTerm).toBe('');
  });

  it('stores search term for locations', () => {
    const store = useJobsStore();
    expect(store.locationsSearchTerm).toBe('');
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('FETCH_JOBS', () => {
    it('makes API request and stores received jobs', async () => {
      axiosGetMock.mockResolvedValue({ data: ['job 1', 'job 2'] });

      const store = useJobsStore();
      await store.FETCH_JOBS();

      expect(store.jobs).toEqual(['job 1', 'job 2']);
    });
  });

  describe('UPDATE_SELECTED_ORGANIZATIONS', () => {
    it('updates selected organizations with a new set of organizations chosen by user', () => {
      const store = useJobsStore();
      store.UPDATE_SELECTED_ORGANIZATIONS(['Org1', 'Org2']);
      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2']);
    });
  });

  describe('UPDATE_SELECTED_JOB_TYPES', () => {
    it('updates selected job types with a new set of job types chosen by user', () => {
      const store = useJobsStore();
      store.UPDATE_SELECTED_JOB_TYPES(['Full-time', 'Part-time']);
      expect(store.selectedJobTypes).toEqual(['Full-time', 'Part-time']);
    });
  });

  describe('UPDATE_SELECTED_DEGREES', () => {
    it('updates selected job types with a new set of job types chosen by user', () => {
      const store = useJobsStore();
      store.UPDATE_SELECTED_DEGREES(['Bachelor', 'Master']);
      expect(store.selectedDegrees).toEqual(['Bachelor', 'Master']);
    });
  });

  describe('UPDATE_SKILLS_SEARCH_TERM', () => {
    it('receives search term for skills user has entered', () => {
      const store = useJobsStore();
      store.skillsSearchTerm = '';
      store.UPDATE_SKILLS_SEARCH_TERM('Vue');
      expect(store.skillsSearchTerm).toBe('Vue');
    });
  });

  describe('UPDATE_LOCATIONS_SEARCH_TERM', () => {
    it('receives search term for locations user has entered', () => {
      const store = useJobsStore();
      store.locationsSearchTerm = '';
      store.UPDATE_LOCATIONS_SEARCH_TERM('Kyiv');
      expect(store.locationsSearchTerm).toBe('Kyiv');
    });
  });

  describe('CLEAR_JOB_FILTERS_SELECTION', () => {
    it('removes all job filters that user has chosen', () => {
      const store = useJobsStore();

      store.selectedOrganizations = ['Doodle'];
      store.selectedJobTypes = ['Random job type'];
      store.selectedDegrees = ['Bachelor'];
      store.skillsSearchTerm = 'Vue';
      store.locationsSearchTerm = 'Kyiv';

      store.CLEAR_JOB_FILTERS_SELECTION();

      expect(store.selectedOrganizations).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedDegrees).toEqual([]);
      expect(store.skillsSearchTerm).toBe('');
      expect(store.locationsSearchTerm).toBe('');
    });
  });
});

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('returns unique set of organizations', () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ organization: 'Doodle' }),
        createJob({ organization: 'Megasoft' }),
        createJob({ organization: 'Doodle' }),
      ];

      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(['Doodle', 'Megasoft']));
    });
  });

  describe('UNIQUE_JOB_TYPES', () => {
    it('returns unique set of job types', () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Part-time' }),
        createJob({ jobType: 'Full-time' }),
      ];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(['Full-time', 'Part-time']));
    });
  });

  describe('SHOULD_INCLUDE_JOB_BY_ORGANIZATION', () => {
    describe('when user has not selected any organization', () => {
      it('includes job', () => {
        const store = useJobsStore();
        store.jobs = [
          createJob({ organization: 'Doodle' }),
          createJob({ organization: 'Megasoft' }),
          createJob({ organization: 'Woohoo' }),
        ];

        store.selectedOrganizations = [];
        const result = store.SHOULD_INCLUDE_JOB_BY_ORGANIZATION(
          createJob({
            organization: 'Doodle',
          })
        );
        expect(result).toBe(true);
      });
    });

    describe('when user has selected organization', () => {
      it('returns the associated job', () => {
        const store = useJobsStore();
        store.jobs = [
          createJob({ organization: 'Doodle' }),
          createJob({ organization: 'Megasoft' }),
          createJob({ organization: 'Woohoo' }),
        ];

        store.selectedOrganizations = ['Doodle', 'Woohoo'];
        const result = store.SHOULD_INCLUDE_JOB_BY_ORGANIZATION(
          createJob({
            organization: 'Doodle',
          })
        );
        expect(result).toBe(true);
      });
    });

    it('does not return the job that is not associated', () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ organization: 'Doodle' }),
        createJob({ organization: 'Megasoft' }),
        createJob({ organization: 'Woohoo' }),
      ];

      store.selectedOrganizations = ['Doodle', 'Woohoo'];
      const result = store.SHOULD_INCLUDE_JOB_BY_ORGANIZATION(
        createJob({
          organization: 'Megasoft',
        })
      );
      expect(result).toBe(false);
    });
  });

  describe('SHOULD_INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when user has not selected any job type', () => {
      it('includes job', () => {
        const store = useJobsStore();
        store.jobs = [
          createJob({ jobType: 'Full-time' }),
          createJob({ jobType: 'Part-time' }),
          createJob({ jobType: 'Temporary' }),
        ];

        store.selectedJobTypes = [];
        const result = store.SHOULD_INCLUDE_JOB_BY_JOB_TYPE(
          createJob({
            jobType: 'Full-time',
          })
        );
        expect(result).toBe(true);
      });
    });

    describe('when user has selected job type', () => {
      it('returns the associated job', () => {
        const store = useJobsStore();
        store.jobs = [
          createJob({ jobType: 'Full-time' }),
          createJob({ jobType: 'Part-time' }),
          createJob({ jobType: 'Temporary' }),
        ];

        store.selectedJobTypes = ['Full-time', 'Temporary'];
        const result = store.SHOULD_INCLUDE_JOB_BY_JOB_TYPE(
          createJob({
            jobType: 'Full-time',
          })
        );
        expect(result).toBe(true);
      });
    });

    it('does not return the job that is not associated', () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Part-time' }),
        createJob({ jobType: 'Temporary' }),
      ];

      store.selectedJobTypes = ['Full-time', 'Temporary'];
      const result = store.SHOULD_INCLUDE_JOB_BY_JOB_TYPE(
        createJob({
          jobType: 'Part-time',
        })
      );
      expect(result).toBe(false);
    });
  });

  describe('SHOULD_INCLUDE_JOB_BY_DEGREE', () => {
    describe('when user has not selected any degree', () => {
      it('includes job', () => {
        const jobsStore = useJobsStore();
        const degreesStore = useDegreesStore();

        degreesStore.degrees = [
          createDegree({ degree: 'Bachelor' }),
          createDegree({ degree: 'Master' }),
          createDegree({ degree: 'Professor' }),
        ];

        jobsStore.selectedDegrees = [];
        const result = jobsStore.SHOULD_INCLUDE_JOB_BY_DEGREE(
          createJob({
            degree: 'Bachelor',
          })
        );
        expect(result).toBe(true);
      });
    });

    describe('when user has selected degree, required for the job', () => {
      it('returns the associated job', () => {
        const jobsStore = useJobsStore();
        const degreesStore = useDegreesStore();

        degreesStore.degrees = [
          createDegree({ degree: 'Bachelor' }),
          createDegree({ degree: 'Master' }),
          createDegree({ degree: 'Professor' }),
        ];

        jobsStore.selectedDegrees = ['Bachelor', 'Professor'];
        const result = jobsStore.SHOULD_INCLUDE_JOB_BY_DEGREE(
          createJob({
            degree: 'Bachelor',
          })
        );
        expect(result).toBe(true);
      });
    });

    it('does not return the job that is not associated', () => {
      const jobsStore = useJobsStore();
      const degreesStore = useDegreesStore();

      degreesStore.degrees = [
        createDegree({ degree: 'Bachelor' }),
        createDegree({ degree: 'Master' }),
        createDegree({ degree: 'Professor' }),
      ];

      jobsStore.selectedDegrees = ['Bachelor', 'Professor'];
      const result = jobsStore.SHOULD_INCLUDE_JOB_BY_DEGREE(
        createJob({
          degree: 'Master',
        })
      );
      expect(result).toBe(false);
    });
  });

  describe('SHOULD_INCLUDE_JOB_BY_SKILL', () => {
    it("identifies if job matches user's skill", () => {
      const store = useJobsStore();
      store.skillsSearchTerm = 'Vue';
      const job = createJob({ title: 'Vue Developer' });

      const result = store.SHOULD_INCLUDE_JOB_BY_SKILL(job);

      expect(result).toBe(true);
    });

    it('handles inconsistent character casing', () => {
      const store = useJobsStore();
      store.skillsSearchTerm = 'vUE';
      const job = createJob({ title: 'Vue Developer' });

      const result = store.SHOULD_INCLUDE_JOB_BY_SKILL(job);

      expect(result).toBe(true);
    });

    describe('when the user has not entered any skill', () => {
      it('includes job', () => {
        const store = useJobsStore();
        store.skillsSearchTerm = '';
        const job = createJob({ title: 'Vue Developer' });

        const result = store.SHOULD_INCLUDE_JOB_BY_SKILL(job);

        expect(result).toBe(true);
      });
    });
  });

  describe('SHOULD_INCLUDE_JOB_BY_LOCATION', () => {
    it("identifies if job matches user's location", () => {
      const store = useJobsStore();
      store.locationsSearchTerm = 'Kyiv';
      const job = createJob({ locations: ['Lviv', 'Kyiv'] });

      const result = store.SHOULD_INCLUDE_JOB_BY_LOCATION(job);

      expect(result).toBe(true);
    });

    it('handles inconsistent character casing', () => {
      const store = useJobsStore();
      store.locationsSearchTerm = 'kYiV';
      const job = createJob({ locations: ['Lviv', 'Kyiv'] });

      const result = store.SHOULD_INCLUDE_JOB_BY_LOCATION(job);

      expect(result).toBe(true);
    });

    describe('when the user has not entered any location', () => {
      it('includes job', () => {
        const store = useJobsStore();
        store.locationsSearchTerm = '';
        const job = createJob({ locations: ['Lviv', 'Kyiv'] });

        const result = store.SHOULD_INCLUDE_JOB_BY_LOCATION(job);

        expect(result).toBe(true);
      });
    });
  });
});
