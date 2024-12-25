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
import styles from './Business.module.scss';

interface BusinessItem {
  id: number;
  title: string;
  images: string[]; // two pictures
  description: string;
  link: string; // external URL
}

const Business: React.FC = () => {
  const { t } = useTranslation('business');
  const items = t('items', { returnObjects: true }) as BusinessItem[];

  return (
    <>
      <Header />
      {/* Hero Section */}
    <Box
        className={styles.heroSection}
        sx={{
            position: 'relative',
            height: { xs: '30vh', md: '40vh' }, // Smaller height for phones
            background: `url('/assets/images/business/business_hero_bg.jpg') center/cover no-repeat`
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


      {/* Business Items Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid2 container spacing={4}>
          {items.map((item) => (
            <Grid2 size={{xs:12}} key={item.id}>
              <Box
                sx={{
                  backgroundColor: '#f9f9f9',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Title */}
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  {item.title}
                </Typography>

                {/* Two Pictures */}
                <Grid2 container spacing={2} sx={{ mb: 3 }}>
                  {item.images.map((img, idx) => (
                    <Grid2 size={{xs:12, md:6}} key={idx}>
                      <img
                        src={img}
                        alt={item.title}
                        style={{ width: '100%', borderRadius: '4px' }}
                      />
                    </Grid2>
                  ))}
                </Grid2>

                {/* Description */}
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {item.description}
                </Typography>

                {/* External Link */}
                <Button
                  variant="outlined"
                  sx={{ color: '#c00', borderColor: '#c00' }}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More
                </Button>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Container>

      <Footer />
    </>
  );
};

export default Business;
