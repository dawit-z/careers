import { type Ref, computed } from 'vue'

function usePreviousAndNextPages(currentPage: Ref<number>, maxPage: Ref<number>) {
  const previousPage = computed(() => {
    return currentPage.value > 1 ? currentPage.value - 1 : undefined
  })

  const nextPage = computed(() => {
    return currentPage.value < maxPage.value ? currentPage.value + 1 : undefined
  })

  return { previousPage, nextPage }
}

export default usePreviousAndNextPages
