import JobFiltersGroup from '@/components/JobResults/JobFiltersGroup.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { expect, type Mock } from 'vitest'
import { useRouter } from 'vue-router'

vi.mock('vue-router')

const useRouterMock = useRouter as Mock

describe('jobFiltersGroup', () => {
  interface FilterGroup {
    header: string
    uniqueValues: Set<string>
    action: Mock
  }

  function createProps(props: Partial<FilterGroup> = {}): FilterGroup {
    return {
      header: 'Some header',
      uniqueValues: new Set(['ValueA', 'ValueB']),
      action: vi.fn(),
      ...props,
    }
  }

  function mountJobFiltersGroup(props: FilterGroup) {
    const pinia = createTestingPinia()

    return mount(JobFiltersGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true },
      },
    })
  }

  it('renders unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['Full-time', 'Part-time']),
    })

    const wrapper = mountJobFiltersGroup(props)

    await wrapper.get('button').trigger('click') // job types
    await wrapper.get('checkbox').trigger('click') // full-time

    const orgListItems = wrapper.findAll('listitem')
    const orgs = orgListItems.map(node => node.text())
    expect(orgs).toEqual(['Full-time', 'Part-time'])
  })

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action: vi.fn(),
      })

      const wrapper = mountJobFiltersGroup(props)

      await wrapper.get('button').trigger('click') // job types
      await wrapper.get('checkbox').trigger('click') // full-time

      expect(props.action).toHaveBeenCalledWith(['Full-time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn()
      useRouterMock.mockImplementation(() => ({
        push,
      }))

      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-time']),
      })

      const wrapper = mountJobFiltersGroup(props)
      await wrapper.get('button').trigger('click') // job types
      await wrapper.get('checkbox').trigger('click') // full-time
      // await flushPromises()

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
