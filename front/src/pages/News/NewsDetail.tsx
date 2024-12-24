// src/pages/News/NewsDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const NewsDetail: React.FC = () => {
  const { newsId } = useParams();
  const { t, i18n } = useTranslation('news');
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    import('../../data/newsList.json')
      .then((data) => {
        const allNews: NewsItem[] = data.default;
        const found = allNews.find((item) => item.id === newsId);
        if (found) setNewsItem(found);
      })
      .catch((error) => console.error('Error loading news list:', error));
  }, [newsId]);

  if (!newsItem) {
    return (
      <>
        <Header />
        <main style={{ padding: '2rem' }}>
          <p>Loading news details...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>{t('detailHeader')}</h1>
        <p>{newsItem.date}</p>
        <h2>
          {i18n.language === 'ja' ? newsItem.title.ja : newsItem.title.en}
        </h2>
        <img
          src={newsItem.image}
          alt={i18n.language === 'ja' ? newsItem.title.ja : newsItem.title.en}
          style={{ maxWidth: '400px', display: 'block', margin: '1rem 0' }}
        />
        <p>
          {i18n.language === 'ja'
            ? newsItem.content.ja
            : newsItem.content.en}
        </p>
      </main>
      <Footer />
    </>
  );
};

export default NewsDetail;
