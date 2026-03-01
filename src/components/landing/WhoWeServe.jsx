import React from 'react';
import { motion } from "framer-motion";
import { Building, Building2, User, Briefcase } from "lucide-react";

const personas = [
    {
        icon: Building,
        title: "Small & Mid-Sized Businesses",
        description: "Bookkeeping, accounting, analytics support",
        color: "#000066"
    },
    {
        icon: Building2,
        title: "Enterprises",
        description: "BI, reporting, data-backed decision support",
        color: "#00B99E"
    },
    {
        icon: User,
        title: "Individuals & Professionals",
        description: "Upskilling in finance, analytics, IT-enabled services",
        color: "#9EE8DD"
    },
    {
        icon: Briefcase,
        title: "One-Stop Solution Seekers",
        description: "Clients who want finance + data + training under one partner",
        color: "#000066"
    }
];

export default function WhoWeServe() {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-poppins text-4xl md:text-5xl font-bold text-[#000066] mb-4">
                        Who We Serve
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#00B99E] to-[#9EE8DD] mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personas.map((persona, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-8 bg-white rounded-3xl border border-gray-100 hover:border-[#9EE8DD]/50 shadow-sm hover:shadow-2xl hover:shadow-[#00B99E]/10 transition-all duration-500 text-center">
                                <div 
                                    className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                                    style={{ backgroundColor: `${persona.color}15` }}
                                >
                                    <persona.icon 
                                        className="w-8 h-8 transition-colors duration-500"
                                        style={{ color: persona.color }}
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-[#000066] mb-3">
                                    {persona.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {persona.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
