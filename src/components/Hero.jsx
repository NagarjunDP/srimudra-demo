import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useModal } from '../context/ModalContext';

const Hero = () => {
    const { openModal } = useModal();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Parallax & Scroll Effects
    const { scrollY } = useScroll();
    const textY = useTransform(scrollY, [0, 500], [0, 200]);
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const textScale = useTransform(scrollY, [0, 500], [1, 1.2]); // Text zooms IN towards user

    // High-Quality Images (Vajra Style)
    const images = [
        "/WhatsApp Image 2026-01-16 at 10.52.44.jpeg",
        "/WhatsApp Image 2026-01-16 at 10.52.45 (1).jpeg",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2698&auto=format&fit=crop", // Wedding
        "/WhatsApp Image 2026-01-16 at 10.52.45.jpeg",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop" // Party
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Faster rotation (5s) for dynamic feel
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black perspective-1000">

            {/* Slideshow Background - Seamless Crossfade */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }} // Seamless overlap
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${images[currentImageIndex]}')`,
                        filter: 'brightness(0.60)' // Slightly darker for premium text pop
                    }}
                >
                    {/* Gradient Overlay integrated for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                </motion.div>
            </AnimatePresence>

            {/* Content - Parallax 3D Effect */}
            <motion.div
                style={{ y: textY, opacity: textOpacity, scale: textScale }}
                className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full text-center mt-10 origin-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className="text-secondary tracking-[0.3em] uppercase text-sm md:text-xl font-bold mb-6 drop-shadow-md">
                        Your Vision, Our Passion
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-white mb-8 drop-shadow-2xl leading-[1.1] tracking-tight">
                        Every Event <br className="hidden md:block" />
                        <span className="italic font-heading font-normal text-secondary">Tells a Story.</span> <br />
                        Let's Create Yours.
                    </h1>
                    <p className="text-gray-100 text-lg md:text-2xl font-light tracking-wide mb-12 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
                        From intimate gatherings to royal weddings, we craft moments that last a lifetime.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(226, 7, 125, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openModal}
                        className="bg-secondary text-white px-12 py-5 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-xl"
                    >
                        Start Planning
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
            </motion.div>

        </section>
    );
};

export default Hero;
