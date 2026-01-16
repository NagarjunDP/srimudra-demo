import React from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    };

    const testimonials = [
        {
            name: "Priya & Rajesh",
            event: "Wedding",
            text: "Srimudra events made our wedding absolute magic! The decor was better than what we imagined, and the team handled everything so professionally. Highly recommended!",
            rating: 5
        },
        {
            name: "Rahul Reddy",
            event: "Corporate Gala",
            text: "We hired them for our annual corporate meet, and the execution was flawless. From logistics to the stage setup, everything was premium.",
            rating: 5
        },
        {
            name: "Sneha Kapoor",
            event: "Birthday Bash",
            text: "The best birthday party planner in Hyderabad! My daughter loved the theme, and the guests were impressed by the arrangements.",
            rating: 5
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-dark text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h3 className="text-secondary uppercase tracking-[0.3em] text-sm font-bold mb-3">Testimonials</h3>
                    <h2 className="text-4xl md:text-5xl font-serif text-white font-bold">Client Love</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <Slider {...settings}>
                        {testimonials.map((item, index) => (
                            <div key={index} className="px-4 py-8 focus:outline-none">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 text-center relative">
                                    <FaQuoteLeft className="text-4xl text-primary/30 absolute top-8 left-8" />

                                    <div className="flex justify-center gap-1 mb-6 text-yellow-400">
                                        {[...Array(item.rating)].map((_, i) => <FaStar key={i} />)}
                                    </div>

                                    <p className="text-lg md:text-2xl font-light italic text-gray-200 mb-8 leading-relaxed">
                                        "{item.text}"
                                    </p>

                                    <div>
                                        <h4 className="text-xl font-bold font-serif text-secondary">{item.name}</h4>
                                        <p className="text-sm uppercase tracking-wider text-gray-400 mt-1">{item.event}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
