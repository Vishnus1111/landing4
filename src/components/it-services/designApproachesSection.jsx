import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Paintbrush, Sparkles, Check, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <section className="py-20 px-6 lg:px-12 bg-[linear-gradient(180deg,_#F8FAFC,_#EEF2FF)]">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-sm font-semibold text-[#1a8a6e] tracking-wider uppercase mb-3">Development Approaches</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#000066] mb-3">Choose Your Path</h2>
          <div className="w-12 h-1 bg-[#1a8a6e] rounded-full mx-auto mb-4" />
          <p className="text-base text-gray-500 max-w-2xl mx-auto">Flexible approaches to match your goals and investment — from budget-friendly templates to fully custom builds.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {approaches.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={cn("relative rounded-2xl p-8 transition-all duration-300 border-2 h-full flex flex-col",
                a.featured
                  ? "bg-[#000066] text-white border-[#000066] shadow-xl"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-[#e79d1a]/40"
              )}>
              {a.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1.5 bg-[#e79d1a] rounded-full text-white text-sm font-semibold shadow">
                    <Star className="w-3.5 h-3.5 fill-current" /> Recommended
                  </div>
                </div>
              )}

              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5", a.featured ? "bg-white/10" : "bg-[#eef1ff]")}>
                <a.icon className={cn("w-6 h-6", a.featured ? "text-[#e79d1a]" : "text-[#000066]")} />
              </div>

              <h3 className={cn("text-lg font-bold mb-1", a.featured ? "text-white" : "text-[#000066]")}>{a.title}</h3>
              <p className={cn("text-sm font-semibold mb-4", a.featured ? "text-[#e79d1a]" : "text-[#1a8a6e]")}>{a.subtitle}</p>
              <p className={cn("text-sm mb-6 leading-relaxed", a.featured ? "text-blue-200" : "text-gray-500")}>{a.description}</p>

              <div className="space-y-4 mb-6 flex-1">
                <div>
                  <p className={cn("text-xs font-semibold uppercase tracking-wider mb-2", a.featured ? "text-blue-300" : "text-gray-400")}>Advantages</p>
                  <ul className="space-y-1.5">
                    {a.pros.map(p => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", a.featured ? "text-[#e79d1a]" : "text-[#1a8a6e]")} />
                        <span className={a.featured ? "text-blue-100" : "text-gray-700"}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={cn("text-xs font-semibold uppercase tracking-wider mb-2", a.featured ? "text-blue-300" : "text-gray-400")}>Considerations</p>
                  <ul className="space-y-1.5">
                    {a.cons.map(c => (
                      <li key={c} className="flex items-start gap-2 text-sm">
                        <X className={cn("w-4 h-4 mt-0.5 flex-shrink-0", a.featured ? "text-blue-400" : "text-gray-300")} />
                        <span className={a.featured ? "text-blue-300" : "text-gray-500"}>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={cn("p-3.5 rounded-xl mb-6 text-sm italic", a.featured ? "bg-white/8 text-blue-200" : "bg-[#f8f9fb] text-gray-500")}>
                "{a.verdict}"
              </div>

              <div className={cn("mt-auto pt-5 border-t flex justify-between text-sm", a.featured ? "border-white/10" : "border-gray-100")}>
                <div>
                  <p className={a.featured ? "text-blue-300" : "text-gray-400"}>Investment</p>
                  <p className={cn("font-bold mt-0.5", a.featured ? "text-white" : "text-[#000066]")}>{a.priceRange}</p>
                </div>
                <div className="text-right">
                  <p className={a.featured ? "text-blue-300" : "text-gray-400"}>Timeline</p>
                  <p className={cn("font-bold mt-0.5", a.featured ? "text-white" : "text-[#000066]")}>{a.timeline}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
