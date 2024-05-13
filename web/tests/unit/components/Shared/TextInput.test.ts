import { expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TextInput from '@/components/Shared/TextInput.vue'

describe('textInput', () => {
  it('communicates user has entered characters', async () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: '',
      },
    })

    await wrapper.find('input').setValue('NYC')

    const messages = wrapper.emitted('update:modelValue')
    expect(messages).toEqual([['NYC']])
  })
})
