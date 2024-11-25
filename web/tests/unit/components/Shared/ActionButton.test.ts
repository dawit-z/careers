import ActionButton from '@/components/Shared/ActionButton.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

describe('actionButton', () => {
  it('renders text', () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary',
      },
    })

    const button = wrapper.get('button')
    expect(button.text()).toBe('Click me')
  })

  it('applies one of several styles to button', () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary',
      },
    })

    const button = wrapper.get('button')
    expect(button.classes()).toContain('primary')
  })
})
