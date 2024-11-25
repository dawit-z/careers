import TheHeadline from '@/components/JobSearch/TheHeadline.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import { nextTick } from 'vue'

describe('theHeadline', () => {
  function mountTheHeadline() {
    return mount(TheHeadline)
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('displays intro action verb', () => {
    const wrapper = mountTheHeadline()

    const actionVerb = wrapper.get('heading')
    expect(actionVerb).toBe('Find')
  })

  it('changes action verb at an interval', () => {
    const mock = vi.fn()
    vi.stubGlobal('setInterval', mock)
    mountTheHeadline()

    expect(mock).toHaveBeenCalled()
  })

  it('swaps action verb after interval', async () => {
    const wrapper = mountTheHeadline()
    vi.advanceTimersToNextTimer()
    await nextTick()

    const actionVerb = screen.getByRole('heading', {
      name: /create for everyone/i,
    })
    expect(actionVerb).toBeInTheDocument()
  })

  it('removes interval when component disappears', () => {
    const clearInterval = vi.fn()
    vi.stubGlobal('clearInterval', clearInterval)

    const wrapper = mountTheHeadline()
    wrapper.unmount()

    expect(clearInterval).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
