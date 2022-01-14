import {initReactI18next} from 'react-i18next';

import i18n from 'i18next';

import {en, pt} from './translations';
import languageDetectorPlugin from './utils/languageDetectorPlugin';

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;
