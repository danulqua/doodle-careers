import { nextTick } from 'vue';
import { render, screen, fireEvent } from '@testing-library/vue';

import TheHeadline from '@/components/job-search/TheHeadline.vue';

describe('Headline', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays first action verb', () => {
    render(TheHeadline);
    const actions = screen.getAllByRole('Action');
    expect(actions[0].textContent).toBe('Build');
  });

  it('changes action verb at a consistent interval', () => {
    const mock = vi.fn();
    vi.stubGlobal('setInterval', mock);

    render(TheHeadline);

    expect(mock).toHaveBeenCalled();
  });

  it('swaps action verb after interval', async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();

    fireEvent.transitionEnd(screen.getByTestId('scrollableActions'));
    await nextTick();

    const actions = screen.getAllByRole('Action');
    expect(actions[0].textContent).toBe('Create');
  });

  it('removes interval when components disappears', () => {
    const clearInterval = vi.fn();
    vi.stubGlobal('clearInterval', clearInterval);

    const { unmount } = render(TheHeadline);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
