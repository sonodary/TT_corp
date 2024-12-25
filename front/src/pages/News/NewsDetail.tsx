// src/pages/News/NewsDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
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
    import(`../../data/newsList.json`)
      .then((mod) => {
        const all: NewsItem[] = mod.default;
        const found = all.find((n) => n.id === newsId);
        if (found) setNewsItem(found);
      })
      .catch((err) => console.error('Error loading detail:', err));
  }, [newsId, i18n.language]);

  if (!newsItem) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography>Loading...</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  const { date, tag, title, content, image } = newsItem;

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Date in top-left corner approach */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: '#c00', flexShrink: 0 }}
          >
            {date}
          </Typography>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {i18n.language === 'ja' ? title.ja : title.en}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {tag}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <img
            src={image}
            alt={i18n.language === 'ja' ? title.ja : title.en}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </Box>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {i18n.language === 'ja' ? content.ja : content.en}
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default NewsDetail;
