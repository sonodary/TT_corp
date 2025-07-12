// src/pages/News/NewsDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

// Define the interface for NewsItem based on the single-language JSON structure
interface NewsItem {
  id: string;
  date: string;
  tag: string;
  title: string; // Title is now a simple string
  content: string; // Content is now a simple string
  image: string;
}

const NewsDetail: React.FC = () => {
  const { newsId } = useParams();
  // No longer need 'news' namespace if translations are handled by data file
  const { i18n } = useTranslation(); // Use useTranslation just for i18n.language
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    setError(null);
    // Dynamically import the news list based on the current language
    import(`../../data/${i18n.language}/newsList.json`)
      .then((mod) => {
        const allNews: NewsItem[] = mod.default;
        const foundItem = allNews.find((n) => n.id === newsId);

        if (foundItem) {
          setNewsItem(foundItem);
        } else {
          setError('News item not found.'); // Set error if item is not found
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error loading news detail for ${newsId} in ${i18n.language}:`, err);
        setError('Failed to load news item.'); // Set error on fetch failure
        setLoading(false);
      });
  }, [newsId, i18n.language]); // Re-run effect when newsId or language changes

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography>Loading news item...</Typography>
        </Container>
        <Footer />
      </>
    );
  }

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

  if (!newsItem) {
       // Should ideally not reach here if error is handled, but as a fallback
       return (
            <>
             <Header />
             <Container maxWidth="md" sx={{ py: 8 }}>
               <Typography>News item not found.</Typography>
             </Container>
             <Footer />
           </>
       );
  }


  const { date, tag, title, content, image } = newsItem;

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Date in top-left corner approach */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: '#c00', flexShrink: 0 }}
          >
            {date}
          </Typography>
          <Box>
            {/* Access title directly */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {tag}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <img
            src={image}
            alt={title} // Use simple string title for alt text
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </Box>
        {/* Access content directly */}
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {content}
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default NewsDetail;