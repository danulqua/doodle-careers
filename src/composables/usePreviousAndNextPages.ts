import { type Ref, computed } from 'vue';

function usePreviousAndNextPages(
  currentPage: Ref<number>,
  maxPage: Ref<number>
) {
  const previousPage = computed(() => {
    const previousPage = currentPage.value - 1;
    return previousPage >= 1 ? previousPage : undefined;
  });

  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1;
    return nextPage <= maxPage.value ? nextPage : undefined;
  });

  return { previousPage, nextPage };
}

export default usePreviousAndNextPages;
