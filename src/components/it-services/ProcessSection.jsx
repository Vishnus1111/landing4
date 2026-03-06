import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Palette, Code, HeartHandshake } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Understand',
    description: 'Deep dive into your goals, audience, and requirements to craft the perfect strategy.',
    iconBg: '#FFFBEB',
    iconColor: '#F59E0B',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Create stunning visuals and intuitive interfaces that reflect your brand identity.',
    iconBg: '#F3E8FF',
    iconColor: '#8B5CF6',
  },
  {
    icon: Code,
    title: 'Develop',
    description: 'Build robust, scalable solutions using modern technologies and best practices.',
    iconBg: '#FDF2F8',
    iconColor: '#EC4899',
  },
  {
    icon: HeartHandshake,
    title: 'Support',
    description: 'Ongoing maintenance, updates, and support to ensure your success long-term.',
    iconBg: '#E6FFFA',
    iconColor: '#14B8A6',
  },
];

export default function ProcessSection() {
  return (
    <section
      id="our-process"
      className="py-20 px-6 lg:px-12"
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(148,163,184,0.35)',
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-5 -mt-6">How We Build Your Solution</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#e79d1a] to-[#fff4d6] rounded-full mx-auto mb-4" />
          <p className="text-base text-[#94a3b8] max-w-2xl mx-auto">A proven methodology that delivers exceptional results, on time and on budget.</p>
        </motion.div>

        <div className="relative">
          <div className="hidden sm:block absolute top-[66px] sm:left-[calc(25%-0.5rem)] sm:right-[calc(25%-0.5rem)] lg:left-[calc(12.5%-0.75rem)] lg:right-[calc(12.5%-0.75rem)] h-[5px] rounded-full bg-[linear-gradient(90deg,#fff3a3_0%,#6366F1_100%)] transition-all duration-300 ease-out origin-center hover:scale-x-[1.04] hover:shadow-[0_0_14px_rgba(255,243,163,0.72)] z-0" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <div className="group relative z-0 flex flex-col items-center text-center transform-gpu transition-all duration-300 ease-out hover:z-10 hover:-translate-y-[6px] hover:scale-[1.06]">
                  <div className="relative mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.08] group-hover:drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: '#fbbf24' }} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white/10 border border-white/20 shadow flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 transition-all duration-300 ease-out group-hover:scale-[1.04]">{step.title}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed transition-all duration-300 ease-out group-hover:scale-[1.03]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
