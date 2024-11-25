import { useUserStore } from '@/stores/user'
import { createPinia, setActivePinia } from 'pinia'
import { expect } from 'vitest'

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('keeps track of login status', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })

  it('keeps track of selected organizations', () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
  })

  it('keeps track of selected job types', () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('loginUser', () => {
    it('keeps track of login status', () => {
      const store = useUserStore()
      store.loginUser()
      expect(store.isLoggedIn).toBe(true)
    })
  })

  describe('addSelectedOrganization', () => {
    it('updates orgs that the user has selected to filter by', () => {
      const store = useUserStore()
      store.addSelectedOrganizations(['Org1', 'Org2'])

      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2'])
    })
  })

  describe('addSelectedJobTypes', () => {
    it('updates the job types that the user has selected to filter by', () => {
      const store = useUserStore()
      store.addSelectedJobTypes(['Full-time', 'Part-time'])

      expect(store.selectedJobTypes).toEqual(['Full-time', 'Part-time'])
    })
  })
})
