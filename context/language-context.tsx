import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'APP_LANGUAGE';

type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => Promise<void>;
  setLanguage: (lang: Language) => Promise<void>;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const [language, setLang] = useState<Language>(
    (i18n.language as Language) || 'en'
  );

  const isRTL = language === 'ar';

  const applyLanguage = async (lang: Language) => {
    const rtl = lang === 'ar';

    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);

    if (I18nManager.isRTL !== rtl) {
      I18nManager.allowRTL(rtl);
      I18nManager.forceRTL(rtl);

      // Reload only in real builds
      if (Platform.OS !== 'web') {
        try {
          const Updates = require('expo-updates');
          await Updates.reloadAsync();
        } catch {
          // Expo Go – ignore
        }
      }
    }

    setLang(lang);
  };

  const toggleLanguage = async () => {
    await applyLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isRTL,
        toggleLanguage,
        setLanguage: applyLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};


