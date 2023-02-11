import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';

import SubNav from '@/components/navigation/SubNav.vue';
import { useJobsStore } from '@/stores/jobs';

describe('Subnav', () => {
  function renderSubnav(routeName) {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    const $route = {
      name: routeName,
    };

    render(SubNav, {
      global: {
        plugins: [pinia],
        mocks: { $route },
        stubs: {
          FaIcon: true,
        },
      },
    });

    return { jobsStore };
  }

  describe('when user is on the jobs page', () => {
    it('renders the job search results', async () => {
      const { jobsStore } = renderSubnav('JobsResults');

      const jobsCount = 21;
      jobsStore.FILTERED_JOBS = Array(jobsCount).fill({});

      const value = await screen.findByText(jobsCount);
      expect(value).toBeInTheDocument();
    });
  });

  describe('when user is NOT on the jobs page', () => {
    it('does not render the job search results', async () => {
      const { jobsStore } = renderSubnav('Home');

      const jobsCount = 21;
      jobsStore.FILTERED_JOBS = Array(jobsCount).fill({});

      const value = screen.queryByText(jobsCount);
      expect(value).not.toBeInTheDocument();
    });
  });
});
