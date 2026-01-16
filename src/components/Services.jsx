import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaGlassCheers, FaBuilding, FaBirthdayCake, FaCamera, FaMusic } from 'react-icons/fa';
import { useModal } from '../context/ModalContext';

const Services = () => {
    const { openModal } = useModal();

    // Mapping user uploaded images to services
    const services = [
        {
            icon: <FaCrown className="text-4xl text-primary" />,
            title: "Wedding Planning",
            desc: "Full-service wedding management from venue selection to vidaai.",
            image: "/WhatsApp Image 2026-01-16 at 10.52.44.jpeg"
        },
        {
            icon: <FaBirthdayCake className="text-4xl text-secondary" />,
            title: "Birthday Bash",
            desc: "Themed birthday parties for kids and adults with magical decor.",
            image: "/WhatsApp Image 2026-01-16 at 10.52.44 (1).jpeg"
        },
        {
            icon: <FaBuilding className="text-4xl text-primary" />,
            title: "Corporate Events",
            desc: "Professional conferences, seminars, and product launch events.",
            image: "/WhatsApp Image 2026-01-16 at 10.52.45.jpeg"
        },
        {
            icon: <FaGlassCheers className="text-4xl text-secondary" />,
            title: "Receptions & Galas",
            desc: "Elegant evening parties with premium catering and entertainment.",
            image: "/WhatsApp Image 2026-01-16 at 10.52.45 (2).jpeg"
        },
        {
            icon: <FaCamera className="text-4xl text-primary" />,
            title: "Event Photography",
            desc: "Capturing your precious moments with cinematic 4K photography.",
            image: "/WhatsApp Image 2026-01-16 at 10.52.46.jpeg"
        },
        {
            icon: <FaMusic className="text-4xl text-secondary" />,
            title: "Live Entertainment",
            desc: "DJs, Live Bands, and Celebrity appearances for your events.",
            image: "/WhatsApp Image 2026-01-16 at 10.52.48.jpeg"
        }
    ];

    return (
        <section id="services" className="py-24 bg-dark relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C5A028 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h3 className="text-primary uppercase tracking-[0.3em] text-sm font-bold mb-3">Our Expertise</h3>
                    <h2 className="text-4xl md:text-5xl font-serif text-white font-bold">Premium Services</h2>
                    <div className="w-24 h-1 bg-secondary mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-96 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                            onClick={openModal}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${service.image}')` }}
                            ></div>

                            {/* Overlay Gradient (Darker for readability) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                                <div className="mb-4 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-gray-300 text-sm mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">
                                    {service.desc}
                                </p>
                                <button className="text-secondary text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Book Now <span>→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
