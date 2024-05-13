import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { type Mock, expect } from 'vitest'
import { createDegree } from '../../utils/createDegree'
import { useDegreesStore } from '@/stores/degrees'

vi.mock('axios')

const axiosGetMock = axios.get as Mock

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores all degrees that jobs may require', async () => {
    axiosGetMock.mockResolvedValue({ data: [{ id: 1, degree: 'Bachelor' }] })
    const store = useDegreesStore()
    await store.fetchDegrees()
    expect(store.degrees).toEqual([{ id: 1, degree: 'Bachelor' }])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('fetchDegrees', () => {
    it('makes api request and stores degrees', () => {
      const store = useDegreesStore()
      expect(store.degrees).toEqual([])
    })
  })

  it('stores all degrees that jobs may require', () => {
    const store = useDegreesStore()
    expect(store.degrees).toEqual([])
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('uniqueDegrees', () => {
    it('makes api request and stores degrees', () => {
      const store = useDegreesStore()
      store.degrees = [
        createDegree({ degree: 'Master\'s' }),
        createDegree({ degree: 'Bachelor' }),
      ]

      expect(store.uniqueDegrees).toEqual(['Master\'s', 'Bachelor'])
    })
  })
})
