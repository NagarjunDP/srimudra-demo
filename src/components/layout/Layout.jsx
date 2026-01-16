import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import SEO from '../SEO';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <SEO />
            <Header />
            <main className="flex-grow">
                {children}
            </main>

            {/* Floating Social Buttons */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
                {/* Instagram */}
                <a
                    href="https://www.instagram.com/srimudra_events/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-white"
                    aria-label="Follow on Instagram"
                >
                    <FaInstagram size={28} />
                </a>

                {/* WhatsApp */}
                <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border-2 border-white"
                    aria-label="Chat on WhatsApp"
                >
                    <FaWhatsapp size={28} />
                </a>
            </div>

            <Footer />
        </div>
    );
};

export default Layout;
