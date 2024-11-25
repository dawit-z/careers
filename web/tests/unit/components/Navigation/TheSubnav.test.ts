import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { useJobsStore } from '@/stores/jobs'
import { createTestingPinia } from '@pinia/testing'

import { mount } from '@vue/test-utils'
import { expect, type Mock } from 'vitest'
import { useRoute } from 'vue-router'

vi.mock('vue-router')

const useRouteMock = useRoute as Mock

describe('theSubnav', () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    const wrapper = mount(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          Icon: true,
        },
      },
    })

    return { wrapper, jobsStore }
  }

  describe('when user is on jobs page', () => {
    it('displays job count', async () => {
      useRouteMock.mockReturnValue({ name: 'JobResults' })

      const { wrapper, jobsStore } = renderTheSubnav()
      const numberOfJobs = 16

      // @ts-expect-error: Getter is read-only
      jobsStore.filteredJobs = Array.from({ length: numberOfJobs }).fill({})

      expect(wrapper.find('[data-test="job-count"]').text()).toBe(numberOfJobs)
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT display job count', () => {
      useRouteMock.mockReturnValue({ name: 'Home' })

      const { wrapper, jobsStore } = renderTheSubnav()
      const numberOfJobs = 16

      // @ts-expect-error: Getter is read-only
      jobsStore.filteredJobs = Array.from({ length: numberOfJobs }).fill({})

      expect(wrapper.find('[data-test="job-count"]').text()).not.toBe(numberOfJobs)
    })
  })
})
