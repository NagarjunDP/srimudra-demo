import React from 'react';
import Slider from 'react-slick';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
    const reviews = [
        {
            name: "R Ram",
            rating: 5,
            review: "Absolutely Stunning Experience! Flowers 🌹🌹 Events Management turned our special day into an unforgettable memory. From the breathtaking floral arrangements to the flawless event coordination...",
            date: "6 months ago"
        },
        {
            name: "Surendra babu Bodipudi",
            rating: 5,
            review: "I recently hired Sri Mudra Events Management Company to organize a birthday celebration, and I couldn't be more pleased with their service! From the initial planning stage to the final execution, their team was professional, creative, and...",
            date: "6 months ago"
        },
        {
            name: "Tandra Jyothsna",
            rating: 5,
            review: "Amazing work and Nice coordination with customers mainly focusing on customer satisfaction and flower collection and decoration themes are very unique finally budget friendly🥰 love to collaborate for our family events again.",
            date: "6 months ago"
        },
        {
            name: "eswar muthyam",
            rating: 5,
            review: "had an Amazing experience with you. Very much satisfied with your work. It's the best and friendly. Thank you 😊",
            date: "6 months ago"
        },
        {
            name: "Jay Sri",
            rating: 5,
            review: "Fantastic experience with srimudra events. The team made our event truly memorable. Very well organized, timely, and professional.",
            date: "6 months ago"
        },
        {
            name: "lakshmu sapecc17",
            rating: 5,
            review: "Best quality very much Elegant decorations very good staff service.....",
            date: "5 months ago"
        },
        {
            name: "Shaik reshma",
            rating: 5,
            review: "Nice work responding also nice for customer the give a beautiful finishing us oral excellent",
            date: "6 months ago"
        },
        {
            name: "Muthineni Venkata Koteswara Rao",
            rating: 5,
            review: "Budget friendly and excellent work",
            date: "6 months ago"
        },
        {
            name: "Saisree 1999",
            rating: 5,
            review: "Great management Done a great work",
            date: "6 months ago"
        },
        {
            name: "sekhar v",
            rating: 5,
            review: "Excellent organised management",
            date: "5 months ago"
        },
        {
            name: "Chaitanya Gutta",
            rating: 5,
            review: "Nice very awesome",
            date: "6 months ago"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section id="testimonials" className="py-20 bg-background text-center">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-primary font-sans font-bold tracking-wider uppercase mb-2">Testimonials</h2>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary">What Our Clients Say</h3>
                </div>

                <div className="px-4 md:px-12">
                    <Slider {...settings}>
                        {reviews.map((review, index) => (
                            <div key={index} className="px-3">
                                <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col justify-between min-h-[300px]">
                                    <div>
                                        <FaQuoteLeft className="text-primary/20 text-4xl mb-4 mx-auto" />
                                        <div className="flex justify-center mb-4">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 mb-6 italic text-sm md:text-base line-clamp-4">"{review.review}"</p>
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-secondary text-lg">{review.name}</h4>
                                        <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
