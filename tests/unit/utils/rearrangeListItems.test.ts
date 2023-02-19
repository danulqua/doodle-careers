import rearrangeListItems from '@/utils/rearrangeListItems';

describe('rearrangeListItems', () => {
  it('moves first list item in the end of the list', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const newList = rearrangeListItems(list);
    expect(newList).toEqual(['b', 'c', 'd', 'e', 'a']);
  });
});
