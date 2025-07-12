// src/pages/Team/Team.tsx
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid2, Card, CardMedia, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import styles from './Team.module.scss';

// Define interfaces for team member data
interface TeamMember {
    id: string;
    name: string;
    position: string;
    intro: string; // Brief introduction, ~4 sentences
    photo: string; // Path to profile picture
}

// Define interface for team page translations data
interface TeamTranslations {
    header: string;
    introSection: {
        heading: string;
        paragraph1: string;
        paragraph2: string;
    };
    coreMembersSection: {
        heading: string;
        members: TeamMember[];
    };
    guidesSection: {
        heading: string;
        members: TeamMember[];
    };
}

const Team: React.FC = () => {
    const { t, i18n } = useTranslation('team'); // "team" namespace
    const [teamData, setTeamData] = useState<TeamTranslations | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        // Dynamically import team data based on the current language
        import(`../../data/${i18n.language}/team.json`)
            .then((data) => {
                setTeamData(data.default);
                setLoading(false);
            })
            .catch((err) => {
                console.error(`Error loading team data for ${i18n.language}:`, err);
                setError('Failed to load team information.');
                setLoading(false);
            });
    }, [i18n.language]); // Re-run effect when language changes

    if (loading) {
        return (
            <>
                <Header />
                <Container maxWidth="md" sx={{ py: 8 }}>
                    <Typography>Loading team information...</Typography>
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

    if (!teamData) {
        return (
            <>
                <Header />
                <Container maxWidth="md" sx={{ py: 8 }}>
                    <Typography color="error">Team data not found.</Typography>
                </Container>
                <Footer />
            </>
        );
    }

    const { header, introSection, coreMembersSection, guidesSection } = teamData;

    return (
        <>
            <Header />

            {/* Hero Section (common for most pages) */}
            <Box
                className={styles.heroSection}
                sx={{
                    position: 'relative',
                    height: { xs: '30vh', md: '40vh' },
                    background: `url('/assets/images/team/team_hero_bg.jpg') center/cover no-repeat` // Ensure this image exists
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
                            fontSize: { xs: '2rem', md: '3rem' },
                            textAlign: 'center'
                        }}
                    >
                        {header}
                    </Typography>
                </Box>
            </Box>

            {/* Brief Intro Section */}
            {introSection && (
                <Box className={styles.section} sx={{ py: 8 }}>
                    <Container maxWidth="md" className={styles.introContent}>
                        <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 4, textAlign: 'center' }}>
                            {introSection.heading}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {introSection.paragraph1}
                        </Typography>
                        <Typography variant="body1">
                            {introSection.paragraph2}
                        </Typography>
                    </Container>
                </Box>
            )}

            {/* Core Members Section */}
            {coreMembersSection && coreMembersSection.members && coreMembersSection.members.length > 0 && (
                <Box className={styles.section} sx={{ py: 8, backgroundColor: '#f7f7f7' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
                            {coreMembersSection.heading}
                        </Typography>
                        <Grid2 container spacing={4} justifyContent="center">
                            {coreMembersSection.members.map((member) => (
                                <Grid2 size={{ xs: 12, sm: 6, md: 6 }} key={member.id}> {/* 4 members per row on md+ */}
                                    <Card className={styles.memberCard}>
                                        <CardMedia
                                            component="img"
                                            image={member.photo}
                                            alt={member.name}
                                            className={styles.memberPhoto}
                                        />
                                        <CardContent className={styles.memberCardContent}>
                                            <Typography variant="h6" component="h3" className={styles.memberName}>
                                                {member.name}
                                            </Typography>
                                            <Typography variant="subtitle1" className={styles.memberPosition}>
                                                {member.position}
                                            </Typography>
                                            <Typography variant="body2" className={styles.memberIntro}>
                                                {member.intro}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Container>
                </Box>
            )}

            {/* Guides Section */}
            {guidesSection && guidesSection.members && guidesSection.members.length > 0 && (
                <Box className={styles.section} sx={{ py: 8 }}>
                    <Container maxWidth="lg">
                        <Typography variant="h4" component="h2" className={styles.sectionHeading} sx={{ color: '#c00', fontWeight: 700, mb: 6, textAlign: 'center' }}>
                            {guidesSection.heading}
                        </Typography>
                        <Grid2 container spacing={4} justifyContent="center">
                            {guidesSection.members.map((member) => (
                                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={member.id}> {/* 3 guides per row on md+ */}
                                    <Card className={styles.memberCard}>
                                        <CardMedia
                                            component="img"
                                            image={member.photo}
                                            alt={member.name}
                                            className={styles.memberPhoto}
                                        />
                                        <CardContent className={styles.memberCardContent}>
                                            <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                {member.name}
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ color: '#c00', mb: 1.5 }}>
                                                {member.position}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#555' }}>
                                                {member.intro}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Container>
                </Box>
            )}

            <Footer />
        </>
    );
};

export default Team;