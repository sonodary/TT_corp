// src/components/Layout/Header.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

const navLinks = [
  { to: '/company', key: 'nav.company' },
  { to: '/business', key: 'nav.business' },
  { to: '/news', key: 'nav.news' },
  { to: '/recruit', key: 'nav.recruit' },
  { to: '/contact', key: 'nav.contact' }
];

const Header: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation(['header']);
  const [mobileOpen, setMobileOpen] = useState(false);

  // For a "fixed" header that stays on top even when scrolling,
  // We'll use MUI's position='fixed'
  // Additional background images can be controlled in CSS using location.pathname
  // or advanced theming for each route.

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#c00',
        color: 'white',
        padding: 2
      }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List sx={{ marginTop: 8 }}>
        {navLinks.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              component={Link}
              to={item.to}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText
                primary={t(item.key)}
                primaryTypographyProps={{ fontSize: 18, fontWeight: 700 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button
          variant="outlined"
          sx={{ color: '#fff', borderColor: '#fff', marginRight: 1 }}
          onClick={() => changeLanguage('en')}
        >
          {t('languageSwitch.en')}
        </Button>
        <Button
          variant="outlined"
          sx={{ color: '#fff', borderColor: '#fff' }}
          onClick={() => changeLanguage('ja')}
        >
          {t('languageSwitch.ja')}
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar position="fixed" className={styles.customAppBar}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Box display="flex" alignItems="center">
          <Link to="/">
            <img src='assets/images/logo.jpg' alt={t('logoAlt')} className={styles.logo} />
          </Link>
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
        >
          {navLinks.map((item) => (
            <Button
              key={item.key}
              component={Link}
              to={item.to}
              sx={{ color: 'white', fontWeight: 700, marginRight: 2 }}
            >
              {t(item.key)}
            </Button>
          ))}

          {/* Language Buttons */}
          <Button
            variant="outlined"
            sx={{ color: '#fff', borderColor: '#fff', marginRight: 1 }}
            onClick={() => changeLanguage('en')}
          >
            {t('languageSwitch.en')}
          </Button>
          <Button
            variant="outlined"
            sx={{ color: '#fff', borderColor: '#fff' }}
            onClick={() => changeLanguage('ja')}
          >
            {t('languageSwitch.ja')}
          </Button>
        </Box>

        {/* Mobile Hamburger */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ style: { backgroundColor: '#c00' } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
