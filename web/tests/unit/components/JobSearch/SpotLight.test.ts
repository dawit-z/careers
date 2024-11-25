import SpotLight from '@/components/JobSearch/SpotLight.vue'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { expect, type Mock } from 'vitest'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('spotLight', () => {
  const mockSpotlightsReponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Image',
          title: 'Title',
          description: 'Description',
          ...spotlight,
        },
      ],
    })
  }

  it('provides image to parent component', async () => {
    mockSpotlightsReponse()

    const wrapper = mount(SpotLight, {
      slots: {
        default: `<template #default="slotprops">
        <h1>{{ slotprops.img }}</h1>
        </template>`,
      },
    })

    expect(wrapper.text()).toContain('Image')
  })

  it('provides title to parent component', async () => {
    mockSpotlightsReponse()

    const wrapper = mount(SpotLight, {
      slots: {
        default: `<template #default="slotprops">
        <h1>{{ slotprops.title }}</h1>
        </template>`,
      },
    })

    const text = await screen.findByText('Title')
    expect(text).toBeInTheDocument()
  })

  it('provides description to parent component', async () => {
    mockSpotlightsReponse()

    const wrapper = mount(SpotLight, {
      slots: {
        default: `<template #default="slotprops">
        <h1>{{ slotprops.description }}</h1>
        </template>`,
      },
    })

    const text = await screen.findByText('Description')
    expect(text).toBeInTheDocument()
  })
})
