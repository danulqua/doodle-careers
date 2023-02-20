import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import { useJobsStore } from '@/stores/jobs';

import JobFiltersSidebarPrompt from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarPrompt.vue';

describe('JobFiltersSidebarPrompt', () => {
  describe('when user clicks Clear Filters button', () => {
    it("sends message to clear all of user's job search filters", async () => {
      const pinia = createTestingPinia();
      const jobsStore = useJobsStore();

      render(JobFiltersSidebarPrompt, {
        global: {
          plugins: [pinia],
        },
      });

      const button = screen.getByRole('button', {
        name: /clear filters/i,
      });
      await userEvent.click(button);

      expect(jobsStore.CLEAR_JOB_FILTERS_SELECTION).toHaveBeenCalled();
    });
  });
});
