// src/components/Layout/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss'; // SCSS file
// import logo from '../../../public/assets/images/logo.png'; // example logo path

interface BackgroundImages {
  [key: string]: string; // page path -> background image
}

const backgroundImages: BackgroundImages = {
  '/': '/assets/images/homepage/header-bg-home.jpg',
  '/company': '/assets/images/homepage/header-bg-company.jpg',
  '/business': '/assets/images/homepage/header-bg-business.jpg',
  '/news': '/assets/images/homepage/header-bg-news.jpg',
  '/recruit': '/assets/images/homepage/header-bg-recruit.jpg',
  '/contact': '/assets/images/homepage/header-bg-contact.jpg'
};

const Header: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation(['header']);
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine background image based on current path
  const currentPath = location.pathname;
  const headerBg =
    backgroundImages[currentPath] ||
    backgroundImages['/']; // default to home if not found

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header
      className={styles.header}
      style={{
        backgroundImage: `url(${headerBg})`
      }}
    >
      {/* Overlay to darken background if needed */}
      <div className={styles.overlay} />

      {/* Top Bar (logo + nav) */}
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src="assets/images/logo.jpg" alt={t('logoAlt')} />
          </Link>
        </div>

        <div className={styles.desktopNav}>
          <nav>
            <Link to="/company">{t('nav.company')}</Link>
            <Link to="/business">{t('nav.business')}</Link>
            <Link to="/news">{t('nav.news')}</Link>
            <Link to="/recruit">{t('nav.recruit')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </nav>
          <div className={styles.langSwitch}>
            <button onClick={() => changeLanguage('en')}>
              {t('languageSwitch.en')}
            </button>
            <button onClick={() => changeLanguage('ja')}>
              {t('languageSwitch.ja')}
            </button>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileNav}>
          <nav>
            <Link to="/company" onClick={toggleMenu}>
              {t('nav.company')}
            </Link>
            <Link to="/business" onClick={toggleMenu}>
              {t('nav.business')}
            </Link>
            <Link to="/news" onClick={toggleMenu}>
              {t('nav.news')}
            </Link>
            <Link to="/recruit" onClick={toggleMenu}>
              {t('nav.recruit')}
            </Link>
            <Link to="/contact" onClick={toggleMenu}>
              {t('nav.contact')}
            </Link>
          </nav>
          <div className={styles.langSwitchMobile}>
            <button onClick={() => changeLanguage('en')}>
              {t('languageSwitch.en')}
            </button>
            <button onClick={() => changeLanguage('ja')}>
              {t('languageSwitch.ja')}
            </button>
          </div>
        </div>
      )}

      {/* Page Title in center (optional) */}
      <div className={styles.pageTitle}>
        {/* For example, show a dynamic label based on route */}
        {/* Or pass a prop from each page to set the title */}
        {/* This is optional per the requirement: "with the word on the center" */}
        <h1>
          {
            {
              '/': '',
              '/company': 'COMPANY',
              '/business': 'BUSINESS',
              '/news': 'NEWS',
              '/recruit': 'RECRUIT',
              '/contact': 'CONTACT'
            }[currentPath]
          }
        </h1>
      </div>
    </header>
  );
};

export default Header;
