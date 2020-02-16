import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '~/locales/en.json'
import ja from '~/locales/ja.json'

const lng = navigator.languages.find(v => /^(ja|en)/.test(v))?.slice(0, 2) || 'ja'

const options = {
  resources: {
    ja: { translation: ja },
    en: { translation: en },
  },
  lng,
  fallbackLng: false,
  returnEmptyString: false,
  nsSeparator: false,
  debug: process.env.NODE_ENV !== 'production',
  interpolation: { escapeValue: false },
} as const

i18n
  .use(initReactI18next)
  .init(options)

export default i18n
