import React, { Suspense, lazy } from 'react';
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

function App() {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
}

export default App;
