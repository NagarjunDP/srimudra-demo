import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const stats = [
        { number: "500+", label: "Events Created" },
        { number: "50+", label: "Venues Partnered" },
        { number: "5.0", label: "Star Rating" },
        { number: "10+", label: "Years Experience" }
    ];

    return (
        <section id="about" className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Image Grid with Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 grid grid-cols-2 gap-4"
                    >
                        <div className="space-y-4 mt-8">
                            <img src="https://images.unsplash.com/photo-1519225469958-305e68780cf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Wedding Decor" className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500" />
                            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Corporate Event" className="rounded-2xl shadow-lg w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="space-y-4">
                            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Party Vibes" className="rounded-2xl shadow-lg w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500" />
                            <img src="https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Elegant Dining" className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500" />
                        </div>
                    </motion.div>

                    {/* Text Content with Staggered Reveal */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2"
                    >
                        <h3 className="text-secondary uppercase tracking-widest text-sm font-bold mb-4">About Srimudra</h3>
                        <h2 className="text-4xl md:text-5xl font-serif text-dark font-bold mb-6 leading-tight">
                            We Don't Just Plan Events, <br /> We Design <span className="italic text-primary">Experiences.</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            At Srimudra Events, we believe every celebration tells a story. From intimate gatherings to grand royal weddings in Hyderabad, our team of passionate designers and planners work tirelessly to bring your vision to life with flawless execution.
                        </p>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Our signature style blends traditional elegance with modern sophistication, ensuring that your special day is not only beautiful but also unforgettable.
                        </p>

                        {/* Stats Animation */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                                    className="text-center"
                                >
                                    <h4 className="text-3xl font-bold text-dark font-serif">{stat.number}</h4>
                                    <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
