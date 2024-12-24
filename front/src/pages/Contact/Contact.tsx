// src/pages/Contact/Contact.tsx

import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid
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
      <Box className={styles.contactHero}>
        <Box className={styles.overlay}>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 600 }}>
            {t('header')}
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {t('intro')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('formLabels.name')}
                variant="outlined"
                name="name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('formLabels.company')}
                variant="outlined"
                name="company"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('formLabels.phone')}
                variant="outlined"
                name="phone"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('formLabels.email')}
                variant="outlined"
                name="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('formLabels.title')}
                variant="outlined"
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('formLabels.message')}
                variant="outlined"
                name="message"
              />
            </Grid>
          </Grid>
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
