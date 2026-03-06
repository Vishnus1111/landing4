import React, { useEffect, useRef, useState } from 'react';
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

function ServiceCard({ service, onClick, gridPointer }) {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false, inside: false, proximity: 0 });

  useEffect(() => {
    if (!cardRef.current || !gridPointer.active) {
      setSpotlight((prev) => ({ ...prev, active: false, inside: false, proximity: 0 }));
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = gridPointer.x - rect.left;
    const y = gridPointer.y - rect.top;
    const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

    const outsideX = Math.max(0, -x, x - rect.width);
    const outsideY = Math.max(0, -y, y - rect.height);
    const edgeDistance = Math.hypot(outsideX, outsideY);
    const borderInfluenceRadius = 120;
    const active = inside || edgeDistance <= borderInfluenceRadius;
    const proximity = inside ? 1 : Math.max(0, 1 - edgeDistance / borderInfluenceRadius);

    setSpotlight({ x, y, active, inside, proximity });
  }, [gridPointer]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onClick={onClick}
      className={`group relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-7 transition-all duration-300
        ${service.clickable ? 'cursor-pointer' : ''}`}
      style={{
        borderColor: spotlight.inside ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.1)',
        boxShadow: spotlight.inside
          ? '0 0 0 1px rgba(251,191,36,0.14), 0 0 10px rgba(251,191,36,0.21), 0 0 28px rgba(245,158,11,0.17), 0 0 62px rgba(245,158,11,0.1), 0 12px 30px rgba(0,0,0,0.45)'
          : '0 10px 28px rgba(0,0,0,0.38)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.inside ? 1 : 0,
          padding: '1px',
          background:
            'linear-gradient(135deg, rgba(252,211,77,0.35) 0%, rgba(251,191,36,0.3) 38%, rgba(245,158,11,0.23) 62%, rgba(252,211,77,0.34) 100%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.22)) drop-shadow(0 0 16px rgba(245,158,11,0.16))',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.active && !spotlight.inside ? Math.max(0.2, spotlight.proximity) : 0,
          padding: '1px',
          background: `radial-gradient(190px circle at ${spotlight.x}px ${spotlight.y}px, rgba(252,211,77,1) 0%, rgba(251,191,36,0.9) 20%, rgba(245,158,11,0.52) 42%, rgba(245,158,11,0.2) 58%, transparent 76%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.62)) drop-shadow(0 0 18px rgba(245,158,11,0.5))',
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/10 border border-white/10 transition-colors duration-300">
          <service.icon className="w-6 h-6 text-white transition-colors duration-300" />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>

        {service.comingSoon && (
          <span className="inline-block mt-3 text-xs font-semibold text-[#e79d1a] bg-[#e79d1a]/10 px-2.5 py-1 rounded-full border border-[#e79d1a]/30">
            {service.comingSoonLabel}
          </span>
        )}
        {service.clickable && (
          <p className="mt-3 text-xs font-semibold text-[#9ad0c3] transition-colors">
            Explore more →
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function ServicesGrid({ onWebsiteDevYes }) {
  const [view, setView] = useState('grid');
  const [gridPointer, setGridPointer] = useState({ x: 0, y: 0, active: false });

  const handleGridPointerMove = (event) => {
    setGridPointer({ x: event.clientX, y: event.clientY, active: true });
  };

  const handleGridPointerLeave = () => {
    setGridPointer((prev) => ({ ...prev, active: false }));
  };

  return (
    <section id="services" className="relative overflow-hidden py-24 px-6 lg:px-12 bg-[#000000]">  
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
              <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl font-bold text-white mb-3">Scalable IT Solutions for Modern Businesses</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#e79d1a] to-[#fff4d6] rounded-full mx-auto mb-4" />
                <p className="text-base text-gray-400 max-w-xl mx-auto">
                  From idea to execution — we deliver systems that grow with your business.
                </p>
              </div>

              <div
                className="relative z-10 grid md:grid-cols-2 gap-6 mt-2"
                onMouseMove={handleGridPointerMove}
                onMouseEnter={handleGridPointerMove}
                onMouseLeave={handleGridPointerLeave}
              >
                {services.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onClick={() => service.clickable && setView('website-detail')}
                    gridPointer={gridPointer}
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
