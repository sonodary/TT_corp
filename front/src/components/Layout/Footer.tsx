// src/components/Layout/Footer.tsx
import React from 'react';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { t } = useTranslation(['footer']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className={styles.footerContainer}>
      <Container maxWidth="lg" className={styles.footerContent}>
        <Box className={styles.leftSection} textAlign={isMobile ? 'center' : 'left'}>
          <img
            src='assets/images/logo.jpg'
            alt={t('logoAlt')}
            className={styles.logo}
          />
          <Typography variant="body2" sx={{ color: '#fff', marginTop: 1 }}>
            © 2024 Traveling Tokyo, {t('copyright')}
          </Typography>
        </Box>

        <Box className={styles.rightSection} textAlign={isMobile ? 'center' : 'right'}>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {t('companyInfo.address')}
          </Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {t('companyInfo.email')}
          </Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {t('companyInfo.phone')}
          </Typography>

          <Box className={styles.snsIcons}>
            <a
              href="https://getyourguide.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/icons/getyourguide.svg"
                alt={t('sns.getYourGuideAlt')}
              />
            </a>
            <a
              href="https://tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/icons/tripadvisor.svg"
                alt={t('sns.tripAdvisorAlt')}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/icons/instagram.svg"
                alt={t('sns.instagramAlt')}
              />
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
