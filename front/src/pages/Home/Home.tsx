// src/pages/Home/Home.tsx
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Grid2, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const backgroundImages = [
  '/assets/images/homepage/bg_image_1.jpg',
  '/assets/images/homepage/bg_image_2.jpg',
  '/assets/images/homepage/bg_image_3.jpg'
];

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

const Home: React.FC = () => {
  const { t, i18n } = useTranslation(['home']);
  const [bgIndex, setBgIndex] = useState(0);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  // Load latest 2 news from data/newsList.json
  useEffect(() => {
    import('../../data/newsList.json')
      .then((data) => {
        const list: NewsItem[] = data.default;
        // sort by date desc if needed, or just slice
        setNewsData(list.slice(0, 2)); // latest 2
      })
      .catch((err) => console.error('Failed to load newsList.json', err));
  }, []);

  // Transition every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <>
      <Header />

      {/* Company Section */}
      <Box className={styles.heroContainer}>
        {backgroundImages.map((image, idx) => (
          <Box
            key={image}
            className={`${styles.heroSlide} ${
              idx === bgIndex ? styles.active : ''
            }`}
            sx={{
              backgroundImage: `url(${image})`
            }}
          >
            {/* Fade overlay */}
          </Box>
        ))}
        <Box className={styles.heroContent}>
          <Container maxWidth="md">
            <Typography variant="h3" sx={{ color: '#fff', fontWeight: 600 }}>
              {t('companySection.title')}
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', marginTop: 2 }}>
              {t('companySection.subtitle')}
            </Typography>
            <Box textAlign="right" sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#c00' }}
                component={Link}
                to="/company"
              >
                {t('companySection.buttonLabel')}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>


      {/* Business Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ color: '#c00', fontWeight: 700, mb: 4 }}>
          {t('businessSection.title')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t('businessSection.description')}
        </Typography>
        <Box textAlign="right" sx={{ marginTop: 3 }}>
          <Button
            variant="outlined"
            sx={{ color: '#c00', borderColor: '#c00' }}
            component={Link}
            to="/business"
          >
            {t('businessSection.buttonLabel')}
          </Button>
        </Box>
       </Container>
      

      {/* News Section */}
      <Container maxWidth="lg" sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" sx={{ color: '#c00', fontWeight: 700, mb: 2 }}>
          {t('newsSection.title')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {t('newsSection.description')}
        </Typography>
        <Grid2 container spacing={4}>
          {newsData.map((item) => (
            <Grid2 size={{xs:12, md:6}} key={item.id}>
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
                    component={Link}
                    to={`/news/${item.id}`}
                    sx={{ color: '#c00', fontWeight: 700 }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Box textAlign="right" sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#c00' }}
            component={Link}
            to="/news"
          >
            View All
          </Button>
        </Box>
      </Container>

      {/* Recruit Section */}
        <Container maxWidth="lg" disableGutters sx={{ py: 8 }}>
        {/* Outer container has normal background */}
        <Box
            className={styles.recruitBox}
            sx={{
            background: `url('/assets/images/homepage/recruit_people_bg.jpg') center/cover no-repeat`,
            padding: '3rem',
            borderRadius: '8px',
            }}
        >
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
            {t('recruitSection.title')}
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
            {t('recruitSection.description')}
            </Typography>
            <Box textAlign="right" sx={{ marginTop: 3 }}>
            <Button
                variant="outlined"
                sx={{ color: '#fff', borderColor: '#fff' }}
                component={Link}
                to="/recruit"
            >
                {t('recruitSection.buttonLabel')}
            </Button>
            </Box>
        </Box>
        </Container>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" sx={{ color: '#c00', fontWeight: 700, mb: 2 }}>
          {t('contactSection.title')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {t('contactSection.description')}
        </Typography>
        <Box textAlign="right">
          <Button
            variant="contained"
            sx={{ backgroundColor: '#c00' }}
            component={Link}
            to="/contact"
          >
            {t('contactSection.buttonLabel')}
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default Home;