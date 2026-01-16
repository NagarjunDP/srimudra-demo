import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaSmile } from 'react-icons/fa';

const About = () => {
    const stats = [
        { icon: <FaAward size={40} />, number: '100+', label: 'Events Organized' },
        { icon: <FaUsers size={40} />, number: '500+', label: 'Happy Clients' },
        { icon: <FaSmile size={40} />, number: '5-Star', label: 'Customer Rating' },
    ];

    return (
        <section id="about" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Grid */}
                    <div className="w-full md:w-1/2">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop"
                                alt="Wedding decoration"
                                className="rounded-lg shadow-lg w-full h-64 object-cover transform translate-y-8"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop"
                                alt="Event planning"
                                className="rounded-lg shadow-lg w-full h-64 object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-primary font-sans font-bold tracking-wider uppercase mb-2">About Us</h2>
                        <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6">We Create Memories That Last Forever</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                            Srimudra Events is Hyderabad's most trusted event management company, dedicated to turning your dream events into reality. Whether it's a grand wedding, a joyous birthday party, or a professional corporate gathering, we handle everything with precision and passion.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            We pride ourselves on delivering <span className="font-bold text-secondary">premium quality</span> services that are <span className="font-bold text-secondary">budget-friendly</span>. Our team of experts pays attention to every detail, ensuring 100% customer satisfaction.
                        </p>

                        <div className="grid grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-4 rounded-lg shadow-md text-center border-b-4 border-primary"
                                >
                                    <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                                    <h4 className="text-2xl font-bold text-secondary">{stat.number}</h4>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
