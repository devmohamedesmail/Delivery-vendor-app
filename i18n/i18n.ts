import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const LANGUAGE_KEY = 'APP_LANGUAGE';

const getInitialLanguage = async () => {
  const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (storedLang) return storedLang;

  const deviceLang = getLocales()[0]?.languageCode;
  return deviceLang === 'ar' ? 'ar' : 'en';
};

export const initI18n = async () => {
  const lng = await getInitialLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      compatibilityJSON: 'v4',
    });
};

export const saveLanguage = async (lang: string) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
};

export default i18n;
