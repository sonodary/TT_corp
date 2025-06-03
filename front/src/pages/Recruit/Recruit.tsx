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

// Update PositionItem if needed, but the focus is on the new WorkConditionItem
interface PositionItem {
  id: number;
  title: string;
  description: string;
}

// Define interface for WorkConditionItem
interface WorkConditionItem {
    title: string;
    details: string;
}

const Recruit: React.FC = () => {
  const { t } = useTranslation('recruit'); // "recruit" namespace

  // Retrieve data from i18n
  const header = t('header') as string;
  const messageTitle = t('messageTitle') as string;
  const messageBody = t('messageBody') as string;
  const workConditionsTitle = t('workConditionsTitle') as string;
  // Access workConditions as an array of objects
  const workConditions: WorkConditionItem[] = t('workConditions', { returnObjects: true }) as WorkConditionItem[];
  const openPositionsTitle = t('openPositionsTitle') as string;
  const positions: PositionItem[] = t('positions', { returnObjects: true }) as PositionItem[];
  const ctaText = t('ctaText') as string;
  const contactButtonLabel = t('contactButtonLabel') as string; // Assuming you'll add this to recruit.json

  return (
    <>
      <Header />
    {/* Hero Section */}
    <Box
        className={styles.heroSection}
        sx={{
            position: 'relative',
            height: { xs: '30vh', md: '40vh' }, // Smaller height for phones
            background: `url('/assets/images/recruit/recruit_hero_bg.jpg') center/cover no-repeat` // Ensure this image exists
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
            {header}
            </Typography>
        </Box>
    </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Message Section */}
        <Typography variant="h4" sx={{ color: '#c00', mb: 3, textAlign: "center" }}>
          {messageTitle}
        </Typography>
        <Typography variant="body1" sx={{ mb: 10 }}>
          {messageBody}
        </Typography>

        {/* Work Style & Conditions Section - Replaces Values Section */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: "center"  }}>
          {workConditionsTitle}
        </Typography>
        <Grid2 container spacing={3} sx={{ mb: 10 }}>
          {workConditions.map((condition, index) => (
            <Grid2 size={{xs:12, md:6}} key={index}>
              <Box className={styles.conditionCard}>
                {/* Assign custom class to title Typography */}
                <Typography variant="h6" className={styles.conditionTitle}>
                  {condition.title}
                </Typography>
                {/* Assign custom class to details Typography */}
                <Typography variant="body2" className={styles.conditionDetails}>
                  {condition.details}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>

        {/* Open Positions Section */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: "center"  }}>
        {openPositionsTitle}
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
            {ctaText}
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#c00' }}
            component={Link}
            to="/contact"
          >
            {contactButtonLabel}
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default Recruit;