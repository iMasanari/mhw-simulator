import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enDecos from '~/locales/en/decos.json'
import enEquips from '~/locales/en/equips.json'
import enSkills from '~/locales/en/skills.json'
import enTranslation from '~/locales/en/translation.json'

const lng = navigator.languages.find(v => /^(ja|en)/.test(v))?.slice(0, 2) || 'ja'

const options = {
  lng,
  resources: {
    ja: {}, // keyをそのまま表示する
    en: {
      translation: enTranslation,
      skills: enSkills,
      equips: enEquips,
      decos: enDecos,
    },
  },
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
