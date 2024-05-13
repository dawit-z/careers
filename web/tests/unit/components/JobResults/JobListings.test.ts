import { RouterLinkStub, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRoute } from 'vue-router'
import type { Mock } from 'vitest'
import { expect } from 'vitest'
import JobListings from '@/components/JobResults/JobListings.vue'
import { useJobsStore } from '@/stores/jobs'

vi.mock('vue-router')
const useRouteMock = useRoute as Mock

describe('jobListings', () => {
  function mountJobListings() {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    jobsStore.filteredJobs = Array(15).fill({})

    return mount(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
  }

  it('fetches jobs', async () => {
    useRouteMock.mockReturnValue({ query: {} })
    const wrapper = mountJobListings()
    expect(jobsStore.fetchJobs).toHaveBeenCalled()
  })

  it('displays a maximum of 10 jobs', async () => {
    useRouteMock.mockReturnValue({ query: { page: '1' } })

    const { jobsStore } = mountJobListings()
    jobsStore.jobs = Array(15).fill({})

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      useRouteMock.mockReturnValue({ query: {} })

      mountJobListings()

      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    it('displays page number', () => {
      useRouteMock.mockReturnValue({ query: { page: '3' } })

      mountJobListings()

      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe('when user is on first page', () => {
    it('does not show previous button', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })

      const { jobsStore } = mountJobListings()
      jobsStore.filteredJobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows the next button', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })

      const { jobsStore } = mountJobListings()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })

  describe('when user is on last page', () => {
    it('does not show link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } })

      const { jobsStore } = mountJobListings()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } })

      const { jobsStore } = mountJobListings()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
