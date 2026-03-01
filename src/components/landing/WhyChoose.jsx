import React from 'react';
import { motion } from "framer-motion";
import { Users, Target, Layers, Scale, Award } from "lucide-react";

const reasons = [
    {
        icon: Users,
        title: "Expert Team",
        description: "Qualified, energetic professionals across analytics, finance, IT, and training."
    },
    {
        icon: Target,
        title: "Tailored, Client-Centric Approach",
        description: "Every engagement is customized with transparency and collaboration."
    },
    {
        icon: Layers,
        title: "Integrated Services",
        description: "Finance + analytics + training in one cohesive offering."
    },
    {
        icon: Scale,
        title: "Scalable & Versatile",
        description: "From small businesses to enterprises to individual learners."
    },
    {
        icon: Award,
        title: "Quality & Reliability",
        description: "Ethical practices, accuracy, and timely delivery you can trust."
    }
];

export default function WhyChoose() {
    return (
        <section className="py-24 bg-[#f8f5f8]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-24"
                    >
                        <h2 className="font-poppins text-4xl md:text-5xl font-bold text-[#000066] mb-6 leading-tight">
                            Why Choose<br />
                            <span className="text-[#00B99E]">Meilleur Analytics</span>
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                            We bring together expertise, innovation, and dedication to deliver exceptional results for every client.
                        </p>
                        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#00B99E] to-[#9EE8DD] rounded-full" />
                    </motion.div>

                    {/* Right Side - Reasons */}
                    <div className="space-y-6">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="flex gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[#00B99E]/5 transition-all duration-500 border border-transparent hover:border-[#9EE8DD]/30">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#000066] to-[#000066]/80 flex items-center justify-center group-hover:from-[#00B99E] group-hover:to-[#9EE8DD] transition-all duration-500">
                                        <reason.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#000066] mb-2 group-hover:text-[#00B99E] transition-colors duration-300">
                                            {reason.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            {reason.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
