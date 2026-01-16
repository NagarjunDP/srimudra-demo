import React from 'react';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Srimudra Events</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Creating unforgettable memories in Hyderabad. We specialize in weddings, birthdays, and corporate events with premium decorations and flawless management.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com/srimudra_events" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                                <FaWhatsapp size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-serif font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
                                <li key={item}>
                                    <button onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-primary transition-colors">
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-serif font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary mt-1" />
                                <span className="text-gray-300">Hyderabad, Telangana, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-primary" />
                                <a href="tel:+91XXXXXXXXXX" className="text-gray-300 hover:text-primary transition-colors">+91 XXXXXXXXXX</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-primary" />
                                <a href="mailto:info@srimudraevents.com" className="text-gray-300 hover:text-primary transition-colors">info@srimudraevents.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Srimudra Events. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
