import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { ArrowRight } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function PartnershipCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <section className="relative py-24 bg-[#000066] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#00B99E] rounded-full opacity-5 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9EE8DD] rounded-full opacity-5 blur-3xl transform translate-x-1/2 translate-y-1/2" />
                
                {/* Decorative shapes */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-20 left-20 w-48 h-48 border border-white/5 rounded-full"
                />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Let's Partner &<br />
                        <span className="text-[#00B99E]">Grow Together</span>
                    </h2>
                    
                    <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                        We believe in empowering clients — through clean books, accurate finances, actionable analytics, and skill-driven training.
                    </p>

                    <div className="flex justify-center">
                        <Button 
                            onClick={() => setIsModalOpen(true)}
                            size="lg"
                            className="bg-[#00B99E] hover:bg-[#00a88e] text-white px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#00B99E]/30"
                        >
                            Request a Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
        </>
    );
}
