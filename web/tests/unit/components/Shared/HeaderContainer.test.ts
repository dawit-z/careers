import HeaderContainer from '@/components/Shared/HeaderContainer.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

// let wrapper: VueWrapper<InstanceType<typeof HeaderContainer>>

describe('headerContainer', () => {
  it('allows parent component to provide title content', () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: '<h1>The Title</h1>',
      },
    })

    expect(wrapper.get('The Title')).toBeTruthy()
  })

  it('allows parent component to provide subtitle content', () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        subtitle: '<h3>subtitle</h3>',
      },
    })

    expect(wrapper.get('subtitle')).toBeTruthy()
  })
})
