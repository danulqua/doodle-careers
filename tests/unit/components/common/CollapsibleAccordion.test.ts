import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';

describe('CollapsibleAccordion', () => {
  function renderCollapsibleAccordion(config = {}) {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FaIcon: true,
        },
      },
      props: {
        title: 'Category',
      },
      slots: {
        default: '<h3>Nested child</h3>',
      },
      ...config,
    });
  }

  it('renders child content', async () => {
    const props = {
      title: 'Category',
    };
    const slots = {
      default: '<h3>Nested child</h3>',
    };
    const config = { props, slots };

    renderCollapsibleAccordion(config);

    expect(screen.queryByText('Nested child')).not.toBeInTheDocument();
    const button = screen.getByRole('button', {
      name: /category/i,
    });
    await userEvent.click(button);
    expect(screen.getByText('Nested child')).toBeInTheDocument();
  });

  describe('when parent does not provide a content to the accordion', () => {
    it('displays fallback content', async () => {
      const props = {
        title: 'Category',
      };
      const slots = {};
      const config = { props, slots };

      renderCollapsibleAccordion(config);

      const button = screen.getByRole('button', {
        name: /category/i,
      });
      await userEvent.click(button);
      expect(
        screen.getByText('Fallback for accordion content')
      ).toBeInTheDocument();
    });
  });
});
