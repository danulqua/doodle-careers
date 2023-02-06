import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import JobSearchForm from '@/components/job-search/JobSearchForm.vue';

describe('JobSearchForm', () => {
  describe('when user submits the form', () => {
    it('redirects user to jobs results page', async () => {
      const push = vi.fn();
      const $router = { push };

      render(JobSearchForm, {
        global: {
          mocks: { $router },
          stubs: {
            FaIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole('textbox', {
        name: /role/i,
      });
      await userEvent.type(roleInput, 'Vue Developer');

      const locationInput = screen.getByRole('textbox', {
        name: /where?/i,
      });
      await userEvent.type(locationInput, 'Kyiv');

      const submitButton = screen.getByRole('button', {
        name: /search/i,
      });
      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: 'JobsResults',
        query: {
          role: 'Vue Developer',
          location: 'Kyiv',
        },
      });
    });
  });
});
