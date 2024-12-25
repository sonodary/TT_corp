// src/routes/AppRouter.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Company from '../pages/Company/Company';
import Business from '../pages/Business/Business';
import NewsList from '../pages/News/NewsList';
import NewsDetail from '../pages/News/NewsDetail';
import Recruit from '../pages/Recruit/Recruit';
import Contact from '../pages/Contact/Contact';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/business" element={<Business />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:newsId" element={<NewsDetail />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
