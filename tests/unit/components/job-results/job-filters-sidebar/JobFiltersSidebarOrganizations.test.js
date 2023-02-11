import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';

import JobFiltersSidebarOrganizations from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations.vue';
import { useJobsStore } from '@/stores/jobs';

vi.mock('vue-router');

describe('JobFiltersSidebarOrganizations', () => {
  function renderJobFiltersSidebarOrganizations() {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const router = { push: vi.fn() };
    useRouter.mockReturnValue(router);

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FaIcon: true,
        },
      },
    });

    return { jobsStore, router };
  }

  it('renders unique list of organizations from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Doodle', 'Megasoft']);

    const button = screen.getByRole('button', {
      name: /organizations/i,
    });
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole('listitem');
    const organizations = organizationListItems.map((node) => node.textContent);
    expect(organizations).toEqual(['Doodle', 'Megasoft']);
  });

  describe('when user clicks the checkbox', () => {
    it('communicates that user has selected checkbox for organization', async () => {
      const { jobsStore } = renderJobFiltersSidebarOrganizations();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Doodle', 'Megasoft']);

      const button = screen.getByRole('button', {
        name: /organizations/i,
      });
      await userEvent.click(button);

      const doodleCheckbox = screen.getByRole('checkbox', {
        name: /doodle/i,
      });
      await userEvent.click(doodleCheckbox);

      expect(jobsStore.UPDATE_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
        'Doodle',
      ]);
    });

    it('navigates to JobsResults page to display a new list of filtered jobs', async () => {
      const { jobsStore, router } = renderJobFiltersSidebarOrganizations();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Doodle']);

      const button = screen.getByRole('button', {
        name: /organizations/i,
      });
      await userEvent.click(button);

      const doodleCheckbox = screen.getByRole('checkbox', {
        name: /doodle/i,
      });
      await userEvent.click(doodleCheckbox);

      expect(router.push).toHaveBeenCalledWith({ name: 'JobsResults' });
    });
  });
});
