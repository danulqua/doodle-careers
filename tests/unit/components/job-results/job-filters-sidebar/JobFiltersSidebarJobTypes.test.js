import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarJobTypes from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarJobTypes.vue';
import { useJobsStore } from '@/stores/jobs';

describe('JobFiltersSidebarJobTypes', () => {
  function renderJobFiltersSidebarJobTypes() {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const $router = { push: vi.fn() };

    render(JobFiltersSidebarJobTypes, {
      global: {
        plugins: [pinia],
        mocks: { $router },
        stubs: {
          FaIcon: true,
        },
      },
    });

    return { jobsStore, $router };
  }

  it('renders unique list of jobTypes from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time']);

    const button = screen.getByRole('button', {
      name: /job types/i,
    });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks the checkbox', () => {
    it('communicates that user has selected checkbox for job type', async () => {
      const { jobsStore } = renderJobFiltersSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time']);

      const button = screen.getByRole('button', {
        name: /job types/i,
      });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(jobsStore.UPDATE_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        'Full-time',
      ]);
    });

    it('navigates to JobsResults page to display a new list of filtered jobs', async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-time']);

      const button = screen.getByRole('button', {
        name: /job types/i,
      });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect($router.push).toHaveBeenCalledWith({ name: 'JobsResults' });
    });
  });
});
