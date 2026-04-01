import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Work } from './pages/Work';
import { CaseStudies } from './pages/CaseStudies';
import { Divisions } from './pages/Divisions';
import { Products } from './pages/Products';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { BlogPage } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { ImageLibrary } from './pages/admin/ImageLibrary';
import { BlogManager } from './pages/admin/BlogManager';
import { BlogEditor } from './pages/admin/BlogEditor';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';

import './index.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/divisions" element={<Divisions />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <HelmetProvider>
          <ThemeProvider>
            <AuthProvider>
              <ScrollToTop />
              <div className="text-zinc-900 dark:text-zinc-100 bg-nothing-paper dark:bg-nothing-dark min-h-screen transition-colors duration-300">
                <Routes>
                  {/* Admin Routes - No Layout */}
                  <Route path="/adminofthegenrecai" element={<AdminLogin />} />
                  <Route path="/adminofthegenrecai/dashboard" element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<Dashboard />} />
                    <Route path="images" element={<ImageLibrary />} />
                    <Route path="blogs" element={<BlogManager />} />
                    <Route path="blogs/new" element={<BlogEditor />} />
                    <Route path="blogs/edit/:id" element={<BlogEditor />} />
                  </Route>

                  {/* Public Routes - With Layout */}
                  <Route element={<Layout />}>
                    <Route path="/*" element={<AnimatedRoutes />} />
                  </Route>
                </Routes>
              </div>
            </AuthProvider>
          </ThemeProvider>
        </HelmetProvider>
      </Router>
    </>
  );
};

export default App;