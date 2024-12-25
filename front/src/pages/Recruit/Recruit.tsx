// src/pages/Recruit/Recruit.tsx

import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid2,
  Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Link } from 'react-router-dom';
import styles from './Recruit.module.scss';

interface PositionItem {
  id: number;
  title: string;
  description: string;
}

const Recruit: React.FC = () => {
  const { t } = useTranslation('recruit'); // "recruit" namespace

  // Retrieve positions array from i18n
  const positions: PositionItem[] = t('positions', { returnObjects: true }) as PositionItem[];

  return (
    <>
      <Header />
    {/* Hero Section */}
    <Box
        className={styles.heroSection}
        sx={{
            position: 'relative',
            height: { xs: '30vh', md: '40vh' }, // Smaller height for phones
            background: `url('/assets/images/recruit/recruit_hero_bg.jpg') center/cover no-repeat`
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
        {/* Message Section */}
        <Typography variant="h4" sx={{ color: '#c00', mb: 3 }}>
          {t('messageTitle')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 5 }}>
          {t('messageBody')}
        </Typography>

        {/* Values Section */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          {t('valuesTitle')}
        </Typography>
        <Grid2 container spacing={2} sx={{ mb: 4 }}>
          <Grid2 size={{xs:12, md:4}}>
            <Box className={styles.valueCard}>
              <Typography variant="h6" sx={{ color: '#c00' }}>
                {t('value1.title')}
              </Typography>
              <Typography variant="body2">{t('value1.description')}</Typography>
            </Box>
          </Grid2>
          <Grid2 size={{xs:12, md:4}}>
            <Box className={styles.valueCard}>
              <Typography variant="h6" sx={{ color: '#c00' }}>
                {t('value2.title')}
              </Typography>
              <Typography variant="body2">{t('value2.description')}</Typography>
            </Box>
          </Grid2>
          <Grid2 size={{xs:12,md:4}}>
            <Box className={styles.valueCard}>
              <Typography variant="h6" sx={{ color: '#c00' }}>
                {t('value3.title')}
              </Typography>
              <Typography variant="body2">{t('value3.description')}</Typography>
            </Box>
          </Grid2>
        </Grid2>

        {/* Open Positions Section */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {t('openPositionsTitle')}
        </Typography>

        <Box component="ul" sx={{ padding: 0, listStyle: 'none' }}>
        {positions.map((pos) => (
            <Box
            component="li"
            key={pos.id}
            sx={{
                mb: 4,
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: 2,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#c00', mb: 1 }}>
                {pos.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
                {pos.description}
            </Typography>
            </Box>
        ))}
        </Box>


        {/* Contact CTA at the bottom */}
        <Box textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('ctaText')}
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#c00' }}
            component={Link}
            to="/contact"
          >
            Contact Us
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default Recruit;
