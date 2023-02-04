import nextElementInList from '@/utils/nextElementInList';

describe('nextElementInList', () => {
  it('returns the next element in the list', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const item = 'c';
    const nextItem = nextElementInList(list, item);
    expect(nextItem).toBe('d');
  });

  describe('when current element is the last element of the list', () => {
    it('returns the first element in the list', () => {
      const list = ['a', 'b', 'c', 'd'];
      const item = 'd';
      const nextItem = nextElementInList(list, item);
      expect(nextItem).toBe('a');
    });
  });
});
