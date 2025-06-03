// src/pages/Home/Home.tsx
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Grid2, Card, CardContent, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const backgroundImages = [
  '/assets/images/homepage/hero_bg_1.jpg', // Ensure you have these images
  '/assets/images/homepage/hero_bg_2.jpg',
  '/assets/images/homepage/hero_bg_3.jpg'
];

// Define interfaces for new data structures (Simplified for single-language files)
interface TourItem {
    id: string;
    name: string; // Name is now a simple string (for the language of the file)
    description: string; // Description is now a simple string
    image: string;
    link: string; // Link to tour details page or booking
}

interface ReviewItem {
    id: string;
    rating: number; // e.g., 5 for 5 stars
    comment: string; // Comment is now a simple string
    author?: string; // Optional author or source is now a simple string
}

interface NewsItem {
    id: string;
    date: string;
    tag: string;
    title: string; // Title is now a simple string
    content: string; // Content is now a simple string
    image: string;
}

const Home: React.FC = () => {
  const { t, i18n } = useTranslation(['home']);
  const [bgIndex, setBgIndex] = useState(0);
   const [mainTours, setMainTours] = useState<TourItem[]>([]);
   const [customerReviews, setCustomerReviews] = useState<ReviewItem[]>([]);
   const [newsData, setNewsData] = useState<NewsItem[]>([]);


  // Load main tours data based on current language
  useEffect(() => {
    import(`../../data/${i18n.language}/tourList.json`) // Load based on current language
      .then((data) => {
        setMainTours(data.default);
      })
      .catch((err) => console.error(`Failed to load toursList.${i18n.language}.json`, err));
  }, [i18n.language]); // Re-run when language changes

  // Load customer reviews data based on current language
  useEffect(() => {
     import(`../../data/${i18n.language}/reviewList.json`) // Load based on current language
      .then((data) => {
        setCustomerReviews(data.default);
      })
      .catch((err) => console.error(`Failed to load reviewsList.${i18n.language}.json`, err));
  }, [i18n.language]); // Re-run when language changes


  // Load latest 2 news from data/[language]/newsList.json
  useEffect(() => {
    import(`../../data/${i18n.language}/newsList.json`) // Load based on current language
      .then((data) => {
        const list: NewsItem[] = data.default;
        // sort by date desc if needed, or just slice
        setNewsData(list.slice(0, 2)); // latest 2
      })
      .catch((err) => console.error(`Failed to load newsList.${i18n.language}.json`, err));
  }, [i18n.language]); // Re-run when language changes


  // Transition every 4 seconds for hero background
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <>
      <Header />

      {/* Hero Section - Updated */}
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
            {/* Dark overlay */}
             <Box className={styles.heroOverlay}></Box>
          </Box>
        ))}

        {/* Hero Content (Centered) */}
        <Box className={styles.heroContent}>
          <Container maxWidth="md">
            {/* Catchphrase */}
            <Typography variant="h3" component="h1" sx={{ color: '#fff', fontWeight: 700, textAlign: 'center' }}>
              {t('hero.catchphrase')}
            </Typography>
             {/* Optional: Sub-catchphrase or brief descriptor */}
            <Typography variant="h5" sx={{ color: '#fff', marginTop: 2, textAlign: 'center' }}>
                {t('hero.subCatchphrase')}
             </Typography>
            {/* Optional: Hero CTA Button */}
             <Box textAlign="center" sx={{ marginTop: 4 }}>
                 <Button
                     variant="contained"
                     color="primary" // Use theme primary color
                     size="large"
                     component={Link}
                     to="/business" // Link to tours page
                     sx={{ backgroundColor: '#c00', '&:hover': { backgroundColor: '#a00' } }} // Custom style
                 >
                     {t('hero.ctaButton')}
                 </Button>
             </Box>
          </Container>
        </Box>

        {/* Hero Rating Signal - Added */}
        <Box className={styles.heroRatingSignal}>
            <img src="/assets/icons/tripadvisor.svg" alt="TripAdvisor" className={styles.heroTripadvisorIcon} />
            {/* You can use a static value or fetch a dynamic rating */}
            <Rating value={5} readOnly size="small" sx={{ color: '#FFD700', mb: 0.5 }} /> {/* Gold color for stars */}
            <Typography variant="caption" sx={{ color: '#fff', textAlign: 'center', fontSize:"1.1rem" }}>
                {t('hero.ratingText')} {/* Translation key for the text */}
            </Typography>
        </Box>

      </Box>


      {/* Main Tours Introduction */}
       <Container maxWidth="lg" sx={{ py: 8 }}>
            {/* Added class for bigger font */}
            <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
              {t('mainTours.heading')}
            </Typography>
            {/* Check if tours data is loaded before mapping */}
             {mainTours && mainTours.length > 0 ? (
                <Grid2 container spacing={4} justifyContent="center">
                  {mainTours.map((tour) => (
                    <Grid2 size={{xs:12, sm:6, md:4}} key={tour.id}> {/* Responsive grid for tours */}
                      <Card className={styles.tourCard}>
                         <img
                            src={tour.image}
                            alt={tour.name} // Use simple string alt text
                            className={styles.tourImage}
                         />
                        <CardContent>
                          <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 700 }}>
                            {tour.name} {/* Use simple string name */}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
                             {tour.description} {/* Use simple string description */}
                          </Typography>
                          <Button
                            variant="outlined"
                             sx={{ color: '#c00', borderColor: '#c00' }}
                            component={Link}
                            to={tour.link} // Link to individual tour page
                          >
                            {t('mainTours.learnMoreButton')}
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid2>
                  ))}
                </Grid2>
             ) : (
                 // Optional: Loading state or message if tours don't load
                 <Typography variant="body1" textAlign="center">
                    {t('mainTours.loadingError')}
                 </Typography>
             )}
             {/* Optional: View All Tours Button */}
             <Box textAlign="center" sx={{ marginTop: 6 }}>
                 <Button
                     variant="contained"
                     sx={{ backgroundColor: '#c00', '&:hover': { backgroundColor: '#a00' } }}
                     component={Link}
                     to="/business" // Link to the main business/tours page
                 >
                     {t('mainTours.viewAllButton')}
                 </Button>
             </Box>
       </Container>

       {/* Brand Slogan / Introduction */}
      <Box className={styles.sloganSection}> {/* Added wrapper Box */}
         <Container maxWidth="md" sx={{ textAlign: 'center' }}> {/* Removed py here */}
             <Typography variant="h4" component="h2" sx={{ color: '#333', fontWeight: 600, mb: 2 }}> {/* Changed variant to h4 */}
                 {t('slogan.heading')}
             </Typography>
             <Typography variant="body1" sx={{ color: '#555', fontSize: "1.2rem" }}>
                 {t('slogan.text')}
             </Typography>
         </Container>
       </Box>

       {/* Customer Reviews / Testimonials */}
        <Box sx={{ py: 8, backgroundColor: '#f9f9f9' }}> {/* Grey background band */}
            <Container maxWidth="lg">
                 {/* Added class for bigger font */}
                 <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
                   {t('reviews.heading')}
                 </Typography>
                 {customerReviews && customerReviews.length > 0 ? (
                     <Grid2 container spacing={4} justifyContent="center">
                         {customerReviews.map(review => (
                             <Grid2 size={{xs:12, sm:6, md:4}} key={review.id}> {/* Responsive grid for reviews */}
                                 <Card className={styles.reviewCard}>
                                     <CardContent>
                                         {/* Star Rating */}
                                         <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
                                         {/* Review Comment */}
                                         <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                                            "{review.comment}" {/* Use simple string comment */}
                                         </Typography>
                                         {/* Optional: Author/Source */}
                                          {review.author && (
                                             <Typography variant="body2" sx={{ textAlign: 'right', color: '#777' }}>
                                                 - {review.author} {/* Use simple string author */}
                                             </Typography>
                                          )}
                                     </CardContent>
                                 </Card>
                             </Grid2>
                         ))}
                     </Grid2>
                 ) : (
                     <Typography variant="body1" textAlign="center">
                         {t('reviews.loadingError')}
                     </Typography>
                 )}
                 {/* Optional: Link to Review Site (e.g., TripAdvisor) */}
                  <Box textAlign="center" sx={{ marginTop: 6 }}>
                      <Button
                           variant="outlined"
                           sx={{ color: '#c00', borderColor: '#c00' }}
                           href="YOUR_TRIPADVISOR_LINK" // Replace with your actual link
                           target="_blank"
                           rel="noopener noreferrer"
                       >
                           {t('reviews.viewAllButton')}
                       </Button>
                   </Box>
            </Container>
        </Box>


       {/* Operating Company / Story Introduction */}
       <Box className={styles.storySection}> {/* Added wrapper Box */}
         <Container maxWidth="md"> {/* Removed py here */}
             {/* Added class for bigger font */}
             <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 4, textAlign: 'center' }}>
               {t('companyStory.heading')}
             </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize:"1.2rem" }}>
                {t('companyStory.paragraph1')}
              </Typography>
               <Typography variant="body1" sx={{fontSize:"1.2rem" }}>
                {t('companyStory.paragraph2')}
              </Typography>
              {/* Optional: Link to full Company page */}
               <Box textAlign="center" sx={{ marginTop: 4 }}>
                   <Button
                       variant="outlined"
                       sx={{ color: '#c00', borderColor: '#c00' }}
                       component={Link}
                       to="/company"
                   >
                       {t('companyStory.learnMoreButton')}
                   </Button>
               </Box>
         </Container>
        </Box>


      {/* News Section - Kept as is, accessing translated title */}
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
                  {/* Use simple string title */}
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    {item.title}
                  </Typography>
                  <Button
                    variant="text"
                    component={Link}
                    to={`/news/${item.id}`}
                    sx={{ color: '#c00', fontWeight: 700 }}
                  >
                    Read More {/* This button text is not translated here, you might want to add it to home.json */}
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
            View All {/* This button text is not translated here, you might want to add it to home.json */}
          </Button>
        </Box>
      </Container>

      {/* Recruit Section - Kept as is */}
        <Container maxWidth="lg" disableGutters sx={{ py: 8 }}>
        {/* Outer container has normal background */}
        <Box
            className={styles.recruitBox}
            sx={{
            background: `url('/assets/images/homepage/recruit_people_bg.jpg') center/cover no-repeat`, // Ensure you have this image
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

      {/* Contact Section - Kept as is, serves as a CTA */}
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