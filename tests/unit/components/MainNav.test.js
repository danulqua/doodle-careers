import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import MainNav from '@/components/MainNav.vue';

describe('MainNav', () => {
  it('displays brand name', () => {
    render(MainNav);
    const company = screen.getByText('danulqua Careers');
    expect(company).toBeInTheDocument();
  });

  it('displays menu link items', () => {
    render(MainNav);
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
    render(MainNav);

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
