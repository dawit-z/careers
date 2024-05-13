import { expect } from 'vitest'
import nextElementInList from '@/utils/nextElementInList'

describe('nextElementInList', () => {
  it('returns next element in list', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const value = 'C'

    expect(nextElementInList(list, value)).toBe('D')
  })

  describe('when element is last on list', () => {
    it('returns first element in list', () => {
      const list = ['A', 'B', 'C', 'D', 'E']
      const value = 'E'

      expect(nextElementInList(list, value)).toBe('A')
    })
  })
})
