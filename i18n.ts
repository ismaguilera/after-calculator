import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextHttpBackend from 'i18next-http-backend';

i18next
  .use(i18nextHttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'es', // Set default language to Spanish
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    }
  });

export default i18next;