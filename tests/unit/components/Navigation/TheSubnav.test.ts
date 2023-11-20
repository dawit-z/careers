import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import type { Mock } from 'vitest'
import { useRoute } from 'vue-router'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { useJobsStore } from '@/stores/jobs'

vi.mock('vue-router')

const useRouteMock = useRoute as Mock

describe('theSubnav', () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

    return { jobsStore }
  }

  describe('when user is on jobs page', () => {
    it('displays job count', async () => {
      useRouteMock.mockReturnValue({ name: 'JobResults' })

      const { jobsStore } = renderTheSubnav()
      const numberOfJobs = 16

      // @ts-expect-error: Getter is read-only
      jobsStore.filteredJobs = Array(numberOfJobs).fill({})

      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT display job count', () => {
      useRouteMock.mockReturnValue({ name: 'Home' })

      const { jobsStore } = renderTheSubnav()
      const numberOfJobs = 16

      // @ts-expect-error: Getter is read-only
      jobsStore.filteredJobs = Array(numberOfJobs).fill({})

      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
