import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia, setActivePinia } from 'pinia';
import { useRouter } from 'vue-router';

import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue';

vi.mock('vue-router');
const useRouterMock = useRouter as Mock;

describe('JobFiltersSidebarCheckboxGroup', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

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
    const router = { push: vi.fn() };
    useRouterMock.mockReturnValue(router);

    render(JobFiltersSidebarCheckboxGroup, {
      global: {
        stubs: {
          FaIcon: true,
        },
      },
      props: { ...props },
    });

    return { router };
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
});
