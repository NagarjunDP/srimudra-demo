import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Gallery = () => {
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", category: "weddings" },
        { id: 2, src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc6?q=80&w=800&auto=format&fit=crop", category: "corporate" },
        { id: 3, src: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=800&auto=format&fit=crop", category: "parties" },
        { id: 4, src: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=800&auto=format&fit=crop", category: "weddings" },
        { id: 5, src: "https://images.unsplash.com/photo-1533174072545-e8d9859f6471?q=80&w=800&auto=format&fit=crop", category: "corporate" },
        { id: 6, src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop", category: "parties" },
    ];

    const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

    return (
        <section id="gallery" className="py-24 bg-light">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-secondary uppercase tracking-[0.3em] text-sm font-bold mb-3">Portfolio</h3>
                    <h2 className="text-4xl md:text-5xl font-serif text-dark font-bold">Our Recent Work</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap"
                >
                    {['all', 'weddings', 'corporate', 'parties'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${filter === cat
                                    ? 'bg-primary text-white shadow-lg transform scale-105'
                                    : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredImages.map((image) => (
                            <motion.div
                                layout
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg aspect-square"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image.src} alt="Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-lg font-serif tracking-widest uppercase border border-white px-6 py-2">View</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-8 right-8 text-white text-4xl hover:text-secondary transition-colors">
                            <FaTimes />
                        </button>
                        <motion.img
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            src={selectedImage.src}
                            alt="Full Screen"
                            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
