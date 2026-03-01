import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Wrench, TestTube } from 'lucide-react';
import WebsiteDevDetail from './WebsiteDevDetail';

const services = [
  {
    id: 'website',
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites that convert visitors into customers — from informational sites to complex platforms.',
    comingSoon: false,
    clickable: true,
  },
  {
    id: 'app',
    icon: Smartphone,
    title: 'App Development',
    description: 'Web & mobile applications built with modern technology for seamless, scalable user experiences.',
    comingSoon: true,
    comingSoonLabel: 'Coming Soon',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Post-Development Maintenance',
    description: 'Proactive monitoring, updates, and ongoing support to keep your systems running at peak performance.',
    comingSoon: false,
  },
  {
    id: 'testing',
    icon: TestTube,
    title: 'Software Testing',
    description: 'Comprehensive QA testing to ensure your software is bug-free, secure, and ready for launch.',
    comingSoon: false,
  },
];

function ServiceCard({ service, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={`group relative overflow-hidden bg-[#f9fafb] hover:bg-white border border-gray-100 rounded-2xl p-7 shadow-sm transition-all duration-300
        hover:shadow-md hover:shadow-[#fff1c1] hover:border-[#e79d1a]/40 hover:-translate-y-1
        ${service.clickable ? 'cursor-pointer' : ''}`}
    >
      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-[80px] bg-[#f0f4ff] opacity-60 group-hover:bg-[#ffedb2] group-hover:scale-[2] transition-all duration-700" />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
            service.id === 'website' || service.id === 'testing'
              ? 'bg-gradient-to-br from-[#000066] to-[#000066]/80 shadow-lg'
              : service.id === 'app'
              ? 'bg-gradient-to-br from-[#fff4cc] via-[#ffe89c] to-[#e2a31c] shadow-lg'
              : service.id === 'maintenance'
              ? 'bg-gradient-to-br from-[#fff4cc] via-[#ffe89c] to-[#e2a31c] shadow-lg'
              : 'bg-[#eef1ff] group-hover:bg-[#fff3d6]'
          }`}
        >
          <service.icon
            className={`w-6 h-6 transition-colors duration-300 ${
              service.id === 'website' || service.id === 'testing' ? 'text-white' : 'text-[#000066] group-hover:text-[#e79d1a]'
            }`}
          />
        </div>

        <h3 className="text-base font-bold text-[#000066] mb-2">{service.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>

        {service.comingSoon && (
          <span className="inline-block mt-3 text-xs font-semibold text-[#e79d1a] bg-[#fff8ee] px-2.5 py-1 rounded-full border border-[#e79d1a]/30">
            {service.comingSoonLabel}
          </span>
        )}
        {service.clickable && (
          <p className="mt-3 text-xs font-semibold text-[#1a8a6e] group-hover:text-[#e79d1a] transition-colors">
            Explore more →
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function ServicesGrid({ onWebsiteDevYes }) {
  const [view, setView] = useState('grid');

  return (
    <section id="services" className="py-20 px-6 lg:px-12 bg-[#f8f5f8]">
      <div className="container mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          {view === 'grid' && (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <div className="text-center mb-14">
                <p className="text-sm font-semibold text-[#e79d1a] tracking-wider uppercase mb-3">What We Offer</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#000066] mb-3">Full-Spectrum IT Solutions</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#e79d1a] to-[#fff4d6] rounded-full mx-auto mb-4" />
                <p className="text-base text-gray-500 max-w-2xl mx-auto">
                  From concept to deployment and beyond — everything you need to succeed in the digital landscape.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {services.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onClick={() => service.clickable && setView('website-detail')}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {view === 'website-detail' && (
            <motion.div key="detail" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.4 }}>
              <WebsiteDevDetail onYes={() => onWebsiteDevYes()} onNo={() => setView('grid')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
