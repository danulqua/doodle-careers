import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRoute } from 'vue-router';

import JobListings from '@/components/job-results/JobListings.vue';
import { useJobsStore } from '@/stores/jobs';

import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages';
import { useDegreesStore } from '@/stores/degrees';

vi.mock('vue-router');
const useRouteMock = useRoute as Mock;
vi.mock('@/composables/usePreviousAndNextPages');
const usePreviousAndNextPagesMock = usePreviousAndNextPages as Mock;

interface Pages {
  previousPage?: number;
  nextPage?: number;
}

describe('JobListings', () => {
  function mockPreviousAndNextPages(pages: Pages = {}) {
    usePreviousAndNextPagesMock.mockReturnValue({
      previousPage: pages.previousPage,
      nextPage: pages.nextPage,
    });
  }

  function renderJobListings() {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const degreesStore = useDegreesStore();
    // @ts-expect-error: getter is readonly
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { jobsStore, degreesStore };
  }

  it('fetches jobs', () => {
    useRouteMock.mockReturnValue({ query: {} });
    mockPreviousAndNextPages();

    const { jobsStore } = renderJobListings();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it('fetches degrees', () => {
    useRouteMock.mockReturnValue({ query: {} });
    mockPreviousAndNextPages();

    const { degreesStore } = renderJobListings();
    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it('displays a maximum of 10 jobs', async () => {
    useRouteMock.mockReturnValue({ query: { page: '1' } });
    mockPreviousAndNextPages();

    const { jobsStore } = renderJobListings();
    // @ts-expect-error: getter is readonly
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    const jobListings = await screen.findAllByRole('listitem');
    expect(jobListings).toHaveLength(10);
  });

  describe('when query params exclude page number', () => {
    it('displays page number 1', () => {
      useRouteMock.mockReturnValue({ query: { page: undefined } });
      renderJobListings();

      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });
  });

  describe('when query params include page number', () => {
    it('displays page number', () => {
      useRouteMock.mockReturnValue({ query: { page: '3' } });
      renderJobListings();

      expect(screen.getByText('Page 3')).toBeInTheDocument();
    });
  });

  describe('when user is on first page', () => {
    it('does not show link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } });
      mockPreviousAndNextPages({ nextPage: 2 });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: getter is readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', {
        name: /previous/i,
      });
      expect(previousLink).not.toBeInTheDocument();
    });

    it('shows link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } });
      mockPreviousAndNextPages({ nextPage: 2 });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: getter is readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', {
        name: /next/i,
      });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe('when user is on last page', () => {
    it('does not show link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } });
      mockPreviousAndNextPages({ previousPage: 1 });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: getter is readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', {
        name: /next/i,
      });
      expect(previousLink).not.toBeInTheDocument();
    });

    it('shows link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } });
      mockPreviousAndNextPages({ previousPage: 1 });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: getter is readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', {
        name: /previous/i,
      });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
