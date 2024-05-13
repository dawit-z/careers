import { createTestingPinia } from '@pinia/testing'
import { type Mock, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JobFiltersGroup from '@/components/JobResults/JobFiltersGroup.vue'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

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

    await wrapper.get('button').trigger('click')
    // const button = screen.getByRole('button', { name: /job types/i })
    // await fireEvent.click(button)

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

      await wrapper.get('button').trigger('click')

      const button = screen.getByRole('button', { name: /job types/i })
      await fireEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      })
      await fireEvent.click(fullTimeCheckbox)

      expect(action).toHaveBeenCalledWith(['Full-time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-time']),
      })
      mountJobFiltersGroup(props)

      const button = screen.getByRole('button', { name: /job types/i })
      await fireEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      })
      await fireEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
