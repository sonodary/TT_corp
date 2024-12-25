// src/pages/News/NewsList.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid2, Card, CardContent, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './NewsList.module.scss';

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
    const lang = i18n.language === 'ja' ? 'ja' : 'en';
    import(`../../data/newsList.json`)
      .then((mod) => {
        setNewsData(mod.default);
      })
      .catch((err) => console.error('Error loading newsList:', err));
  }, [i18n.language]);

  return (
    <>
      <Header />
      {/* Hero Section */}
    <Box
        className={styles.heroSection}
        sx={{
            position: 'relative',
            height: { xs: '30vh', md: '40vh' }, // Smaller height for phones
            background: `url('/assets/images/news/newsList_hero_bg.jpg') center/cover no-repeat`
        }}
        >
        <Box
            sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}
        >
            <Typography
            variant="h2"
            sx={{
                color: '#fff',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' }, // Responsive font size
                textAlign: 'center'
            }}
            >
            {t('header')}
            </Typography>
        </Box>
    </Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ color: '#c00', fontWeight: 700, mb: 4 }}>
          {t('header')} {/* e.g. "News" */}
        </Typography>

        <Grid2 container spacing={4}>
        {newsData.map((item) => (
            <Grid2 size={{xs:12}} key={item.id}>
            <Card>
                <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {item.date}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {item.tag}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    {i18n.language === 'ja' ? item.title.ja : item.title.en}
                </Typography>
                <Button
                    variant="text"
                    sx={{ color: '#c00', fontWeight: 700 }}
                    component={Link}
                    to={`/news/${item.id}`}
                >
                    {t('More')} {/* e.g. "Read More" */}
                </Button>
                </CardContent>
            </Card>
            </Grid2>
        ))}
        </Grid2>
      </Container>
      <Footer />
    </>
  );
};

export default NewsList;
