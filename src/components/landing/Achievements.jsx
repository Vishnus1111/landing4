import React from 'react';
import { motion } from "framer-motion";
import { Globe, BarChart, BookOpen, Puzzle } from "lucide-react";

const achievements = [
    {
        icon: Globe,
        title: "Trusted offshore accounting & analytics partner across industries",
        color: "from-[#000066] to-[#000066]/70"
    },
    {
        icon: BarChart,
        title: "Consistent delivery of accounting, analytics & reporting excellence",
        color: "from-[#00B99E] to-[#9EE8DD]"
    },
    {
        icon: BookOpen,
        title: "Skill-development programs bridging academics & industry",
        color: "from-[#9EE8DD] to-[#00B99E]"
    },
    {
        icon: Puzzle,
        title: "One-brand solution reducing vendor complexity for clients",
        color: "from-[#000066]/80 to-[#00B99E]"
    }
];

export default function Achievements() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-poppins text-4xl md:text-5xl font-bold text-[#000066] mb-4">
                        Our Achievements & Impact
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#00B99E] to-[#9EE8DD] mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative h-full p-8 rounded-3xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#9EE8DD]/50 shadow-sm hover:shadow-xl hover:shadow-[#00B99E]/10 transition-all duration-500 overflow-hidden">
                                {/* Background decoration */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.color} opacity-5 rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700`} />
                                
                                <div className="relative flex items-start gap-5">
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg`}>
                                        <achievement.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-lg font-medium text-[#000066] leading-relaxed">
                                            {achievement.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
