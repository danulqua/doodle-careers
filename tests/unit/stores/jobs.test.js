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
    expect(store.selectedTypes).toEqual([]);
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
      expect(store.selectedTypes).toEqual(['Full-time', 'Part-time']);
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

  describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
    it('finds jobs which satisfy selected organizations', () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: 'Doodle' },
        { organization: 'Megasoft' },
        { organization: 'Woohoo' },
      ];

      store.selectedOrganizations = ['Doodle', 'Woohoo'];

      const result = store.FILTERED_JOBS_BY_ORGANIZATIONS;
      expect(result).toEqual([
        { organization: 'Doodle' },
        { organization: 'Woohoo' },
      ]);
    });

    describe('when user has not selected any organizations', () => {
      it('returns all jobs', () => {
        const store = useJobsStore();
        store.jobs = [
          { organization: 'Doodle' },
          { organization: 'Megasoft' },
          { organization: 'Woohoo' },
        ];

        store.selectedOrganizations = [];

        const result = store.FILTERED_JOBS_BY_ORGANIZATIONS;
        expect(result).toEqual([
          { organization: 'Doodle' },
          { organization: 'Megasoft' },
          { organization: 'Woohoo' },
        ]);
      });
    });
  });
});
