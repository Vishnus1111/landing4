import React from 'react';
import { motion } from "framer-motion";
import { Mail, Linkedin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#000066] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="font-poppins text-2xl font-bold text-white mb-3">
                            Meilleur Analytics Private Limited
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed">
                            Offshore Accounting & Analytics Firm - Your Transformation Partner
                        </p>
                        <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#00B99E] to-[#9EE8DD] rounded-full" />
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-3">
                            <li>
                                <span className="text-white/50 text-sm flex items-center gap-2">
                                    Financial Services
                                </span>
                            </li>
                            <li>
                                <span className="text-white/50 text-sm flex items-center gap-2">
                                    IT & Analytics
                                </span>
                            </li>
                            <li>
                                <span className="text-white/50 text-sm flex items-center gap-2">
                                    Training & Development
                                </span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Who We Serve */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-white font-semibold mb-4">Who We Serve</h4>
                        <ul className="space-y-3">
                            <li>
                                <span className="text-white/50 text-sm">
                                    Businesses
                                </span>
                            </li>
                            <li>
                                <span className="text-white/50 text-sm">
                                    Enterprises
                                </span>
                            </li>
                            <li>
                                <span className="text-white/50 text-sm">
                                    Individuals
                                </span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=info@meilleuranalytics.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#00B99E] transition-colors text-sm flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Us
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/company/meilleuranalytics/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#00B99E] transition-colors text-sm flex items-center gap-2">
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <span className="hidden md:flex text-white/50 text-sm items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    +91 9740985518
                                </span>
                                <a href="tel:+919740985518" className="md:hidden text-white/50 hover:text-[#00B99E] transition-colors text-sm flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    +91 9740985518
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/30 text-sm">
                            © 2025 Meilleur Analytics Private Limited. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-white/30 hover:text-white/60 transition-colors text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-white/30 hover:text-white/60 transition-colors text-sm">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
