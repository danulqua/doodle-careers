import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';

import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useJobsStore } from '@/stores/jobs';

vi.mock('vue-router');
const useRouterMock = useRouter as Mock;

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>;
    action: Mock;
  }

  function createProps(
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ) {
    return {
      uniqueValues: new Set(['Value 1', 'Value 2']),
      action: vi.fn(),
      ...props,
    };
  }

  function renderJobFiltersSidebarCheckboxGroup(
    props: Partial<JobFiltersSidebarCheckboxGroupProps>
  ) {
    const pinia = createTestingPinia({ stubActions: false });
    const jobsStore = useJobsStore();
    const router = { push: vi.fn() };
    useRouterMock.mockReturnValue(router);

    render(JobFiltersSidebarCheckboxGroup, {
      global: {
        plugins: [pinia],
      },
      props: { ...props },
    });

    return { router, jobsStore };
  }

  it('renders unique list of values', () => {
    const props = createProps({
      uniqueValues: new Set(['Full-time', 'Part-time']),
    });

    renderJobFiltersSidebarCheckboxGroup(props);

    const valuesListItems = screen.getAllByRole('listitem');
    const values = valuesListItems.map((node) => node.textContent);
    expect(values).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks the checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action,
      });

      renderJobFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(['Full-time']);
    });

    it('navigates to JobsResults page to display a new list of filtered jobs', async () => {
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time']),
      });
      const { router } = renderJobFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(router.push).toHaveBeenCalledWith({ name: 'JobsResults' });
    });
  });

  describe('when user clears jobs filters', () => {
    it('unchecks all checked checkboxes', async () => {
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time']),
      });
      const { router, jobsStore } = renderJobFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
        'checkbox',
        {
          name: /full-time/i,
        }
      );
      await userEvent.click(fullTimeCheckboxBeforeAction);

      expect(fullTimeCheckboxBeforeAction.checked).toBe(true);

      jobsStore.CLEAR_JOB_FILTERS_SELECTION();

      const fullTimeCheckboxAfterAction =
        await screen.findByRole<HTMLInputElement>('checkbox', {
          name: /full-time/i,
        });

      expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
