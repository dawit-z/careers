import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getDegrees } from '@/api'
import type { Degree } from '@/api/types'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Array<Degree>>([])

  const uniqueDegrees = computed(() =>
    degrees.value.map(degree => degree.degree),
  )

  async function fetchDegrees() {
    degrees.value = await getDegrees()
  }

  return { degrees, fetchDegrees, uniqueDegrees }
})
