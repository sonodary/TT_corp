// src/pages/Contact/Contact.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Contact: React.FC = () => {
  const { t } = useTranslation('contact'); // "contact" namespace

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>{t('header')}</h1>
        <p>{t('intro')}</p>

        <form style={{ maxWidth: '400px' }}>
          <label>
            {t('formLabels.name')}
            <input type="text" name="name" />
          </label>

          <label>
            {t('formLabels.company')}
            <input type="text" name="company" />
          </label>

          <label>
            {t('formLabels.phone')}
            <input type="tel" name="phone" />
          </label>

          <label>
            {t('formLabels.email')}
            <input type="email" name="email" />
          </label>

          <label>
            {t('formLabels.title')}
            <input type="text" name="title" />
          </label>

          <label>
            {t('formLabels.message')}
            <textarea name="message" rows={4}></textarea>
          </label>

          <button type="submit" style={{ marginTop: '1rem' }}>
            {t('submitButton')}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
