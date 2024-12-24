// src/i18n/index.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// -- Import English JSON files
import enHome from '../data/en/home.json';
import enCompany from '../data/en/company.json';
import enBusiness from '../data/en/business.json';
import enNews from '../data/en/news.json';
import enRecruit from '../data/en/recruit.json';
import enContact from '../data/en/contact.json';

// -- Import Japanese JSON files
import jaHome from '../data/ja/home.json';
import jaCompany from '../data/ja/company.json';
import jaBusiness from '../data/ja/business.json';
import jaNews from '../data/ja/news.json';
import jaRecruit from '../data/ja/recruit.json';
import jaContact from '../data/ja/contact.json';
import enHeader from '../data/en/header.json';
import enFooter from '../data/en/footer.json';
import jaHeader from '../data/ja/header.json';
import jaFooter from '../data/ja/footer.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        header: enHeader,
        footer: enFooter,
        home: enHome,
        company: enCompany,
        business: enBusiness,
        news: enNews,
        recruit: enRecruit,
        contact: enContact
      },
      ja: {
        header: jaHeader,
        footer: jaFooter,
        home: jaHome,
        company: jaCompany,
        business: jaBusiness,
        news: jaNews,
        recruit: jaRecruit,
        contact: jaContact
      }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
