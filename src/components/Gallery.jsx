import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCamera } from 'react-icons/fa';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('All');

    const images = [
        { id: 1, src: 'https://images.unsplash.com/photo-1519225468063-5078d2284ea1?q=80&w=2574&auto=format&fit=crop', category: 'Weddings', alt: 'Wedding Mandap Decoration Hyderabad' },
        { id: 2, src: 'https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=2670&auto=format&fit=crop', category: 'Birthdays', alt: 'Birthday Party Decoration' },
        { id: 3, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2669&auto=format&fit=crop', category: 'Corporate', alt: 'Corporate Event Setups' },
        { id: 4, src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2670&auto=format&fit=crop', category: 'Weddings', alt: 'Wedding Reception Stage' },
        { id: 5, src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc6?q=80&w=2669&auto=format&fit=crop', category: 'Birthdays', alt: 'Kids Birthday Theme' },
        { id: 6, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2612&auto=format&fit=crop', category: 'Corporate', alt: 'Conference Hall Arrangement' },
        // Add more placeholders as needed
    ];

    const categories = ['All', 'Weddings', 'Birthdays', 'Corporate'];

    const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-primary font-sans font-bold tracking-wider uppercase mb-2">Our Work</h2>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-8">Memories We've Crafted</h3>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300 ${filter === cat
                                        ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                        : 'bg-transparent text-gray-500 border-gray-300 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredImages.map((image) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                key={image.id}
                                className="relative group overflow-hidden rounded-xl cursor-pointer shadow-md aspect-w-4 aspect-h-3"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="object-cover w-full h-64 lg:h-80 transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-white text-center p-4">
                                        <FaCamera size={30} className="mx-auto mb-2" />
                                        <p className="font-serif font-bold text-lg">{image.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <button
                                className="absolute top-6 right-6 text-white text-4xl hover:text-primary transition-colors focus:outline-none"
                                onClick={() => setSelectedImage(null)}
                            >
                                <FaTimes />
                            </button>
                            <motion.img
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-[90vh] rounded shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="absolute bottom-6 left-0 w-full text-center text-white p-4">
                                <h3 className="text-xl font-serif">{selectedImage.alt}</h3>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Gallery;
