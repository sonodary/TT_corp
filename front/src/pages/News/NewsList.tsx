// src/pages/News/NewsList.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid2, Card, CardContent, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './NewsList.module.scss';

// Define NewsItem interface based on the single-language JSON structure
interface NewsItem {
  id: string;
  date: string;
  tag: string;
  title: string; // Title is a simple string in language-specific files
  content: string; // Content is a simple string in language-specific files
  image: string;
}

const NewsList: React.FC = () => {
  // Keep the "news" namespace for other translations in this component
  const { t, i18n } = useTranslation('news');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    setError(null);
    // Dynamically import the news list based on the current language
    import(`../../data/${i18n.language}/newsList.json`)
      .then((mod) => {
        setNewsData(mod.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error loading newsList for ${i18n.language}:`, err);
        setError('Failed to load news list.'); // Set error on fetch failure
        setLoading(false);
      });
  }, [i18n.language]); // Re-run effect when language changes

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography>Loading news list...</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
      return (
           <>
            <Header />
            <Container maxWidth="md" sx={{ py: 8 }}>
              <Typography color="error">{error}</Typography>
            </Container>
            <Footer />
          </>
      );
  }


  return (
    <>
      <Header />
      {/* Hero Section */}
    <Box
        className={styles.heroSection}
        sx={{
            position: 'relative',
            height: { xs: '30vh', md: '40vh' }, // Smaller height for phones
            background: `url('/assets/images/news/newsList_hero_bg.jpg') center/cover no-repeat` // Ensure this image exists
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
          {t('header')} {/* e.g. "News" - from news.json */}
        </Typography>

         {newsData.length === 0 && !loading && !error ? (
             <Typography textAlign="center">No news items found.</Typography>
         ) : (
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
                    {/* Access title directly */}
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        {item.title}
                    </Typography>
                    <Button
                        variant="text"
                        sx={{ color: '#c00', fontWeight: 700 }}
                        component={Link}
                        to={`/news/${item.id}`}
                    >
                        {t('MORE')} {/* e.g. "Read More" - ensure you have this key in news.json */}
                    </Button>
                    </CardContent>
                </Card>
                </Grid2>
            ))}
            </Grid2>
         )}
      </Container>
      <Footer />
    </>
  );
};

export default NewsList;