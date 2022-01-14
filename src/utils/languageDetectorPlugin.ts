import Localization from 'react-native-localize';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ModuleType} from 'i18next';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin = {
  type: 'languageDetector' as ModuleType,
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          return callback(Localization.getLocales()[0].languageCode);
        }
      });
    } catch (error) {
      console.error('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error setting language', error);
    }
  },
};

export default languageDetectorPlugin;
