// src/pages/Company/Company.tsx
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import {
  Container,
  Box,
  Typography,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Button,
  Link as MuiLink // Use MuiLink to avoid conflict with react-router-dom Link
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './Company.module.scss';
import { Link } from 'react-router-dom';

// Define interfaces matching the structure of companyData.json
interface ValueItem {
    title: string;
    description: string;
    icon?: string; // Optional icon path for value item
}

interface PlatformItem {
    name: string;
    logo: string;
    link: string;
}

interface PlatformReview {
    platform: string;
    count: string;
    link: string;
}

interface MediaMention {
    media: string;
    date: string;
    description?: string; // Optional description
    link?: string; // Optional link to the article
}

interface CollaborationItem {
    type: string;
    description: string;
}

interface TourHighlight {
    name: string;
    stats?: string; // Optional stats like frequency or repeat rate
}


interface CompanyTranslations {
  header: string; // Note: header might still come from public/locales/company.json if not in data file
  message: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    photo?: string; // Optional photo path
    // Removed icons key
  };
  philosophy: {
    heading: string;
    missionHeading: string;
    missionText: string;
    visionHeading: string;
    visionText: string;
    valuesHeading: string;
    values: ValueItem[];
  };
  profile: {
    heading: string;
    companyName: string;
    representative: string;
    establishmentDate: string;
    address: string;
    businessActivities: string;
    email: string;
    phone: string;
    transactionPlatformsHeading: string;
    transactionPlatforms: PlatformItem[];
    registrationHeading: string;
    registrationNumber: string;
  };
  achievements: {
    heading: string;
    annualToursHeading: string;
    annualToursCount: string;
    annualToursIcon?: string; // Optional icon for achievement stat
    totalParticipantsHeading: string;
    totalParticipantsCount: string;
    totalParticipantsIcon?: string; // Optional icon for achievement stat
    nationalityDiversityHeading: string;
    nationalityDiversityCount: string;
    nationalityDiversityIcon?: string; // Optional icon for achievement stat
    reviewRatingHeading: string;
    averageRating: string;
    platformReviewsHeading: string;
    platformReviews: PlatformReview[];
  };
  media: {
    heading: string;
    mentions: MediaMention[];
  };
  collaborations: {
    heading: string;
    list: CollaborationItem[];
  };
   implementedToursSummary: {
       heading: string;
       description?: string;
       tourHighlights: TourHighlight[];
   };
  team: {
     title: string;
     members: any[]; // Using any[] for simplicity based on original code structure
  };
  contact: {
    title: string;
    buttonLabel: string;
  };
   recruitLink: {
       text: string;
       url: string;
   };
}


const Company: React.FC = () => {
  // Use useTranslation just for simple strings defined in public/locales/company.json
  // and to get the current language (i18n.language)
  const { t, i18n } = useTranslation('company'); // Keep this for t('header') etc.

  // State to hold the fetched company data from the data file
  const [companyData, setCompanyData] = useState<CompanyTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Use useEffect to fetch the company data from the language-specific data file
  useEffect(() => {
      setLoading(true);
      setError(null);
      // Dynamic import from src/data/[language]/companyData.json
      import(`../../data/${i18n.language}/company.json`)
          .then((data) => {
              setCompanyData(data.default);
              setLoading(false);
          })
          .catch((err) => {
              console.error(`Error loading company data for ${i18n.language}:`, err);
              setError('Failed to load company information.'); // Set error on fetch failure
              setLoading(false); // Set loading to false even on error
          });
  }, [i18n.language]); // Re-run effect when language changes


  // Show loading state while data is being fetched
  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography>Loading company information...</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  // Handle case where data might not be available after loading (e.g., error)
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

  // If not loading and no error, but data is still null, means data file was empty or missing default export
   if (!companyData) {
       return (
            <>
             <Header />
             <Container maxWidth="md" sx={{ py: 8 }}>
               <Typography color="error">Company data not found.</Typography>
             </Container>
             <Footer />
           </>
       );
   }


  // Destructure companyData after it's confirmed to be loaded
  // Note: Using optional chaining ?. for safer access to nested properties
  const { header, message, philosophy, profile, achievements, media, collaborations, implementedToursSummary, team, contact, recruitLink } = companyData;


  return (
    <>
    <Header />

    {/* Hero Section */}
    <Box
        className={styles.heroSection}
        sx={{
            position: 'relative',
            height: { xs: '30vh', md: '40vh' }, // Smaller height for phones
            background: `url('/assets/images/company/company_hero_bg.jpg') center/cover no-repeat` // Ensure this image exists
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
            {/* Use t for header if it's in public/locales/company.json */}
            {t('header')} {/* Or {header} if header is from companyData.json */}
            </Typography>
        </Box>
    </Box>

    {/* Representative's Message Section - Added */}
    {message?.heading && ( // Use optional chaining ?. for safer access to nested properties
        <Box className={styles.section} sx={{ py: 8 }}>
            <Container maxWidth="md">
                <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 4, textAlign: 'center' }}>
                    {message.heading}
                </Typography>
                {/* Box for photo and text layout */}
                <Box className={styles.messageContent}>
                     {/* Founder's Photo */}
                     {message.photo && (
                         <img
                             src={message.photo}
                             alt={profile?.representative || 'Representative'} // Use representative name from profile as alt text
                             className={styles.founderPhoto}
                         />
                     )}
                    {/* Box for Text Content */}
                    <Box className={styles.messageText}>
                         {message.paragraph1 && (
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                  {message.paragraph1}
                              </Typography>
                         )}
                         {message.paragraph2 && (
                              <Typography variant="body1">
                                  {message.paragraph2}
                              </Typography>
                         )}
                         {/* Removed Iconography from here */}
                    </Box>
                </Box>
            </Container>
        </Box>
    )}

    {/* Mission, Vision, Values Section - Repurposed Mission Section */}
     {philosophy?.heading && ( // Use optional chaining
        <Box className={styles.section} sx={{ py: 8, backgroundColor: '#f7f7f7' }}>
            <Container maxWidth="md">
                <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
                    {philosophy.heading}
                </Typography>

                {/* Mission */}
                 {philosophy.missionHeading && ( // Use optional chaining
                    <Typography variant="h5" component="h3" sx={{ color: '#333', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                        {philosophy.missionHeading}
                    </Typography>
                 )}
                 {philosophy.missionText && ( // Use optional chaining
                     <Typography variant="body1" sx={{ color: '#555', mb: 4, textAlign: 'center' }}>
                        {philosophy.missionText}
                    </Typography>
                 )}

                 {/* Vision */}
                  {philosophy.visionHeading && ( // Use optional chaining
                     <Typography variant="h5" component="h3" sx={{ color: '#333', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                        {philosophy.visionHeading}
                    </Typography>
                 )}
                 {philosophy.visionText && ( // Use optional chaining
                    <Typography variant="body1" sx={{ color: '#555', mb: 4, textAlign: 'center' }}>
                       {philosophy.visionText}
                   </Typography>
                 )}

                 {/* Values */}
                  {philosophy.values && philosophy.values.length > 0 && ( // Conditional rendering
                     <Box>
                         {philosophy.valuesHeading && ( // Use optional chaining
                             <Typography variant="h5" component="h3" sx={{ color: '#333', fontWeight: 600, mb: 3, textAlign: 'center' }}>
                                 {philosophy.valuesHeading}
                             </Typography>
                         )}
                         <Grid2 container spacing={4} justifyContent="center">
                             {philosophy.values.map((value, index) => (
                                 <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                     <Box className={styles.valueItem}>
                                         {/* Optional icon for value item */}
                                          {value.icon && (
                                              <img src={value.icon} alt={`${value.title} icon`} className={styles.valueIcon} />
                                          )}
                                         <Typography variant="h6" sx={{ color: '#c00', fontWeight: 700, mb: 1 }}>
                                             {value.title}
                                         </Typography>
                                         <Typography variant="body2" sx={{ color: '#555' }}>
                                             {value.description}
                                         </Typography>
                                     </Box>
                                 </Grid2>
                             ))}
                         </Grid2>
                     </Box>
                  )}
            </Container>
        </Box>
     )}


    {/* Company Profile Section - Expanded About Section */}
    {profile?.heading && ( // Use optional chaining
        <Box className={styles.section} sx={{ backgroundColor: '#f9f9f9', py: { xs: 4, md: 8 } }}>
            <Container maxWidth="md">
                <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: { xs: 2, md: 4 }, textAlign: 'center' }}>
                    {profile.heading}
                </Typography>
                 <Grid2 container spacing={2}>
                     {profile.companyName && ( // Conditional rendering
                          <Grid2　size={{ xs: 12}}>
                              <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Company Name:</strong> {profile.companyName}
                              </Typography>
                          </Grid2>
                     )}
                     {profile.representative && ( // Conditional rendering
                         <Grid2　size={{ xs: 12}}>
                             <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Representative:</strong> {profile.representative}
                             </Typography>
                         </Grid2>
                     )}
                     {profile.establishmentDate && ( // Conditional rendering
                         <Grid2　size={{ xs: 12}}>
                             <Typography variant="body1" sx={{ mb: 1 }}>
                                 <strong>Establishment:</strong> {profile.establishmentDate}
                             </Typography>
                         </Grid2>
                     )}
                     {profile.address && ( // Conditional rendering
                         <Grid2　size={{ xs: 12}}>
                             <Typography variant="body1" sx={{ mb: 1 }}>
                                 <strong>Location:</strong> {profile.address}
                             </Typography>
                         </Grid2>
                     )}
                     {profile.businessActivities && ( // Conditional rendering
                         <Grid2　size={{ xs: 12}}>
                             <Typography variant="body1" sx={{ mb: 1 }}>
                                 <strong>Business Activities:</strong> {profile.businessActivities}
                             </Typography>
                         </Grid2>
                     )}
                     {profile.email && ( // Conditional rendering
                         <Grid2　size={{ xs: 12}}>
                             <Typography variant="body1" sx={{ mb: 1 }}>
                                 <strong>Email:</strong> {profile.email}
                             </Typography>
                         </Grid2>
                     )}
                     {profile.phone && ( // Conditional rendering
                         <Grid2　size={{ xs: 12}}>
                             <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Phone:</strong> {profile.phone}
                             </Typography>
                         </Grid2>
                     )}

                      {profile.transactionPlatforms && profile.transactionPlatforms.length > 0 && ( // Conditional rendering
                          <Grid2　size={{ xs: 12}}>
                              {profile.transactionPlatformsHeading && ( // Conditional rendering
                                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 700 }}>
                                      {profile.transactionPlatformsHeading}:
                                  </Typography>
                              )}
                              <Box className={styles.platformLogos}>
                                  {profile.transactionPlatforms.map((platform, index) => (
                                      <MuiLink href={platform.link} target="_blank" rel="noopener noreferrer" key={index}>
                                          <img src={platform.logo} alt={platform.name} className={styles.platformLogo} />
                                      </MuiLink>
                                  ))}
                              </Box>
                          </Grid2>
                      )}

                       {profile.registrationNumber && ( // Conditional rendering
                           <Grid2　size={{ xs: 12}}>
                               {profile.registrationHeading && ( // Conditional rendering
                                   <Typography variant="body1" sx={{ mt: 2 }}>
                                       <strong>{profile.registrationHeading}:</strong> {profile.registrationNumber}
                                   </Typography>
                               )}
                           </Grid2>
                       )}
                 </Grid2>
            </Container>
        </Box>
    )}

     {/* Achievements & Statistics Section - Added */}
      {achievements?.heading && ( // Use optional chaining
         <Box className={styles.section} sx={{ py: 8 }}>
             <Container maxWidth="md">
                 <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
                     {achievements.heading}
                 </Typography>
                 <Grid2 container spacing={4} justifyContent="center">
                     {/* Annual Tours */}
                     {achievements.annualToursCount && ( // Conditional rendering
                          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                              <Box className={styles.achievementStat}>
                                  {achievements.annualToursIcon && ( // Optional icon for achievement stat
                                       <img src={achievements.annualToursIcon} alt={achievements.annualToursHeading || 'Achievement icon'} className={styles.achievementIcon} />
                                  )}
                                  {achievements.annualToursCount && ( // Conditional rendering
                                      <Typography variant="h5" sx={{ color: '#333', fontWeight: 700 }}>
                                          {achievements.annualToursCount}
                                      </Typography>
                                  )}
                                  {achievements.annualToursHeading && ( // Conditional rendering
                                      <Typography variant="body2" sx={{ color: '#555' }}>
                                          {achievements.annualToursHeading}
                                      </Typography>
                                  )}
                              </Box>
                          </Grid2>
                     )}
                     {/* Total Participants */}
                      {achievements.totalParticipantsCount && ( // Conditional rendering
                          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                              <Box className={styles.achievementStat}>
                                   {achievements.totalParticipantsIcon && ( // Optional icon for achievement stat
                                       <img src={achievements.totalParticipantsIcon} alt={achievements.totalParticipantsHeading || 'Achievement icon'} className={styles.achievementIcon} />
                                   )}
                                   {achievements.totalParticipantsCount && ( // Conditional rendering
                                      <Typography variant="h5" sx={{ color: '#333', fontWeight: 700 }}>
                                          {achievements.totalParticipantsCount}
                                      </Typography>
                                   )}
                                  {achievements.totalParticipantsHeading && ( // Conditional rendering
                                      <Typography variant="body2" sx={{ color: '#555' }}>
                                          {achievements.totalParticipantsHeading}
                                      </Typography>
                                  )}
                              </Box>
                          </Grid2>
                     )}
                     {/* Nationality Diversity */}
                     {achievements.nationalityDiversityCount && ( // Conditional rendering
                          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                              <Box className={styles.achievementStat}>
                                   {achievements.nationalityDiversityIcon && ( // Optional icon for achievement stat
                                       <img src={achievements.nationalityDiversityIcon} alt={achievements.nationalityDiversityHeading || 'Achievement icon'} className={styles.achievementIcon} />
                                   )}
                                   {achievements.nationalityDiversityCount && ( // Conditional rendering
                                      <Typography variant="h5" sx={{ color: '#333', fontWeight: 700 }}>
                                          {achievements.nationalityDiversityCount}
                                      </Typography>
                                   )}
                                  {achievements.nationalityDiversityHeading && ( // Conditional rendering
                                      <Typography variant="body2" sx={{ color: '#555' }}>
                                          {achievements.nationalityDiversityHeading}
                                      </Typography>
                                  )}
                              </Box>
                          </Grid2>
                     )}
                 </Grid2>

                  {/* Review Ratings */}
                   {(achievements.reviewRatingHeading || achievements.averageRating || (achievements.platformReviews && achievements.platformReviews.length > 0)) && ( // Conditional rendering
                      <Box sx={{ mt: 6 }}>
                           {achievements.reviewRatingHeading && ( // Conditional rendering
                               <Typography variant="h5" component="h3" sx={{ color: '#333', fontWeight: 600, mb: 3, textAlign: 'center' }}>
                                   {achievements.reviewRatingHeading}
                               </Typography>
                           )}
                           {achievements.averageRating && ( // Conditional rendering
                               <Typography variant="h6" sx={{ color: '#000', fontWeight: 700, mb: 2, textAlign: 'center' }}>
                                   Average Rating: {achievements.averageRating}
                               </Typography>
                           )}

                           {achievements.platformReviews && achievements.platformReviews.length > 0 && ( // Conditional rendering
                                <Box>
                                    {achievements.platformReviewsHeading && ( // Conditional rendering
                                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                                            {achievements.platformReviewsHeading}:
                                        </Typography>
                                    )}
                                    <Grid2 container spacing={3} justifyContent="center">
                                        {achievements.platformReviews.map((review, index) => (
                                            <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <MuiLink href={review.link} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                                        <Typography variant="body1" sx={{ color: '#000' }}>
                                                            <strong>{review.platform}:</strong> {review.count} Reviews
                                                        </Typography>
                                                    </MuiLink>
                                                </Box>
                                            </Grid2>
                                        ))}
                                    </Grid2>
                                </Box>
                           )}
                      </Box>
                   )}
             </Container>
         </Box>
      )}

     {/* Media Coverage Section - Added */}
     {media?.heading && media.mentions && media.mentions.length > 0 && ( // Use optional chaining
         <Box className={styles.section} sx={{ py: 8, backgroundColor: '#f7f7f7' }}>
             <Container maxWidth="md">
                 <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
                     {media.heading}
                 </Typography>
                 <Grid2 container spacing={3}>
                     {media.mentions.map((mention, index) => (
                         <Grid2 size={{xs:12}} key={index}>
                             <Box className={styles.mediaMention}>
                                 <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                     {mention.media} - {mention.date}
                                 </Typography>
                                  {mention.description && ( // Conditional rendering
                                     <Typography variant="body2" sx={{ mt: 0.5 }}>
                                         {mention.description}
                                     </Typography>
                                  )}
                                   {mention.link && ( // Conditional rendering
                                      <MuiLink href={mention.link} target="_blank" rel="noopener noreferrer" variant="body2" sx={{ display: 'block', mt: 0.5 }}>
                                          Read More
                                      </MuiLink>
                                   )}
                             </Box>
                         </Grid2>
                     ))}
                 </Grid2>
             </Container>
         </Box>
     )}

      {/* Collaboration Achievements Section - Added */}
       {collaborations?.heading && collaborations.list && collaborations.list.length > 0 && ( // Use optional chaining
          <Box className={styles.section} sx={{ py: 8 }}>
              <Container maxWidth="md">
                   <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
                      {collaborations.heading}
                  </Typography>
                  <Grid2 container spacing={3}>
                      {collaborations.list.map((collab, index) => (
                          <Grid2 size={{xs:12}} key={index}>
                              <Box className={styles.collaborationItem}>
                                  <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, mb: 1 }}>
                                      {collab.type}
                                  </Typography>
                                  <Typography variant="body1" sx={{ color: '#555' }}>
                                      {collab.description}
                                  </Typography>
                              </Box>
                          </Grid2>
                      ))}
                  </Grid2>
              </Container>
          </Box>
       )}

       {/* Implemented Tours/Services Summary - Added */}
        {implementedToursSummary?.heading && implementedToursSummary.tourHighlights && implementedToursSummary.tourHighlights.length > 0 && ( // Use optional chaining
           <Box className={styles.section} sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
               <Container maxWidth="md">
                   <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
                       {implementedToursSummary.heading}
                   </Typography>
                   {implementedToursSummary.description && ( // Conditional rendering
                       <Typography variant="body1" sx={{ color: '#555', mb: 4, textAlign: 'center' }}>
                           {implementedToursSummary.description}
                       </Typography>
                   )}
                   <Grid2 container spacing={3} justifyContent="center">
                       {implementedToursSummary.tourHighlights.map((highlight, index) => (
                           <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
                               <Box className={styles.tourHighlightItem}>
                                   <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, mb: 1 }}>
                                       {highlight.name}
                                   </Typography>
                                   {highlight.stats && ( // Conditional rendering
                                       <Typography variant="body2" sx={{ color: '#555' }}>
                                           {highlight.stats}
                                       </Typography>
                                   )}
                               </Box>
                           </Grid2>
                       ))}
                   </Grid2>
               </Container>
           </Box>
        )}


    {/* Team Section - Kept
    {team?.title && team.members && team.members.length > 0 && ( // Conditional rendering
        <Box className={styles.section} sx={{ py: 8 }}>
          <Container maxWidth="md">
            <Typography
            variant="h4"
            className={styles.sectionHeading}
            sx={{
                color: '#c00',
                fontWeight: 700,
                mb: 3,
                textAlign: 'center' // Center on all screens
            }}
            >
            {team.title}
            </Typography>

            <Grid2 container spacing={4} justifyContent="center">
              {team.members.map((member) => (
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
                      image={member.photo} // Ensure photo path is correct in JSON
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
    )} */}

    {/* Recruitment Link - Added as an optional section */}
    {recruitLink?.text && recruitLink.url && ( // Use optional chaining
        <Box className={styles.section} sx={{ py: 4, textAlign: 'center', backgroundColor: '#f7f7f7' }}>
            <Container maxWidth="sm">
                 <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#c00',
                        fontSize: { xs: '0.9rem', md: '1.2rem' }, // Smaller on phones
                        padding: { xs: '0.5rem 1.5rem', md: '0.8rem 2rem' } // Compact padding for smaller screens
                    }}
                    component={MuiLink} // Use MuiLink for external link
                    href={recruitLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                 >
                    {recruitLink.text}
                 </Button>
            </Container>
        </Box>
    )}


    {/* Contact Section - Kept
    {contact?.title && contact.buttonLabel && ( // Use optional chaining
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
            component={Link} // Use react-router-dom Link for internal link
            to="/contact"
            >
            {contact.buttonLabel}
            </Button>
        </Container>
        </Box>
    )} */}


    <Footer />
  </>

  );
};

export default Company;