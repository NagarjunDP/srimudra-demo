import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import { ModalProvider } from './context/ModalContext';
import GlobalBookingModal from './components/common/GlobalBookingModal';

// Lazy load components for performance
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Gallery = lazy(() => import('./components/Gallery'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const BudgetEstimator = lazy(() => import('./pages/BudgetEstimator'));

function App() {
  return (
    <HelmetProvider>
      <Routes>
        {/* Budget Estimator — standalone page, no main Layout */}
        <Route path="/budget-estimator" element={
          <Suspense fallback={
            <div style={{ background: '#0A0F2C', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 48, height: 48, border: '3px solid #D4AF37', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          }>
            <BudgetEstimator />
          </Suspense>
        } />

        {/* Main home page */}
        <Route path="/" element={
          <ModalProvider>
            <Layout>
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen bg-light">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </div>
              }>
                <Hero />
                <About />
                <Services />
                <Gallery />
                <Testimonials />
                <Contact />
              </Suspense>
              <GlobalBookingModal />
            </Layout>
          </ModalProvider>
        } />
      </Routes>
    </HelmetProvider>
  );
}

export default App;

