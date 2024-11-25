import TheMainNav from '@/components/Navigation/TheMainNav.vue'
import { useUserStore } from '@/stores/user'
import { createTestingPinia } from '@pinia/testing'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { expect, type Mock } from 'vitest'
import { useRoute } from 'vue-router'

vi.mock('vue-router')
const useRouteMock = useRoute as Mock

describe('theMainNav', () => {
  const mountMainNav = () => {
    useRouteMock.mockReturnValue({ name: 'Home' })
    const pinia = createTestingPinia()

    return mount(TheMainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    })
  }

  it('displays company name', () => {
    const wrapper = mountMainNav()
    expect(wrapper.text()).toContain('Bobo Careers')
  })

  it('displays menu items for navigation', () => {
    const wrapper = mountMainNav()

    const navigationMenuItems = screen.getAllByRole('listitem')

    const navigationMenuTexts = navigationMenuItems
      .map(item => item.textContent)

    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Benefits',
      'Jobs',
      'Students',
    ])
  })

  describe('when the user logs in', () => {
    it('displays user profile picture', async () => {
      const wrapper = mountMainNav()
      const userStore = useUserStore()

      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        name: /sign in/i,
      })
      userStore.isLoggedIn = true
      await fireEvent.click(loginButton)

      profileImage = screen.getByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
