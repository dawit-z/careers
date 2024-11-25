import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

import { createPinia, setActivePinia } from 'pinia'
import { expect, type Mock } from 'vitest'
import { createJob } from '../../utils/mocks'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores job listings', () => {
    const jobStore = useJobsStore()
    expect(jobStore.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('fetchJobs', () => {
    it('makes API request and stores response', async () => {
      axiosGetMock.mockResolvedValue({ data: ['Job 1', 'Job 2'] })
      const store = useJobsStore()
      await store.fetchJobs()
      expect(store.jobs).toEqual(['Job 1', 'Job 2'])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('uniqueOrganizations', () => {
    it('finds unique organizations from list of jobs', async () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ organization: 'Vue' }),
        createJob({ organization: 'Vue' }),
        createJob({ organization: 'Google' }),
      ]

      expect(store.uniqueOrganizations).toEqual(new Set(['Vue', 'Google']))
    })
  })

  describe('uniqueJobTypes', () => {
    it('finds unique job types from list of jobs', async () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Temporary' }),
        createJob({ jobType: 'Full-time' }),
      ]

      expect(store.uniqueJobTypes).toEqual(new Set(['Full-time', 'Temporary']))
    })
  })

  describe('includeJobByOrganization', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const store = useJobsStore()
        const job = createJob({ organization: 'Google' })
        const result = store.includeJobByOrganization(job)
        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Microsoft']
      const store = useJobsStore()
      const job = createJob({ organization: 'Google' })

      const result = store.includeJobByOrganization(job)
      expect(result).toBe(true)
    })
  })

  describe('iNCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when the user has not selected any job types', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []
        const store = useJobsStore()
        const job = createJob({ jobType: 'Full-time' })

        const result = store.includeJobByOrganization(job)
        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given job types', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-time', 'Part-time']
      const store = useJobsStore()
      const job = createJob({ jobType: 'Part-time' })

      const result = store.includeJobByJobType(job)
      expect(result).toBe(true)
    })
  })
})
