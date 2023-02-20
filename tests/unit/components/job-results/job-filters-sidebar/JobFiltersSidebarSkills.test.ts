import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import { useJobsStore } from '@/stores/jobs';

import JobFiltersSidebarSkills from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarSkills.vue';

describe('JobFiltersSidebarSkills', () => {
  const renderJobFiltersSidebarSkills = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });

    return { jobsStore };
  };

  it('populates search input from store', async () => {
    const { jobsStore } = renderJobFiltersSidebarSkills();
    jobsStore.skillsSearchTerm = 'Developer';

    const input = await screen.findByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('Developer');
  });

  it('writes user input to store', async () => {
    const { jobsStore } = renderJobFiltersSidebarSkills();
    jobsStore.skillsSearchTerm = '';

    const input = await screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(input, 'Vue');
    await userEvent.click(document.body);

    expect(jobsStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('Vue');
  });

  it('removes whitespaces from user input', async () => {
    const { jobsStore } = renderJobFiltersSidebarSkills();
    jobsStore.skillsSearchTerm = '';

    const input = await screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(input, ' Vue Dev     ');
    await userEvent.click(document.body);

    expect(jobsStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('Vue Dev');
  });
});
