import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import MainNav from '@/components/navigation/MainNav.vue';

describe('MainNav', () => {
  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false });

    const $route = {
      name: 'Home',
    };

    render(MainNav, {
      global: {
        plugins: [pinia],
        mocks: { $route },
        stubs: {
          FaIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  });

  it('displays brand name', () => {
    const company = screen.getByText('danulqua Careers');
    expect(company).toBeInTheDocument();
  });

  it('displays menu link items', () => {
    const navigationLinks = screen.getAllByRole('listitem');
    const navigationTexts = navigationLinks.map((item) => item.textContent);
    expect(navigationTexts).toEqual([
      'Teams',
      'Locations',
      'Life at danulqua Corp',
      'How we hire',
      'Students',
      'Jobs',
    ]);
  });

  it('displays user profile image', async () => {
    let profileImage = screen.queryByRole('img', {
      name: /user profile image/i,
    });
    expect(profileImage).not.toBeInTheDocument();

    const loginButton = screen.getByRole('button', {
      name: /sign in/i,
    });
    await userEvent.click(loginButton);

    profileImage = screen.getByRole('img', {
      name: /user profile image/i,
    });
    expect(profileImage).toBeInTheDocument();
  });
});
