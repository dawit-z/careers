import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ActionButton from '@/components/Shared/ActionButton.vue'

describe('actionButton', () => {
  it('renders text', () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary',
      },
    })

    const button = wrapper.get('button')
    expect(button).toBe('Click me')
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
