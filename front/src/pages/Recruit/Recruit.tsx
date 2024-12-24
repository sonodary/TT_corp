// src/pages/Recruit/Recruit.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Recruit: React.FC = () => {
  const { t } = useTranslation('recruit'); // "recruit" namespace

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>{t('header')}</h1>
        <section>
          <h2>{t('messageTitle')}</h2>
          <p>{t('messageBody')}</p>
        </section>
        <section>
          <h3>{t('valuesTitle')}</h3>
          <ul>
            <li>{t('value1')}</li>
            <li>{t('value2')}</li>
            <li>{t('value3')}</li>
          </ul>
        </section>
        <section>
          <h3>{t('openPositionsTitle')}</h3>
          <p> {/* Placeholder for actual positions data */} </p>
        </section>
        <section>
          <h4>{t('ctaText')}</h4>
          {/* Link/button to contact page */}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Recruit;
