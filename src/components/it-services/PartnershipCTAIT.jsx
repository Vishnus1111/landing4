import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ConsultationModal from '@/components/landing/ConsultationModal';

export default function PartnershipCTAIT() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <section
        id="contact-section"
        className="relative pt-24 pb-12 overflow-hidden"
        style={{
          background: '#000000',
          borderTop: '1px solid rgba(148,163,184,0.35)',
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#f6af35] rounded-full opacity-5 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffedb2] rounded-full opacity-5 blur-3xl transform translate-x-1/2 translate-y-1/2" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
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
              Build Faster. Spend Smarter.<br />
              <span className="text-[#f6af35]">Launch with Confidence.</span>
            </h2>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Let's discuss your project and create a roadmap to digital success. No obligations — just expert advice tailored to your needs.
            </p>

            <div className="flex justify-center">
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-[#f6af35] hover:bg-[#f6af35] text-white px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-md hover:shadow-[#f6af35]/15"
              >
                Talk to Our Specialist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
