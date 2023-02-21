import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import { useJobsStore } from '@/stores/jobs';

import JobFiltersSidebarLocations from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarLocations.vue';

describe('JobFiltersSidebarLocations', () => {
  const renderJobFiltersSidebarLocations = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(JobFiltersSidebarLocations, {
      global: {
        plugins: [pinia],
        stubs: {
          FaIcon: true,
        },
      },
    });

    return { jobsStore };
  };

  it('populates search input from store', async () => {
    const { jobsStore } = renderJobFiltersSidebarLocations();
    jobsStore.locationsSearchTerm = 'Kyiv';

    const input = await screen.findByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('Kyiv');
  });

  it('writes user input to store', async () => {
    const { jobsStore } = renderJobFiltersSidebarLocations();
    jobsStore.locationsSearchTerm = '';

    const input = await screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(input, 'Kyiv');
    await userEvent.click(document.body);

    expect(jobsStore.UPDATE_LOCATIONS_SEARCH_TERM).toHaveBeenCalledWith('Kyiv');
  });

  it('removes whitespaces from user input', async () => {
    const { jobsStore } = renderJobFiltersSidebarLocations();
    jobsStore.locationsSearchTerm = '';

    const input = await screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(input, ' Kyiv     ');
    await userEvent.click(document.body);

    expect(jobsStore.UPDATE_LOCATIONS_SEARCH_TERM).toHaveBeenCalledWith('Kyiv');
  });
});
