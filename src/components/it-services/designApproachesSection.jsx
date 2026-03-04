import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Paintbrush, Sparkles, Check, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import itTypeVideo from '../../../asset/ittype.mp4';

const approaches = [
  {
    id: 'template', icon: Layers, title: 'Template-Based', subtitle: 'Quick & Budget-Friendly',
    description: 'Pre-built designs customized with your content and branding. Fast turnaround at the lowest cost.',
    pros: ['Fastest delivery time', 'Most affordable option', 'Proven design patterns'],
    cons: ['Limited uniqueness', 'Constrained layouts', 'Generic feel possible'],
    verdict: 'Great for startups and MVPs needing quick market entry.',
    priceRange: '₹20K – ₹80K', timeline: '2–4 weeks', featured: false,
  },
  {
    id: 'semi-custom', icon: Paintbrush, title: 'Semi-Custom', subtitle: 'Best Value — Recommended',
    description: 'Custom design elements built on proven frameworks. The perfect balance of uniqueness and efficiency.',
    pros: ['Unique brand presence', 'Flexible customization', 'Optimized development time', 'Cost-effective quality'],
    cons: ['Some framework constraints'],
    verdict: 'Ideal for most businesses seeking professional, distinctive websites.',
    priceRange: '₹80K – ₹5L', timeline: '4–10 weeks', featured: true,
  },
  {
    id: 'fully-custom', icon: Sparkles, title: 'Fully Custom', subtitle: 'Unique & Premium',
    description: 'Every element designed and built from scratch. Complete creative freedom for truly unique experiences.',
    pros: ['100% unique design', 'No limitations', 'Premium brand positioning', 'Cutting-edge features'],
    cons: ['Higher investment', 'Longer timeline', 'More revision cycles'],
    verdict: 'Perfect for brands requiring a distinctive, award-worthy digital presence.',
    priceRange: '₹5L – ₹25L+', timeline: '8–20 weeks', featured: false,
  },
];

export default function DesignApproachesSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 px-6 lg:px-12">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={itTypeVideo} type="video/mp4" />
      </video>

      <div className="relative container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-4">Choose the Right Development Approach for Your Business</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#e79d1a] to-[#fff4d6] rounded-full mx-auto mb-4" />
          <p className="text-base text-gray-300 max-w-2xl mx-auto">Flexible development paths designed around your goals and investment.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {approaches.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                'w-full transition-all duration-300',
                i === 1 ? 'lg:scale-[1.06] lg:z-[2]' : 'lg:scale-[0.98] lg:opacity-90'
              )}
            >
              <div
                className={cn(
                  'relative rounded-[18px] p-6 lg:p-7 min-h-[520px] h-full flex flex-col justify-between border transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)]',
                  a.featured
                    ? 'bg-[#0F172A] border-[rgba(231,157,26,0.6)] shadow-[0_30px_90px_rgba(231,157,26,0.25)]'
                    : 'bg-[#0B1220] border-[#6b7280]/55 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-[#9ca3af]/70'
                )}
              >
              {a.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-[14px] py-[6px] bg-[#e79d1a] rounded-full text-black text-sm font-semibold shadow">
                    <Star className="w-3.5 h-3.5 fill-current" /> Recommended
                  </div>
                </div>
              )}

              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5 border", a.featured ? "bg-[#e79d1a]/15 border-[#e79d1a]/40" : "bg-white/10 border-white/10")}>
                <a.icon className={cn("w-6 h-6", a.featured ? "text-[#f6c264]" : "text-white")} />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{a.title}</h3>
              <p className={cn("text-sm font-semibold mb-4", a.featured ? "text-[#e79d1a]" : "text-[#9ad0c3]")}>{a.subtitle}</p>
              <p className="text-sm mb-6 leading-relaxed text-gray-300">{a.description}</p>

              <div className="space-y-4 mb-6 flex-1">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">Advantages</p>
                  <ul className="space-y-1.5">
                    {a.pros.map(p => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", a.featured ? "text-[#e79d1a]" : "text-[#7bd1b8]")} />
                        <span className="text-gray-200">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">Considerations</p>
                  <ul className="space-y-1.5">
                    {a.cons.map(c => (
                      <li key={c} className="flex items-start gap-2 text-sm">
                        <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span className="text-gray-400">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={cn("p-3.5 rounded-xl mb-6 text-sm italic", a.featured ? "bg-[#e79d1a]/12 text-[#ffe1aa]" : "bg-white/5 text-gray-300")}>
                "{a.verdict}"
              </div>

              <div className="mt-auto pt-5 border-t border-white/10 flex justify-between text-sm">
                <div>
                  <p className="text-gray-400">Investment</p>
                  <p className="font-bold mt-0.5 text-white">{a.priceRange}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Timeline</p>
                  <p className="font-bold mt-0.5 text-white">{a.timeline}</p>
                </div>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
