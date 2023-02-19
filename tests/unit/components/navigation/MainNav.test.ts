import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import { useRoute } from 'vue-router';

import { useUserStore } from '@/stores/user';

import MainNav from '@/components/navigation/MainNav.vue';

vi.mock('vue-router');
const useRouteMock = useRoute as Mock;

describe('MainNav', () => {
  function renderMainNav() {
    const pinia = createTestingPinia();

    useRouteMock.mockReturnValue({ name: 'Home' });

    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FaIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  }

  it('displays brand name', () => {
    renderMainNav();
    const company = screen.getByText('Doodle Careers');
    expect(company).toBeInTheDocument();
  });

  it('displays menu link items', () => {
    renderMainNav();
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
    renderMainNav();
    const userStore = useUserStore();

    let profileImage = screen.queryByRole('img', {
      name: /user profile image/i,
    });
    expect(profileImage).not.toBeInTheDocument();

    const loginButton = screen.getByRole('button', {
      name: /sign in/i,
    });
    userStore.isLoggedIn = true;
    await userEvent.click(loginButton);

    profileImage = screen.getByRole('img', {
      name: /user profile image/i,
    });
    expect(profileImage).toBeInTheDocument();
  });
});
