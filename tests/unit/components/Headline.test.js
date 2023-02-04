import { nextTick } from 'vue';
import { render, screen } from '@testing-library/vue';

import Headline from '@/components/Headline.vue';

describe('Headline', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays first action verb', () => {
    render(Headline);
    const actionPhrase = screen.getByRole('heading', {
      name: /build for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });

  it('changes action verb at a consistent interval', () => {
    const mock = vi.fn();
    vi.stubGlobal('setInterval', mock);

    render(Headline);

    expect(mock).toHaveBeenCalled();
  });

  it('swaps action verb after interval', async () => {
    render(Headline);
    vi.advanceTimersToNextTimer();
    await nextTick();

    const actionPhrase = screen.getByRole('heading', {
      name: /create for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it('removes interval when components disappears', () => {
    const clearInterval = vi.fn();
    vi.stubGlobal('clearInterval', clearInterval);

    const { unmount } = render(Headline);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
