import React from 'react';
import { Button } from "@/Components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen bg-white overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-0 w-[600px] h-[600px] opacity-10">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#000066" />
                                <stop offset="100%" stopColor="#00B99E" />
                            </linearGradient>
                        </defs>
                        <circle cx="200" cy="200" r="150" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
                        <circle cx="200" cy="200" r="120" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
                        <circle cx="200" cy="200" r="90" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
                    </svg>
                </div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-40 right-20 w-3 h-3 rounded-full bg-[#00B99E]"
                />
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute top-60 right-40 w-2 h-2 rounded-full bg-[#9EE8DD]"
                />
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="absolute top-80 right-60 w-4 h-4 rounded-full bg-[#000066] opacity-20"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 lg:pt-40">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-[#000066] leading-tight tracking-tight">
                                Welcome to<br />
                                <span className="bg-gradient-to-r from-[#000066] to-[#00B99E] bg-clip-text text-transparent">
                                    Meilleur Analytics Private Limited
                                </span>
                            </h1>
                            
                            <h2 className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                                Offshore Accounting & Analytics Firm - Your Transformation Partner
                            </h2>
                            
                            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                                Meilleur Analytics is powered by highly energetic, qualified professionals delivering tailored solutions across Financial Services, IT Services, and Training & Development. We combine domain expertise, technology, and a client-centric approach to help businesses and individuals unlock data-driven success.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button 
                                onClick={scrollToContact}
                                size="lg"
                                className="bg-[#00B99E] hover:bg-[#00a88e] text-white px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#00B99E]/20"
                            >
                                Talk to an Expert
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button 
                                onClick={scrollToServices}
                                size="lg"
                                variant="outline"
                                className="border-2 border-[#000066] text-[#000066] hover:bg-[#000066] hover:text-white px-8 py-6 text-lg font-medium rounded-full transition-all duration-300"
                            >
                                Explore Our Services
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Abstract Illustration */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full h-[500px]">
                            {/* Main Dashboard Shape */}
                            <div className="absolute top-10 left-10 w-80 h-56 bg-white rounded-2xl shadow-2xl shadow-[#000066]/10 p-6 border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-[#00B99E]" />
                                    <div className="w-3 h-3 rounded-full bg-[#9EE8DD]" />
                                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 bg-gray-100 rounded w-3/4" />
                                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                                </div>
                                <div className="mt-6 flex items-end gap-2 h-20">
                                    <div className="w-8 bg-gradient-to-t from-[#000066] to-[#00B99E] rounded-t h-12" />
                                    <div className="w-8 bg-gradient-to-t from-[#000066] to-[#00B99E] rounded-t h-16" />
                                    <div className="w-8 bg-gradient-to-t from-[#000066] to-[#00B99E] rounded-t h-10" />
                                    <div className="w-8 bg-gradient-to-t from-[#000066] to-[#00B99E] rounded-t h-20" />
                                    <div className="w-8 bg-gradient-to-t from-[#000066] to-[#00B99E] rounded-t h-14" />
                                </div>
                            </div>

                            {/* Floating Card 1 */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-20 left-0 w-48 h-32 bg-[#000066] rounded-xl p-4 shadow-xl"
                            >
                                <div className="text-[#9EE8DD] text-xs font-medium mb-2">Analytics</div>
                                <div className="text-white text-2xl font-bold">+127%</div>
                                <div className="text-gray-400 text-xs mt-1">Growth Rate</div>
                                <div className="mt-3 flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-6 h-1 rounded bg-[#00B99E]" style={{ opacity: i * 0.2 }} />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Floating Card 2 */}
                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#00B99E] to-[#9EE8DD] rounded-2xl p-5 shadow-xl"
                            >
                                <div className="w-full h-full flex flex-col justify-between">
                                    <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white/80 text-xs">Insights</div>
                                        <div className="text-white text-lg font-semibold">Data-Driven</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute bottom-10 right-20 w-20 h-20 border-2 border-[#9EE8DD] rounded-full opacity-30" />
                            <div className="absolute top-40 right-10 w-4 h-4 bg-[#00B99E] rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
