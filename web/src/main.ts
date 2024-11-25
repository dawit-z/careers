import app from '@/app.vue'
import router from '@/router'

import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import './style.css'

const pinia = createPinia()

const i18n = createI18n({
  fallbackLocale: 'en',
  locale: navigator.language,
  legacy: false,
  messages: {
    en,
  },
})

createApp(app)
  .use(i18n)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(pinia)
  .use(router)
  .mount('#app')
