import { render, screen } from '@testing-library/vue';

import MainNav from '@/components/MainNav.vue';

describe('MainNav', () => {
  it('displays brand name', () => {
    render(MainNav);
    const company = screen.getByText('danulqua Careers');
    expect(company).toBeInTheDocument();
  });
});
