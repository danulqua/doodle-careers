import { render, screen } from '@testing-library/vue';

import Subnav from '@/components/navigation/Subnav.vue';

describe('Subnav', () => {
  const renderSubnav = (routeName) => {
    const $route = {
      name: routeName,
    };

    render(Subnav, {
      global: {
        mocks: { $route },
        stubs: {
          FaIcon: true,
        },
      },
    });
  };

  describe('when user is on the jobs page', () => {
    it('renders the job search results', () => {
      renderSubnav('JobsResults');
      const jobsCounts = screen.getByText('2758');
      expect(jobsCounts).toBeInTheDocument();
    });
  });

  describe('when user is NOT on the jobs page', () => {
    it('does not render the job search results', () => {
      renderSubnav('Home');
      const jobsCounts = screen.queryByText('2758');
      expect(jobsCounts).not.toBeInTheDocument();
    });
  });
});
