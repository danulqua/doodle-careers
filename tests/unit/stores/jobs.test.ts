import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';
import type { Mock } from 'vitest';

import { useJobsStore } from '@/stores/jobs';
import type { Job } from '@/api/types';

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
});

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  function createJob(job: Partial<Job> = {}): Job {
    return {
      id: 1,
      title: 'Angular Developer',
      organization: 'Vue and Me',
      degree: "Master's",
      jobType: 'Intern',
      locations: ['Lisbon'],
      minimumQualifications: ['Mesh granular deliverables'],
      preferredQualifications: ['Mesh wireless metrics'],
      description: ['Away someone forget effect wait land.'],
      dateAdded: '2021-07-04',
      ...job,
    };
  }

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
});
