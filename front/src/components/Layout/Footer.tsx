// src/components/Layout/Footer.tsx
import React from 'react';
import { Container, Box, Typography, useMediaQuery, Grid2 } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

interface RecommendedLogo {
    src: string;
    alt: string;
}

interface AwardBadge {
     src: string;
     alt: string;
}

interface TripAdvisorListing {
    reviews: string;
    name: string;
    ratingText: string;
    category: string;
}

const Footer: React.FC = () => {
  const { t } = useTranslation(['footer']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Access data from the 'recognition' section of the footer translation file
  const recognitionData = t('recognition', { returnObjects: true }) as {
      recommendedByHeading: string;
      recommendedByDescription: string;
      recommendedLogos: RecommendedLogo[];
      achievementsHeading: string; // This heading will now likely apply to the listings and awards together
      tripadvisor: {
          listing1: TripAdvisorListing;
          listing2: TripAdvisorListing; // Add more if needed
          awardsHeading: string; // Keep this heading for the awards block
          awardBadges: AwardBadge[];
      }
  };


  return (
    <Box className={styles.footerContainer}> {/* This will have the black background */}

      {/* Full-width Box for the white top section */}
      {recognitionData && ( // Render only if recognition data is available
        <Box className={styles.whiteTopSection}>
           <Container maxWidth="lg" className={styles.recognitionSectionContent}>

                {/* Recommended By Section (Row) - Text and Partner Logos */}
                <Box className={styles.recommendedBy}>
                  <Box className={styles.recommendedByText}> {/* Wrapper for text */}
                    <Typography variant="h6" component="h3" sx={{ color: '#000', marginBottom: 1 }}>
                      {recognitionData.recommendedByHeading}
                    </Typography>
                     <Typography variant="body2" sx={{ color: '#333', marginBottom: 2 }}>
                      {recognitionData.recommendedByDescription}
                    </Typography>
                  </Box>
                  <Box className={styles.logoContainer}>
                    {/* Map over the recommendedLogos array from JSON */}
                    {recognitionData.recommendedLogos.map((logo, index) => (
                        <img
                            key={index}
                            src={`/assets/images/footer/${logo.src}`} // Construct the full path
                            alt={logo.alt}
                            className={styles.recognitionLogo}
                        />
                    ))}
                  </Box>
                  {/* Removed the main company logo from here */}
                </Box>

                {/* TripAdvisor Listings and Awards Row */}
                 {(recognitionData.tripadvisor.listing1 || recognitionData.tripadvisor.listing2 || (recognitionData.tripadvisor.awardBadges && recognitionData.tripadvisor.awardBadges.length > 0)) && (
                    <Box className={styles.tripadvisorAwardsRow}> {/* This box will arrange listings and awards side-by-side */}

                        {/* TripAdvisor Listings Area */}
                        {(recognitionData.tripadvisor.listing1 || recognitionData.tripadvisor.listing2) && (
                           <Box className={styles.tripadvisorListingsArea}>
                                {/* You might choose to put the overall achievements heading here or remove it */}
                               {/* <Typography variant="h6" component="h3" sx={{ color: '#000', marginBottom: 2 }}>
                                {recognitionData.achievementsHeading}
                                </Typography>*/}
                                {/* Changed Grid container to Grid2 container */}
                                <Grid2 container spacing={1} justifyContent="center"> {/* Added justifyContent to center items in the grid */}
                                   {/* Example TripAdvisor Listing 1 Achievement (Changed Grid2 item syntax) */}
                                   {recognitionData.tripadvisor.listing1 && (
                                       <Grid2 size={{ xs: 12, md: 4 }}> {/* Use size prop with object */}
                                           <Box className={styles.tripadvisorItem}>
                                                {/* Replace with TripAdvisor logo or icon */}
                                              <img src="/assets/icons/tripadvisor.svg" alt="TripAdvisor" className={styles.tripadvisorIcon} />
                                              <Typography variant="body1" sx={{ color: '#000', marginTop: 1 }}>
                                                  {recognitionData.tripadvisor.listing1.reviews}
                                              </Typography>
                                                <Typography variant="body2" sx={{ color: '#000' }}>
                                                  {recognitionData.tripadvisor.listing2.name}
                                              </Typography>
                                                {/* Add star rating or specific achievement text/badges here */}
                                                {/* Example: Star ratings (you might use icons or a rating component) */}
                                                <Box className={styles.starRating}>
                                                  {recognitionData.tripadvisor.listing1.ratingText}
                                                </Box>
                                                <Typography variant="body2" sx={{ color: '#000', fontWeight: 'bold' }}>
                                                  {recognitionData.tripadvisor.listing1.category}
                                              </Typography>
                                           </Box>
                                       </Grid2>
                                   )}


                                   {/* Example TripAdvisor Listing 2 Achievement (if applicable) (Changed Grid2 item syntax) */}
                                    {recognitionData.tripadvisor.listing2 && (
                                       <Grid2 size={{ xs: 12, md: 4 }}> {/* Use size prop with object */}
                                           <Box className={styles.tripadvisorItem}>
                                                {/* Replace with TripAdvisor logo or icon */}
                                              <img src="/assets/icons/tripadvisor.svg" alt="TripAdvisor" className={styles.tripadvisorIcon} />
                                              <Typography variant="body1" sx={{ color: '#000', marginTop: 1 }}>
                                                  {recognitionData.tripadvisor.listing2.reviews}
                                              </Typography>
                                                <Typography variant="body2" sx={{ color: '#000' }}>
                                                  {recognitionData.tripadvisor.listing2.name}
                                              </Typography>
                                                {/* Add star rating or specific achievement text/badges here */}
                                                 <Box className={styles.starRating}>
                                                   {recognitionData.tripadvisor.listing2.ratingText}
                                                </Box>
                                                <Typography variant="body2" sx={{ color: '#000', fontWeight: 'bold' }}>
                                                   {recognitionData.tripadvisor.listing2.category}
                                               </Typography>
                                           </Box>
                                       </Grid2>
                                   )}
                                </Grid2>
                           </Box>
                        )}


                        {/* Awards Area */}
                        {recognitionData.tripadvisor.awardBadges && recognitionData.tripadvisor.awardBadges.length > 0 && (
                           <Box className={styles.awardsArea}>
                               <Typography variant="h6" component="h3" sx={{ color: '#000', marginBottom: 2 }}>
                                   {recognitionData.tripadvisor.awardsHeading}
                               </Typography>
                               <Box className={styles.awardBadges}>
                                   {/* Map over the awardBadges array from JSON */}
                                   {recognitionData.tripadvisor.awardBadges.map((badge, index) => (
                                       <img
                                           key={index}
                                           src={`/assets/images/footer/${badge.src}`} // Construct the full path
                                           alt={badge.alt}
                                           className={styles.awardBadge}
                                       />
                                   ))}
                               </Box>
                           </Box>
                        )}
                    </Box>
                 )}

            </Container>
        </Box>
      )}


      {/* The original footer content - will have black sides from footerContainer */}
      <Container maxWidth="lg" className={styles.footerContent}>
        <Box className={styles.leftSection} textAlign={isMobile ? 'center' : 'left'}>
          <img
            src='assets/images/logo.jpg'
            alt={t('logoAlt')}
            className={styles.logo}
          />
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            © 2024 Traveling Tokyo, {t('copyright')}
          </Typography>
        </Box>

        <Box className={styles.rightSection} textAlign={isMobile ? 'center' : 'right'}>
          <Typography variant="body2">
            {t('companyInfo.address')}
          </Typography>
          <Typography variant="body2">
            {t('companyInfo.email')}
          </Typography>
          <Typography variant="body2">
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