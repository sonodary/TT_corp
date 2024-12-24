// src/pages/News/NewsList.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

interface NewsItem {
  id: string;
  date: string;
  tag: string;
  title: {
    en: string;
    ja: string;
  };
  content: {
    en: string;
    ja: string;
  };
  image: string;
}

const NewsList: React.FC = () => {
  const { t, i18n } = useTranslation('news'); // "news" namespace
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Load news from local JSON
    import('../../data/newsList.json')
      .then((data) => {
        setNewsData(data.default);
      })
      .catch((error) => console.error('Error loading newsList.json:', error));
  }, []);

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>{t('header')}</h1>
        <h2>{t('listHeader')}</h2>
        <ul>
          {newsData.map((item) => (
            <li key={item.id} style={{ marginBottom: '1rem' }}>
              <p>{item.date}</p>
              <p>{item.tag}</p>
              {/* Show the title based on current language */}
              <Link to={`/news/${item.id}`}>
                {i18n.language === 'ja' ? item.title.ja : item.title.en}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default NewsList;
