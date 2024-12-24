// src/pages/Home/Home.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './Home.module.scss';

const backgrounds = [
  '/assets/images/homepage/bg1.jpg',
  '/assets/images/homepage/bg2.jpg',
  '/assets/images/homepage/bg3.jpg'
];

const Home: React.FC = () => {
  const { t } = useTranslation(['home']);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        {/* Company Section */}
        <section
          className={styles.companySection}
          style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
        >
          <div className={styles.overlay}>
            <h2>{t('companySection.title')}</h2>
            <p>{t('companySection.subtitle')}</p>
            <button>More</button>
          </div>
        </section>

        {/* Business Section */}
        <section className={styles.businessSection}>
          <h2>{t('businessSection.title')}</h2>
          <p>{t('businessSection.description')}</p>
          <button>More</button>
        </section>

        {/* News Section */}
        <section className={styles.newsSection}>
          <h2>{t('newsSection.title')}</h2>
          {/* News items */}
        </section>

        {/* Recruit Section */}
        <section className={styles.recruitSection}>
          <h2>{t('recruitSection.title')}</h2>
          <p>{t('recruitSection.description')}</p>
          <button>More</button>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <h2>{t('contactSection.title')}</h2>
          <p>{t('contactSection.description')}</p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
