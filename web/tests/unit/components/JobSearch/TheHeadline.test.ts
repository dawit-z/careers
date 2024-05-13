import { nextTick } from 'vue'
import { expect } from 'vitest'
import TheHeadline from '@/components/JobSearch/TheHeadline.vue'
import { mount } from '@vue/test-utils'

describe('theHeadline', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('displays intro action verb', () => {
    const wrapper = mount(TheHeadline)

    const actionVerb = wrapper.get('heading')

    expect(actionVerb).toBe('Find')
  })

  it('changes action verb at an interval', () => {
    const mock = vi.fn()
    vi.stubGlobal('setInterval', mock)
    render(TheHeadline)

    expect(mock).toHaveBeenCalled()
  })

  it('swaps action verb after interval', async () => {
    render(TheHeadline)
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

    const { unmount } = render(TheHeadline)
    unmount()

    expect(clearInterval).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
