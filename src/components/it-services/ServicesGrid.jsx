import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Wrench, TestTube } from 'lucide-react';
import WebsiteDevDetail from './WebsiteDevDetail';
import TrustStripIT from './TrustStripIT';

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
      whileHover={{ y: -6, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onClick={onClick}
      className={`group relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-7 transition-all duration-300
        hover:bg-white/10 hover:border-[#e79d1a]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        ${service.clickable ? 'cursor-pointer' : ''}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e79d1a]/25 via-transparent to-[#1a8a6e]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/10 border border-white/10 group-hover:bg-[#e79d1a]/20 transition-colors duration-300">
          <service.icon className="w-6 h-6 text-white group-hover:text-[#e79d1a] transition-colors duration-300" />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>

        {service.comingSoon && (
          <span className="inline-block mt-3 text-xs font-semibold text-[#e79d1a] bg-[#e79d1a]/10 px-2.5 py-1 rounded-full border border-[#e79d1a]/30">
            {service.comingSoonLabel}
          </span>
        )}
        {service.clickable && (
          <p className="mt-3 text-xs font-semibold text-[#9ad0c3] group-hover:text-[#e79d1a] transition-colors">
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
    <section id="services" className="relative overflow-hidden py-24 px-6 lg:px-12 bg-gradient-to-b from-[#050816] via-[#0a0f2c] to-[#050816] ">  
    {/* border-t border-white/15 */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(231,157,26,0.08) 0%, rgba(231,157,26,0) 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(92,123,255,0.08) 0%, rgba(92,123,255,0) 70%)',
        }}
      />
      <div className="container mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          {view === 'grid' && (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <TrustStripIT />

              <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl font-bold text-white mb-3">Scalable IT Solutions for Modern Businesses</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#e79d1a] to-[#fff4d6] rounded-full mx-auto mb-4" />
                <p className="text-base text-gray-400 max-w-xl mx-auto">
                  From idea to execution — we deliver systems that grow with your business.
                </p>
              </div>

              <div className="relative z-10 grid md:grid-cols-2 gap-6 mt-2">
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
