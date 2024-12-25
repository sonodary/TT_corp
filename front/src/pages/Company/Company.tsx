// src/pages/Company/Company.tsx
import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './Company.module.scss';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  intro: string;
  photo: string; // path to profile picture
}

interface AboutInfo {
  companyName: string;
  address: string;
  establishment: string;
  ceo: string;
  capital: string;
  businessActivities: string;
}

const Company: React.FC = () => {
  const { t } = useTranslation('company'); // "company" namespace

  // If you store everything in i18n, retrieve them:
  const missionTitle = t('mission.title') as string;
  const missionBold = t('mission.bold') as string;
  const missionDesc = t('mission.description') as string;

  const teamTitle = t('team.title') as string;
  const teamMembers = t('team.members', { returnObjects: true }) as TeamMember[];

  const aboutTitle = t('about.title') as string;
  const aboutInfo = t('about.info', { returnObjects: true }) as AboutInfo;

  const contactTitle = t('contact.title') as string;
  const contactButtonLabel = t('contact.buttonLabel') as string;

  return (
    <>
    <Header />
  
    {/* Hero Section */}
    <Box
        className={styles.heroSection}
        sx={{
            position: 'relative',
            height: { xs: '30vh', md: '40vh' }, // Smaller height for phones
            background: `url('/assets/images/company/company_hero_bg.jpg') center/cover no-repeat`
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

  
   {/* Mission Section */}
    <Box
    className={styles.section}
    sx={{
        py: 8,
        textAlign: 'center',
        backgroundColor: '#f7f7f7' // Light grey background
    }}
    >
    <Container maxWidth="md">
        <Typography
        variant="h4"
        sx={{
            color: '#c00',
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '2rem', md: '3.5rem' },
            lineHeight: 1.3,
            textAlign: { xs: 'center', md: 'left' } // Center on phones, left on PC
        }}
        >
        {missionTitle}
        </Typography>
        <Typography
        variant="h6"
        sx={{
            color: '#000',
            fontWeight: 'bold',
            mb: 4,
            fontSize: { xs: '1.2rem', md: '2rem' }, // Smaller on phones
            lineHeight: 1.5
        }}
        >
        {missionBold}
        </Typography>
        <Typography
        variant="body1"
        sx={{
            color: '#555',
            maxWidth: 700,
            mx: 'auto',
            fontSize: { xs: '0.9rem', md: '1.25rem' }, // Smaller on phones
            lineHeight: 2,
            letterSpacing: '0.02em',
            mb: 2
        }}
        >
        {missionDesc}
        </Typography>
    </Container>
    </Box>



  
    {/* Team Section */}
    <Box className={styles.section} sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Typography
        variant="h4"
        sx={{
            color: '#c00',
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '2rem', md: '3.5rem' },
            lineHeight: 1.3,
            textAlign: { xs: 'center', md: 'left' } // Center on phones, left on PC
        }}
        >
        {teamTitle}
        </Typography>

        <Grid2 container spacing={4}>
          {teamMembers.map((member) => (
            <Grid2 size={{xs:12, sm:6, md:4}} key={member.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <CardMedia
                  component="img"
                  image={member.photo}
                  alt={member.name}
                  sx={{ height: 220, objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {member.position} - {member.name}
                  </Typography>
                  <Typography variant="body2">{member.intro}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  
    {/* About Section */}
    <Box
    className={styles.section}
    sx={{
        backgroundColor: '#f9f9f9',
        py: { xs: 4, md: 8 } // Less vertical padding on small screens
    }}
    >
    <Container maxWidth="md">
        <Typography
        variant="h4"
        sx={{
            color: '#c00',
            fontWeight: 700,
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '2rem', md: '3.5rem' },
            textAlign: { xs: 'center', md: 'left' } // Center on phones, left on PC
        }}
        >
        {aboutTitle}
        </Typography>
        <Typography
        variant="body1"
        sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', md: '1rem' }, // Smaller font size
            lineHeight: { xs: 1.5, md: 1.8 } // Adjust line spacing
        }}
        >
        <strong>Company Name:</strong> {aboutInfo.companyName}
        </Typography>
        <Typography
        variant="body1"
        sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', md: '1rem' },
            lineHeight: { xs: 1.5, md: 1.8 }
        }}
        >
        <strong>Address:</strong> {aboutInfo.address}
        </Typography>
        <Typography
        variant="body1"
        sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', md: '1rem' },
            lineHeight: { xs: 1.5, md: 1.8 }
        }}
        >
        <strong>Establishment:</strong> {aboutInfo.establishment}
        </Typography>
        <Typography
        variant="body1"
        sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', md: '1rem' },
            lineHeight: { xs: 1.5, md: 1.8 }
        }}
        >
        <strong>CEO:</strong> {aboutInfo.ceo}
        </Typography>
        <Typography
        variant="body1"
        sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', md: '1rem' },
            lineHeight: { xs: 1.5, md: 1.8 }
        }}
        >
        <strong>Capital:</strong> {aboutInfo.capital}
        </Typography>
        <Typography
        variant="body1"
        sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', md: '1rem' },
            lineHeight: { xs: 1.5, md: 1.8 }
        }}
        >
        <strong>Business Activities:</strong> {aboutInfo.businessActivities}
        </Typography>
    </Container>
    </Box>

  
    {/* Contact Section */}
    <Box
    className={styles.section}
    sx={{
        py: 8,
        display: 'flex', // Flexbox for centering
        justifyContent: 'center', // Horizontally center content
        alignItems: 'center', // Vertically center content
        textAlign: 'center'
    }}
    >
    <Container>
        <Button
        variant="contained"
        sx={{
            backgroundColor: '#c00',
            fontSize: { xs: '0.9rem', md: '1.2rem' }, // Smaller on phones
            padding: { xs: '0.5rem 1.5rem', md: '0.8rem 2rem' } // Compact padding for smaller screens
        }}
        href="/contact"
        >
        {contactButtonLabel}
        </Button>
    </Container>
    </Box>

  
    <Footer />
  </>
  
  );
};

export default Company;
