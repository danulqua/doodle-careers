import type { Mock } from 'vitest';
import { render } from '@testing-library/vue';
import { useRoute } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

import { useJobsStore } from '@/stores/jobs';

import JobFiltersSidebar from '@/components/job-results/job-filters-sidebar/JobFiltersSidebar.vue';

vi.mock('vue-router');
const useRouteMock = useRoute as Mock;

describe('JobFiltersSidebar', () => {
  const renderJobFiltersSidebar = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(JobFiltersSidebar, {
      global: {
        plugins: [pinia],
        stubs: {
          FaIcon: true,
        },
      },
    });

    return { jobsStore };
  };

  describe('if query string contains role value', () => {
    it('sets skills search term', () => {
      useRouteMock.mockReturnValue({ query: { role: 'vue' } });

      const { jobsStore } = renderJobFiltersSidebar();
      expect(jobsStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('vue');
    });
  });
});
