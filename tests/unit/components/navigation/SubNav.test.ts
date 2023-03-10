import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { useRoute } from 'vue-router';

import SubNav from '@/components/navigation/SubNav.vue';
import { useJobsStore } from '@/stores/jobs';

vi.mock('vue-router');
const useRouteMock = useRoute as Mock;

describe('Subnav', () => {
  function renderSubnav() {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FaIcon: true,
        },
      },
    });

    return { jobsStore };
  }

  describe('when user is on the jobs page', () => {
    it('renders the job search results', async () => {
      useRouteMock.mockReturnValue({ name: 'JobsResults' });
      const { jobsStore } = renderSubnav();

      const jobsCount = 21;
      // @ts-expect-error: getter is readonly
      jobsStore.FILTERED_JOBS = Array(jobsCount).fill({});

      const value = await screen.findByText(jobsCount);
      expect(value).toBeInTheDocument();
    });
  });

  describe('when user is NOT on the jobs page', () => {
    it('does not render the job search results', async () => {
      useRouteMock.mockReturnValue({ name: 'Home' });
      const { jobsStore } = renderSubnav();

      const jobsCount = 21;
      // @ts-expect-error: getter is readonly
      jobsStore.FILTERED_JOBS = Array(jobsCount).fill({});

      const value = screen.queryByText(jobsCount);
      expect(value).not.toBeInTheDocument();
    });
  });
});
