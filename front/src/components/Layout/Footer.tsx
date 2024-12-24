// src/components/Layout/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
// Example: reference real icon paths or from a CDN
const Footer: React.FC = () => {
  const { t } = useTranslation(['footer']);

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src="/assets/images/logo.jpg" alt={t('logoAlt')} />
        </div>
        <p>© 2024 Traveling Tokyo, {t('copyright')}</p>
      </div>

      <div className={styles.right}>
        <p>{t('companyInfo.address')}</p>
        <p>{t('companyInfo.email')}</p>
        <p>{t('companyInfo.phone')}</p>
        <div className={styles.snsIcons}>
          <a
            href="https://getyourguide.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/icons/getyourguide.svg"
              alt={t('sns.getYourGuideAlt')}
            />
          </a>
          <a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/icons/tripadvisor.svg"
              alt={t('sns.tripAdvisorAlt')}
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/icons/instagram.svg"
              alt={t('sns.instagramAlt')}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
