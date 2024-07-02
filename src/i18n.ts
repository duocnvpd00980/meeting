import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ns1 from './locales/en/ns1.json'
export const defaultNS = 'ns1'
export const resources = {
  en: {
    ns1,
  },
} as const

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    lng: 'en',
    defaultNS,
    resources,
  })
export default i18next
