import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa';
import { useModal } from '../../context/ModalContext';

const Header = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { openModal } = useModal();

    const navLinks = [
        { name: 'Home', offset: 'hero' },
        { name: 'About', offset: 'about' },
        { name: 'Services', offset: 'services' },
        { name: 'Gallery', offset: 'gallery' },
        // { name: 'Testimonials', offset: 'testimonials' },
        { name: 'Contact', offset: 'contact' },
    ];

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setNav(false);
        }
    };

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">

                {/* Branding (Left) */}
                <div className="flex items-center gap-4 cursor-pointer z-30 flex-shrink-0" onClick={() => handleScroll('hero')}>
                    <img src="/logo.png" alt="Srimudra Logo" className="h-12 w-auto md:h-16 shadow-sm rounded-full" />
                    <div className="flex flex-col">
                        <h1 className={`text-xl md:text-2xl font-serif font-bold tracking-tight uppercase ${scrolled ? 'text-secondary' : 'text-white'} drop-shadow-md`}>
                            Srimudra Events
                        </h1>
                        <span className={`text-[10px] md:text-xs tracking-[0.3em] uppercase ${scrolled ? 'text-dark' : 'text-gray-200'} font-medium`}>
                            & Management
                        </span>
                    </div>
                </div>

                {/* Desktop Menu (Right) */}
                <ul className="hidden xl:flex space-x-8 items-center z-30">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => handleScroll(link.offset)}
                                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-secondary ${scrolled ? 'text-dark' : 'text-white'}`}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={openModal}
                            className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm shadow-lg hover:shadow-secondary/50"
                        >
                            <FaPhoneAlt size={12} />
                            Get Quote
                        </button>
                    </li>
                </ul>

                {/* Hamburger Icon (Mobile/Tablet Right) */}
                <div onClick={() => setNav(!nav)} className="xl:hidden z-30 cursor-pointer ml-auto bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    {nav ? <FaTimes size={24} className="text-white bg-red-500 rounded-full p-1" /> : <FaBars size={24} className={scrolled ? 'text-secondary' : 'text-white'} />}
                </div>
            </div>

            {/* Mobile Menu */}
            {nav && (
                <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center z-10 transition-all duration-500">
                    <ul className="space-y-8 text-center">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleScroll(link.offset)}
                                    className="text-3xl font-serif text-dark hover:text-secondary transition-colors"
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => { openModal(); setNav(false); }}
                                className="bg-secondary text-white px-8 py-4 rounded-full text-xl font-medium mt-4 shadow-xl"
                            >
                                Book Consultation
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
