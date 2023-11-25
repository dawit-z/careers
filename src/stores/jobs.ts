import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getJobs } from '@/api'
import { useUserStore } from '@/stores/user'
import type { Job } from '@/api/types'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])

  async function fetchJobs() {
    jobs.value = await getJobs()
  }

  const uniqueOrganizations = computed(() => {
    return new Set(jobs.value.map(job => job.organization))
  })

  const uniqueJobTypes = computed(() => {
    return new Set(jobs.value.map(job => job.jobType))
  })

  const includeJobByOrganization = (job: Job) => {
    const userStore = useUserStore()

    if (userStore.selectedOrganizations.length === 0)
      return true
    return userStore.selectedOrganizations.includes(job.organization)
  }

  const includeJobByJobType = (job: Job) => {
    const userStore = useUserStore()

    if (userStore.selectedOrganizations.length === 0)
      return true
    return userStore.selectedOrganizations.includes(job.jobType)
  }

  const includeJobByDegree = (job: Job) => {
    const userStore = useUserStore()

    if (userStore.selectedJobTypes.length === 0)
      return true
    return userStore.selectedJobTypes.includes(job.degree)
  }

  const filteredJobs = computed(() => {
    return jobs.value
      .filter(job => includeJobByOrganization(job))
      .filter(job => includeJobByJobType(job))
      .filter(job => includeJobByDegree(job))
  })

  return {
    jobs,
    fetchJobs,
    includeJobByJobType,
    includeJobByOrganization,
    includeJobByDegree,
    uniqueJobTypes,
    uniqueOrganizations,
    filteredJobs,
  }
})
