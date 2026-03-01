import React from 'react';
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, GraduationCap } from "lucide-react";
import { Link } from 'react-router-dom';

const services = [
    {
        icon: TrendingUp,
        title: "Financial Services",
        description: "Comprehensive accounting & analytics solutions for businesses across sizes and sectors.",
        highlights: [
            "Bookkeeping & financial reporting",
            "Compliance support & analytics",
            "Data-driven insights for informed decisions",
            "Industry-tailored finance solutions"
        ],
        gradient: "from-[#000066] to-[#000066]/80",
        cta: "View Financial Services →"
    },
    {
        icon: BarChart3,
        title: "IT Services & Analytics",
        description: "Analytics-driven IT services that convert raw data into insights.",
        highlights: [
            "Data analytics & reporting",
            "BI dashboards & decision support",
            "IT-enabled finance automation",
            "Analytics for operational efficiency"
        ],
        gradient: "from-[#00B99E] to-[#00B99E]/80",
        cta: "Explore IT & Analytics →",
        link: "/it-services"
    },
    {
        icon: GraduationCap,
        title: "Training & Development",
        description: "Practical, industry-aligned training programs for individuals and teams.",
        highlights: [
            "Accounting & finance skills",
            "Data handling & analytics training",
            "Industry-ready learning frameworks",
            "Academic-to-professional bridge"
        ],
        gradient: "from-[#9EE8DD] to-[#00B99E]",
        cta: "Browse Training Programs →"
    }
];

export default function ServicesSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-poppins text-4xl md:text-5xl font-bold text-[#000066] mb-4">
                        What We Do
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#00B99E] to-[#9EE8DD] mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group"
                        >
                            <div className="relative h-full bg-white rounded-3xl p-8 shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-2xl hover:shadow-[#00B99E]/10 transition-all duration-500 overflow-hidden">
                                {/* Decorative gradient blob */}
                                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                                
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-[#000066] mb-3">
                                    {service.title}
                                </h3>
                                
                                <p className="text-gray-500 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <ul className="space-y-3 mb-6">
                                    {service.highlights.map((highlight, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00B99E] mt-2 flex-shrink-0" />
                                            <span className="text-gray-600 text-sm">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                {service.link ? (
                                    <Link 
                                        to={service.link}
                                        className="group/cta inline-flex items-center gap-2 text-[#00B99E] font-medium text-sm hover:gap-3 transition-all duration-300"
                                    >
                                        {service.cta}
                                    </Link>
                                ) : (
                                    <button className="group/cta inline-flex items-center gap-2 text-[#00B99E] font-medium text-sm hover:gap-3 transition-all duration-300">
                                        {service.cta}
                                    </button>
                                )}

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
