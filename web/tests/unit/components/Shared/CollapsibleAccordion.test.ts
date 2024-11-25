import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

describe('collapsibleAccordion', () => {
  const mountCollapsibleAccordion = (configObject = {}) => {
    return mount(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: 'My Category',
      },
      slots: {
        default: '<h3>My nested child</h3>',
      },
      ...configObject,
    })
  }

  it('renders child content', async () => {
    const props = { header: 'My Category' }
    const slots = { default: '<h3>My nested child</h3>' }
    const configObject = { props, slots }

    const wrapper = mountCollapsibleAccordion(configObject)
    expect(wrapper.text()).not.toContain('My nested child')

    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toContain('My nested child')
  })

  describe('when parent does not provide custom child content', () => {
    it('renders default content', async () => {
      const props = { header: 'My Category' }
      const slots = {}
      const configObject = { props, slots }

      const wrapper = mountCollapsibleAccordion(configObject)
      const button = screen.getByRole('button', { name: /my category/i })
      await fireEvent.click(button)

      expect(screen.getByText('Populate me!')).toBeInTheDocument()
    })
  })
})
