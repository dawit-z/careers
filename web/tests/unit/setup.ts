import { config } from '@vue/test-utils'
import PrimeVue from 'primevue/config'

config.global.plugins = [
  PrimeVue,
]

config.global.stubs = {
  teleport: true,
}
