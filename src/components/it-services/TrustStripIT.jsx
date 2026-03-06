import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Layers, Users, Shield } from 'lucide-react';

const trustItems = [
  {
    icon: Building2,
    text: 'End-to-End IT Solutions Partner',
  },
  {
    icon: Layers,
    text: 'Development + Cloud + Support Under One Roof',
  },
  {
    icon: Users,
    text: 'Scalable for Startups & Enterprises',
  },
  {
    icon: Shield,
    text: 'Secure, Reliable & Performance-Driven Delivery',
  },
];

export default function TrustStripIT() {
  return (
    <section className="relative py-5 bg-[#000000] border-b border-white/20 z-20">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-5">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group w-full sm:w-auto"
            >
              <div className="relative overflow-hidden flex items-center gap-[10px] px-5 py-3 rounded-full bg-white/5 backdrop-blur-[10px] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(231,157,26,0.15)] transition-all duration-300 ease-out group-hover:border-[#e79d1a]/40 group-hover:shadow-[0_10px_25px_rgba(231,157,26,0.2)]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#e79d1a]/15 via-transparent to-[#5c7bff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#e79d1a]/12 border border-[#e79d1a]/25 shadow-[0_0_0_rgba(231,157,26,0)] group-hover:shadow-[0_0_28px_rgba(231,157,26,0.35)] transition-all duration-300">
                  <item.icon className="w-4.5 h-4.5 text-[#f6c264] group-hover:text-[#ffd98f] transition-colors duration-300" />
                </div>
                <span className="relative text-white text-sm font-light leading-relaxed">
                  {item.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
