import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getDegrees } from '@/api'
import type { Degree } from '@/api/types'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  const fetchDegrees = async () => {
    degrees.value = await getDegrees()
  }

  const uniqueDegrees = computed(() =>
    degrees.value.map(degree => degree.degree),
  )

  return { degrees, fetchDegrees, uniqueDegrees }
})
