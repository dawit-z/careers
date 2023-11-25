import { fireEvent, render, screen } from '@testing-library/vue'
import { expect } from 'vitest'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('collapsibleAccordion', () => {
  const renderCollapsibleAccordion = (configObject = {}) => {
    render(CollapsibleAccordion, {
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

    renderCollapsibleAccordion(configObject)
    expect(screen.queryByText('My nested child')).not.toBeInTheDocument()
    const button = screen.getByRole('button', { name: /my category/i })
    await fireEvent.click(button)

    expect(screen.getByText('My nested child')).toBeInTheDocument()
  })

  describe('when parent does not provide custom child content', () => {
    it('renders default content', async () => {
      const props = { header: 'My Category' }
      const slots = {}
      const configObject = { props, slots }

      renderCollapsibleAccordion(configObject)
      const button = screen.getByRole('button', { name: /my category/i })
      await fireEvent.click(button)

      expect(screen.getByText('Populate me!')).toBeInTheDocument()
    })
  })
})
