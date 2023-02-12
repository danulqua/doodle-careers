import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'vue-router';

import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue';

vi.mock('vue-router');

describe('JobFiltersSidebarCheckboxGroup', () => {
  function createProps(props = {}) {
    return {
      title: 'Sample title',
      uniqueValues: new Set(['Value 1', 'Value 2']),
      action: vi.fn(),
      ...props,
    };
  }

  function renderJobFiltersSidebarCheckboxGroup(props) {
    const router = { push: vi.fn() };
    useRouter.mockReturnValue(router);

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

  it('renders unique list of values', async () => {
    const props = createProps({
      title: 'Job types',
      uniqueValues: new Set(['Full-time', 'Part-time']),
    });

    renderJobFiltersSidebarCheckboxGroup(props);

    const button = screen.getByRole('button', {
      name: /job types/i,
    });
    await userEvent.click(button);

    const valuesListItems = screen.getAllByRole('listitem');
    const values = valuesListItems.map((node) => node.textContent);
    expect(values).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks the checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      const action = vi.fn();
      const props = createProps({
        title: 'Job types',
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action,
      });

      renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole('button', {
        name: /job types/i,
      });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(['Full-time']);
    });

    it('navigates to JobsResults page to display a new list of filtered jobs', async () => {
      const props = createProps({
        title: 'Job types',
        uniqueValues: new Set(['Full-time', 'Part-time']),
      });
      const { router } = renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole('button', {
        name: /job types/i,
      });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(router.push).toHaveBeenCalledWith({ name: 'JobsResults' });
    });
  });
});
