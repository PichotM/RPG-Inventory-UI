import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const getLanguage = () => {
    return i18n.language || (typeof window !== 'undefined' && window.localStorage.i18nextLng) || 'en';
};

export default i18n
    .use(initReactI18next)
    .use(HttpApi)
    .use(LanguageDetector)
    .init(
        {
            debug: process.env.NODE_ENV !== 'production',
            backend: {
                loadPath: `locales/{{lng}}/{{ns}}.json`,
            },
            whitelist: ['en', 'fr'],
            fallbackLng: 'en',
            fallbackNS: 'common',
            interpolation: {
                escapeValue: false, // not needed for react.
            },
            react: {
                wait: true,
            },
        },
        (err, _) => {
            if (err) {
                return console.error('Load i18n instance failed.', err);
            }
        },
    );
