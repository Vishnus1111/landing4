import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Target, Lightbulb, Wrench } from 'lucide-react';

const sections = [
  {
    icon: CheckCircle2,
    heading: 'What is Website Development?',
    points: [
      'A website is more than a digital presence — it is the foundation of how your business is discovered, understood, and trusted online.',
      'It acts as your 24/7 storefront, communication hub, and growth engine, shaping first impressions and guiding customer decisions.',
      'A well-built website combines strategy, design, and technology to deliver clarity, credibility, and measurable results.',
    ],
  },
  {
    icon: Target,
    heading: 'Why are websites important?',
    points: [
      'Websites establish legitimacy and expand your reach beyond physical boundaries.',
      'They create a direct channel between businesses and their audience.',
      'They enable organisations to clearly present their value and generate leads.',
      'They help you support customers and compete effectively in a digital-first marketplace.',
    ],
  },
  {
    icon: Lightbulb,
    heading: 'What will we do for you?',
    points: [
      'We design and develop websites tailored to your business goals.',
      'From informational and corporate sites to advanced platforms — we cover it all.',
      'Our focus is on usability, performance, and scalability at every stage.',
    ],
  },
  {
    icon: Wrench,
    heading: 'How will we do it?',
    points: [
      'We follow a structured approach: understanding your objectives first.',
      'We define user experience and craft purposeful, brand-aligned design.',
      'We build with reliable, modern technology for long-term growth and maintainability.',
    ],
  },
];

function DetailGlowCard({ section, index, gridPointer }) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300"
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

      <div className="relative z-10 w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-4 transition-colors duration-300">
        <section.icon className="w-5 h-5 text-white transition-colors duration-300" />
      </div>
      <h3 className="relative z-10 font-bold text-white mb-3 transition-colors duration-300">{section.heading}</h3>
      <ul className="space-y-2">
        {section.points.map((point, itemIndex) => (
          <li key={itemIndex} className="relative z-10 flex items-start gap-2 text-sm text-gray-300 transition-colors duration-300">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#9ad0c3] flex-shrink-0 transition-colors duration-300" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function WebsiteDevDetail({ onYes, onNo }) {
  const [answer, setAnswer] = useState(null);
  const [gridPointer, setGridPointer] = useState({ x: 0, y: 0, active: false });

  const handleGridPointerMove = (event) => {
    setGridPointer({ x: event.clientX, y: event.clientY, active: true });
  };

  const handleGridPointerLeave = () => {
    setGridPointer((prev) => ({ ...prev, active: false }));
  };

  const handleNo = () => { setAnswer('no'); setTimeout(onNo, 350); };
  const handleYes = () => { setAnswer('yes'); setTimeout(onYes, 350); };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-3">What Website Development Means for Your Business</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#e79d1a] to-[#fff4d6] rounded-full mx-auto mb-4" />
        <p className="text-base text-gray-500 max-w-xl mx-auto">Here's everything you need to know before we get started.</p>
      </div>

      {/* Cards grid */}
      <div
        className="grid md:grid-cols-2 gap-6 mb-10"
        onMouseMove={handleGridPointerMove}
        onMouseEnter={handleGridPointerMove}
        onMouseLeave={handleGridPointerLeave}
      >
        {sections.map((section, index) => (
          <DetailGlowCard key={section.heading} section={section} index={index} gridPointer={gridPointer} />
        ))}
      </div>

      {/* CTA Question */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="bg-[#000066] rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Are you looking to build your website?</h3>
        <p className="text-blue-200 text-sm mb-8">Let's walk you through the process step by step.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleNo}
            className={`flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl border-2 font-semibold transition-all ${
              answer === 'no' ? 'border-white bg-white/10 text-white' : 'border-white/25 text-blue-200 hover:border-white/50 hover:text-white'
            }`}>
            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${answer === 'no' ? 'border-white' : 'border-blue-400'}`}>
              {answer === 'no' && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            No, take me back
          </button>
          <button onClick={handleYes}
            className={`flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-semibold transition-all ${
              answer === 'yes' ? 'bg-[#e79d1a] text-white border-2 border-[#e79d1a]' : 'bg-[#1a8a6e] hover:bg-[#157a60] text-white border-2 border-transparent'
            }`}>
            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${answer === 'yes' ? 'border-white' : 'border-white/60'}`}>
              {answer === 'yes' && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            Yes, let's begin! <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
