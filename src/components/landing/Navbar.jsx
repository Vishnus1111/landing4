import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from '../../../asset/logo.jpg';

const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Who We Serve", href: "#who-we-serve" },
    { label: "Contact", href: "#contact" }
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-gray-100 ${
                    isScrolled 
                        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gray-100/50' 
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2">
                            <img 
                                src={logoImage}
                                alt="Meilleur Analytics Private Limited Logo"
                                className="w-[38px] h-[38px] rounded-full object-cover border border-[#00B99E]"
                            />
                            <span className="font-poppins text-[19px] font-bold text-[#000066]">
                                Meilleur
                            </span>
                            <span className="font-poppins text-[19px] font-light text-[#00B99E]">
                                Analytics
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-gray-600 hover:text-[#000066] font-medium text-sm transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00B99E] group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden lg:block">
                            <Button 
                                onClick={scrollToServices}
                                className="bg-[#00B99E] hover:bg-[#00a88e] text-white px-6 rounded-full"
                            >
                                Get Started
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-[#000066]"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden pt-20 bg-white"
                    >
                        <div className="p-6 space-y-4">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-3 text-lg font-medium text-[#000066] border-b border-gray-100"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button 
                                onClick={() => {
                                    scrollToServices();
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full bg-[#00B99E] hover:bg-[#00a88e] text-white mt-6 py-6 rounded-full"
                            >
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
