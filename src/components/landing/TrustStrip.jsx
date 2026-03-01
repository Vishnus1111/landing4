import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, Building2, Layers, Users, Shield } from "lucide-react";

const trustItems = [
    {
        icon: Building2,
        text: "Offshore Accounting & Analytics Partner"
    },
    {
        icon: Layers,
        text: "Finance + Analytics + Training Under One Roof"
    },
    {
        icon: Users,
        text: "Scalable for Businesses & Individuals"
    },
    {
        icon: Shield,
        text: "Ethical, Accurate, Reliable Delivery"
    }
];

export default function TrustStrip() {
    return (
        <section className="bg-[#000066] py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trustItems.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-start gap-4"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00B99E]/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-[#00B99E]" />
                            </div>
                            <span className="text-white/90 text-sm font-light leading-relaxed">
                                {item.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
