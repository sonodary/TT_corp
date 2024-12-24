// src/pages/Company/Company.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Company: React.FC = () => {
  const { t } = useTranslation('company'); // "company" namespace

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>{t('header')}</h1>
        <p>{t('description')}</p>
      </main>
      <Footer />
    </>
  );
};

export default Company;
