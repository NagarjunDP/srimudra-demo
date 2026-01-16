import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `New Website Inquiry%0A Name: ${formData.name}%0A Phone: ${formData.phone}%0A Message: ${formData.message}`;
        window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, '_blank');
    };

    return (
        <section id="contact" className="py-24 bg-white relative">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-16">

                {/* Contact Info - Left Fade In */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 space-y-10"
                >
                    <div>
                        <h3 className="text-primary uppercase tracking-[0.3em] text-sm font-bold mb-3">Get in Touch</h3>
                        <h2 className="text-4xl md:text-6xl font-serif text-dark font-bold mb-6">Let's Plan Your <br /> Dream Event.</h2>
                        <p className="text-gray-600 text-lg">
                            Ready to start planning? Contact us today for a free consultation and customized package options.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-light flex items-center justify-center text-secondary text-xl shrink-0">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark text-lg">Phone</h4>
                                <p className="text-gray-600">+91 XXXXXXXXXX</p>
                                <p className="text-gray-500 text-sm">Mon-Sun 9am to 9pm</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-light flex items-center justify-center text-secondary text-xl shrink-0">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark text-lg">Email</h4>
                                <p className="text-gray-600">info@srimudraevents.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-light flex items-center justify-center text-secondary text-xl shrink-0">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark text-lg">Office</h4>
                                <p className="text-gray-600">Jubilee Hills, Hyderabad, Telangana 500033</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-secondary transition-colors text-xl">
                            <FaInstagram />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-secondary transition-colors text-xl">
                            <FaFacebook />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-secondary transition-colors text-xl">
                            <FaWhatsapp />
                        </a>
                    </div>
                </motion.div>

                {/* Form - Right Fade In */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 bg-gray-50 p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100"
                >
                    <h3 className="text-2xl font-serif font-bold mb-8">Send us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-secondary outline-none">
                                <option>Wedding Planning</option>
                                <option>Birthday Party</option>
                                <option>Corporate Event</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-secondary outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-secondary outline-none"
                                placeholder="+91 9876543210"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-secondary outline-none"
                                placeholder="Tell us about your event..."
                            ></textarea>
                        </div>
                        <button className="w-full btn-primary shadow-xl">
                            Send Enquiry
                        </button>
                    </form>
                </motion.div>

            </div>

            {/* Map Embed */}
            <div className="w-full h-96 mt-20 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.46328394464!2d78.40698387431268!3d17.43743950136275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be779ade5f!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1705658123456!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    );
};

export default Contact;
