import { render, screen } from '@testing-library/vue';

import HeaderContainer from '@/components/common/HeaderContainer.vue';

describe('HeaderContainer', () => {
  it('allows parent component to provide title content', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h1>Sample title</h1>',
      },
    });

    expect(screen.getByText('Sample title')).toBeInTheDocument();
  });

  it('allows parent component to provide subtitle content', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h2>Sample subtitle</h2>',
      },
    });

    expect(screen.getByText('Sample subtitle')).toBeInTheDocument();
  });
});
