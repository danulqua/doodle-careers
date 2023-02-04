import { render, screen } from '@testing-library/vue';

import Subnav from '@/components/Subnav.vue';

describe('Subnav', () => {
  describe('when user is on the jobs page', () => {
    it('renders the job search results', () => {
      render(Subnav, {
        global: {
          stubs: {
            FaIcon: true,
          },
        },
        data() {
          return {
            onJobsPage: true,
          };
        },
      });

      const jobsCounts = screen.getByText('2758');
      expect(jobsCounts).toBeInTheDocument();
    });
  });

  describe('when user is NOT on the jobs page', () => {
    it('does not render the job search results', () => {
      render(Subnav, {
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
