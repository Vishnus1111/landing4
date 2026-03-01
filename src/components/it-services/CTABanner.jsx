import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  const scrollToContact = () => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="py-20 px-6 lg:px-12 bg-[#000066]">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <p className="text-sm font-semibold text-[#e79d1a] tracking-wider uppercase mb-4">Ready to Start?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Build Faster. Spend Smarter.
            <span className="block mt-1 text-[#e79d1a]">Launch with Confidence.</span>
          </h2>
          <div className="w-12 h-1 bg-[#1a8a6e] rounded-full mx-auto my-6" />
          <p className="text-base text-blue-200 mb-10 max-w-xl mx-auto">
            Let's discuss your project and create a roadmap to digital success. No obligations — just expert advice tailored to your needs.
          </p>
          <button onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a8a6e] hover:bg-[#e79d1a] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg">
            Talk to Our Specialist <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
