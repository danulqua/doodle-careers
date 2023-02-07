import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import axios from 'axios';

import JobListings from '@/components/job-results/JobListings.vue';

vi.mock('axios');

describe('JobListings', () => {
  function createRoute(queryParams = {}) {
    return {
      query: {
        page: '5',
        ...queryParams,
      },
    };
  }

  function renderJobListings($route) {
    render(JobListings, {
      global: {
        mocks: { $route },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  }

  it('fetches jobs', () => {
    axios.get.mockResolvedValue({ data: [] });

    const $route = createRoute({ page: '5' });
    renderJobListings($route);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs');
  });

  it('displays a maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });

    const $route = createRoute({ page: '1' });
    renderJobListings($route);

    const jobListings = await screen.findAllByRole('listitem');
    expect(jobListings).toHaveLength(10);
  });

  describe('when query params exclude page number', () => {
    it('displays page number 1', () => {
      const $route = createRoute({ page: undefined });
      renderJobListings($route);

      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });
  });

  describe('when query params include page number', () => {
    it('displays page number', () => {
      const $route = createRoute({ page: '3' });
      renderJobListings($route);

      expect(screen.getByText('Page 3')).toBeInTheDocument();
    });
  });

  describe('when user is on first page', () => {
    it('does not show link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });

      const $route = createRoute({ page: '1' });
      renderJobListings($route);

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', {
        name: /previous/i,
      });
      expect(previousLink).not.toBeInTheDocument();
    });

    it('shows link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });

      const $route = createRoute({ page: '1' });
      renderJobListings($route);

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', {
        name: /next/i,
      });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
