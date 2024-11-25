import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, type Mock } from 'vitest'
import { useRouter } from 'vue-router'

vi.mock('vue-router')
const useRouterMock = useRouter as Mock

describe('jobSearchForm', () => {
  function mountJobSearchForm() {
    return mount(JobSearchForm)
  }

  describe('when user submits form', () => {
    it('directs user to job results page with user\'s search parameters', async () => {
      const push = vi.fn()
      useRouterMock.mockImplementation(() => ({
        push,
      }))
      const wrapper = mountJobSearchForm()

      await wrapper.find('#role').setValue('Developer')
      await wrapper.find('#location').setValue('Dallas')
      await wrapper.find('[data-test="submit-btn"]').trigger('click')
      await flushPromises()

      expect(push).toHaveBeenCalled()
      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: { role: 'Developer', location: 'Dallas' },
      })
    })
  })
})
