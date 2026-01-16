import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `Contact Inquiry%0A
    Name: ${formData.name}%0A
    Email: ${formData.email}%0A
    Phone: ${formData.phone}%0A
    Message: ${formData.message}`;

        window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, '_blank');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-20 bg-zinc-900 text-white relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-16">

                    {/* Contact Info */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-primary font-sans font-bold tracking-wider uppercase mb-2">Get in Touch</h2>
                        <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Plan Your Next Event With Us</h3>
                        <p className="text-gray-400 mb-12 leading-relaxed">
                            Ready to start planning? Contact us today for a free consultation. We are available 24/7 to answer your queries and make your event dreams come true.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                    <FaPhoneAlt size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                                    <a href="tel:+91XXXXXXXXXX" className="text-gray-400 hover:text-white transition-colors">+91 XXXXXXXXXX</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                    <FaWhatsapp size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">WhatsApp</h4>
                                    <a href="https://wa.me/91XXXXXXXXXX" className="text-gray-400 hover:text-white transition-colors">+91 XXXXXXXXXX</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Email</h4>
                                    <a href="mailto:info@srimudraevents.com" className="text-gray-400 hover:text-white transition-colors">info@srimudraevents.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Location</h4>
                                    <p className="text-gray-400">Hyderabad, Telangana, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full md:w-1/2">
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl">
                            <h4 className="text-2xl font-serif font-bold text-secondary mb-6">Send Us a Message</h4>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded border border-gray-300 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded border border-gray-300 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded border border-gray-300 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded border border-gray-300 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-4 rounded font-bold text-lg hover:bg-[#B5952F] transition-all"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-16 w-full h-64 rounded-xl overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Embedding a simple map using iframe for Hyderabad */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160408542!2d78.26795744885827!3d17.412153075677054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;
