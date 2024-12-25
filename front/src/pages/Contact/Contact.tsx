// src/pages/Contact/Contact.tsx

import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid2
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './Contact.module.scss';

const Contact: React.FC = () => {
  const { t } = useTranslation('contact');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement submission logic / send to email / API
    alert('Submitted!');
  };

  return (
    <>
      <Header />
      {/* Hero Section */}
      <Box
        className={styles.heroSection}
        sx={{
            position: 'relative',
            height: { xs: '30vh', md: '40vh' }, // Smaller height for phones
            background: `url('/assets/images/contact/contact_hero_bg.jpg') center/cover no-repeat`
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

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {t('intro')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid2 container spacing={3}>
            <Grid2 size={{xs:12, sm:6}}>
              <TextField
                fullWidth
                label={t('formLabels.name')}
                variant="outlined"
                name="name"
                required
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:6}}>
              <TextField
                fullWidth
                label={t('formLabels.company')}
                variant="outlined"
                name="company"
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:6}}>
              <TextField
                fullWidth
                label={t('formLabels.phone')}
                variant="outlined"
                name="phone"
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:6}}>
              <TextField
                fullWidth
                label={t('formLabels.email')}
                variant="outlined"
                name="email"
                required
              />
            </Grid2>
            <Grid2 size={{xs:12}}>
              <TextField
                fullWidth
                label={t('formLabels.title')}
                variant="outlined"
                name="title"
              />
            </Grid2>
            <Grid2 size={{xs:12}}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('formLabels.message')}
                variant="outlined"
                name="message"
              />
            </Grid2>
          </Grid2>
          <Box textAlign="right" sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#c00' }}
            >
              {t('submitButton')}
            </Button>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default Contact;
