import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';

import { useJobsStore } from '@/stores/jobs';

vi.mock('axios');

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
      axios.get.mockResolvedValue({ data: ['job 1', 'job 2'] });

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

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('returns unique set of organizations', () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: 'Doodle' },
        { organization: 'Megasoft' },
        { organization: 'Doodle' },
      ];

      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(['Doodle', 'Megasoft']));
    });
  });

  describe('UNIQUE_JOB_TYPES', () => {
    it('returns unique set of job types', () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: 'Full-time' },
        { jobType: 'Part-time' },
        { jobType: 'Full-time' },
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
          { organization: 'Doodle' },
          { organization: 'Megasoft' },
          { organization: 'Woohoo' },
        ];

        store.selectedOrganizations = [];
        const result = store.SHOULD_INCLUDE_JOB_BY_ORGANIZATION({
          organization: 'Doodle',
        });
        expect(result).toBe(true);
      });
    });

    describe('when user has selected organization', () => {
      it('returns the associated job', () => {
        const store = useJobsStore();
        store.jobs = [
          { organization: 'Doodle' },
          { organization: 'Megasoft' },
          { organization: 'Woohoo' },
        ];

        store.selectedOrganizations = ['Doodle', 'Woohoo'];
        const result = store.SHOULD_INCLUDE_JOB_BY_ORGANIZATION({
          organization: 'Doodle',
        });
        expect(result).toBe(true);
      });
    });

    it('does not return the job that is not associated', () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: 'Doodle' },
        { organization: 'Megasoft' },
        { organization: 'Woohoo' },
      ];

      store.selectedOrganizations = ['Doodle', 'Woohoo'];
      const result = store.SHOULD_INCLUDE_JOB_BY_ORGANIZATION({
        organization: 'Megasoft',
      });
      expect(result).toBe(false);
    });
  });

  describe('SHOULD_INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when user has not selected any job type', () => {
      it('includes job', () => {
        const store = useJobsStore();
        store.jobs = [
          { jobType: 'Full-time' },
          { jobType: 'Part-time' },
          { jobType: 'Temporary' },
        ];

        store.selectedJobTypes = [];
        const result = store.SHOULD_INCLUDE_JOB_BY_JOB_TYPE({
          jobType: 'Full-time',
        });
        expect(result).toBe(true);
      });
    });

    describe('when user has selected job type', () => {
      it('returns the associated job', () => {
        const store = useJobsStore();
        store.jobs = [
          { jobType: 'Full-time' },
          { jobType: 'Part-time' },
          { jobType: 'Temporary' },
        ];

        store.selectedJobTypes = ['Full-time', 'Temporary'];
        const result = store.SHOULD_INCLUDE_JOB_BY_JOB_TYPE({
          jobType: 'Full-time',
        });
        expect(result).toBe(true);
      });
    });

    it('does not return the job that is not associated', () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: 'Full-time' },
        { jobType: 'Part-time' },
        { jobType: 'Temporary' },
      ];

      store.selectedJobTypes = ['Full-time', 'Temporary'];
      const result = store.SHOULD_INCLUDE_JOB_BY_JOB_TYPE({
        jobType: 'Part-time',
      });
      expect(result).toBe(false);
    });
  });
});
