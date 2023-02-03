import { render, screen } from '@testing-library/vue';

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
});
