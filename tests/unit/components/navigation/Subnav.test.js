import { render, screen } from '@testing-library/vue';

import Subnav from '@/components/navigation/Subnav.vue';

describe('Subnav', () => {
  describe('when user is on the jobs page', () => {
    it('renders the job search results', () => {
      const $route = {
        name: 'JobsResults',
      };

      render(Subnav, {
        global: {
          mocks: {
            $route,
          },
          stubs: {
            FaIcon: true,
          },
        },
      });

      const jobsCounts = screen.getByText('2758');
      expect(jobsCounts).toBeInTheDocument();
    });
  });

  describe('when user is NOT on the jobs page', () => {
    it('does not render the job search results', () => {
      const $route = {
        name: 'Home',
      };

      render(Subnav, {
        global: {
          mocks: {
            $route,
          },
          stubs: {
            FaIcon: true,
          },
        },
        data() {
          return {
            onJobsPage: false,
          };
        },
      });

      const jobsCounts = screen.queryByText('2758');
      expect(jobsCounts).not.toBeInTheDocument();
    });
  });
});
