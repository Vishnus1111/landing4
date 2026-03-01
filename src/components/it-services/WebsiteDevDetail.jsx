import React, { useState } from 'react';
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

export default function WebsiteDevDetail({ onYes, onNo }) {
  const [answer, setAnswer] = useState(null);

  const handleNo = () => { setAnswer('no'); setTimeout(onNo, 350); };
  const handleYes = () => { setAnswer('yes'); setTimeout(onYes, 350); };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-[#1a8a6e] tracking-wider uppercase mb-3">Website Development</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#000066] mb-3">Build Your Digital Foundation</h2>
        <div className="w-12 h-1 bg-[#1a8a6e] rounded-full mx-auto mb-4" />
        <p className="text-base text-gray-500 max-w-xl mx-auto">Here's everything you need to know before we get started.</p>
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {sections.map((sec, i) => (
          <motion.div key={sec.heading} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#e79d1a]/40 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-[#eef1ff] flex items-center justify-center mb-4 group-hover:bg-[#fff3d6] transition-colors duration-300">
              <sec.icon className="w-5 h-5 text-[#000066] group-hover:text-[#e79d1a] transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-[#000066] mb-3">{sec.heading}</h3>
            <ul className="space-y-2">
              {sec.points.map((pt, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1a8a6e] flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>
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
