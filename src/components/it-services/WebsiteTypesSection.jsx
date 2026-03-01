import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, ShoppingCart, GraduationCap, LayoutDashboard, BookOpen, Users, MousePointerClick, ChevronLeft, ChevronRight } from 'lucide-react';

const cardThemes = {
  informational: {
    accent: '#3B82F6',
    iconBgClass: 'bg-[#EFF6FF]',
    iconColor: '#3B82F6',
    hoverGlowClass: 'hover:ring-[#3B82F6]/25',
    linkClass: 'text-[#3B82F6]',
  },
  corporate: {
    accent: '#6366F1',
    iconBgClass: 'bg-[#EEF2FF]',
    iconColor: '#6366F1',
    hoverGlowClass: 'hover:ring-[#6366F1]/25',
    linkClass: 'text-[#6366F1]',
    cardBackground: 'linear-gradient(135deg, #ffffff, #eef2ff)',
  },
  ecommerce: {
    accent: '#F59E0B',
    iconBgClass: 'bg-[#FFF7ED]',
    iconColor: '#F59E0B',
    hoverGlowClass: 'hover:ring-[#F59E0B]/25',
    linkClass: 'text-[#F59E0B]',
  },
  portfolio: {
    accent: '#10B981',
    iconBgClass: 'bg-[#ECFDF5]',
    iconColor: '#10B981',
    hoverGlowClass: 'hover:ring-[#10B981]/25',
    linkClass: 'text-[#10B981]',
  },
  blog: {
    accent: '#EAB308',
    iconBgClass: 'bg-[#FEFCE8]',
    iconColor: '#EAB308',
    hoverGlowClass: 'hover:ring-[#EAB308]/25',
    linkClass: 'text-[#EAB308]',
    cardBackground: 'linear-gradient(135deg, #ffffff, #fefce8)',
  },
  educational: {
    accent: '#8B5CF6',
    iconBgClass: 'bg-[#F5F3FF]',
    iconColor: '#8B5CF6',
    hoverGlowClass: 'hover:ring-[#8B5CF6]/25',
    linkClass: 'text-[#8B5CF6]',
  },
  community: {
    accent: '#0EA5E9',
    iconBgClass: 'bg-[#F0F9FF]',
    iconColor: '#0EA5E9',
    hoverGlowClass: 'hover:ring-[#0EA5E9]/25',
    linkClass: 'text-[#0EA5E9]',
  },
  landing: {
    accent: '#F43F5E',
    iconBgClass: 'bg-[#FFF1F2]',
    iconColor: '#F43F5E',
    hoverGlowClass: 'hover:ring-[#F43F5E]/25',
    linkClass: 'text-[#F43F5E]',
    cardBackground: 'linear-gradient(135deg, #ffffff, #fff1f2)',
  },
  portal: {
    accent: '#1E3A8A',
    iconBgClass: 'bg-[#EFF6FF]',
    iconColor: '#1E3A8A',
    hoverGlowClass: 'hover:ring-[#1E3A8A]/25',
    linkClass: 'text-[#1E3A8A]',
  },
};

const websiteTypes = [
  {
    id: 'informational',
    icon: Globe,
    title: 'Informational Websites',
    purpose: 'Share information, not transact',
    examples: 'Company profiles, schools, NGOs, government portals',
    features: ['Static or semi-dynamic pages', 'About, Services, Contact, Policies', 'Minimal user interaction'],
    tech: 'HTML, CSS, basic CMS',
    risk: 'Becomes irrelevant if not updated',
  },
  {
    id: 'corporate',
    icon: Building2,
    title: 'Business / Corporate Websites',
    purpose: 'Establish credibility and generate leads',
    examples: 'IT firms, consultancies, startups',
    features: ['Service pages', 'Lead forms', 'Case studies', 'SEO-focused content'],
    kpi: 'Conversions, inquiries, trust signals',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce Websites',
    purpose: 'Sell products or services online',
    examples: 'Amazon, Flipkart, niche D2C stores',
    features: ['Product catalogue', 'Cart & checkout', 'Payment gateway', 'Order & inventory management'],
    complexity: 'High',
    concerns: 'Security, performance, scalability',
  },
  {
    id: 'portfolio',
    icon: BookOpen,
    title: 'Portfolio Websites',
    purpose: 'Showcase skills and work',
    examples: 'Designers, developers, photographers',
    features: ['Project galleries', 'Resume/CV', 'Contact form'],
    successMetric: 'Clarity + visual impact',
  },
  {
    id: 'blog',
    icon: Globe,
    title: 'Blogging / Content Websites',
    purpose: 'Publish articles and long-form content',
    examples: 'Medium-style blogs, news portals',
    features: ['Categories & tags', 'CMS', 'Comments', 'SEO optimisation'],
    revenue: 'Ads, sponsorships, subscriptions',
  },
  {
    id: 'educational',
    icon: GraduationCap,
    title: 'Educational / E-Learning Websites',
    purpose: 'Teach and assess users',
    examples: 'Online schools, coaching platforms',
    features: ['Courses & lessons', 'Video hosting', 'Quizzes & certificates', 'User progress tracking'],
    advanced: 'LMS, role-based access',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community / Social Websites',
    purpose: 'User interaction and content creation',
    examples: 'Forums, social networks',
    features: ['User profiles', 'Messaging', 'Feeds', 'Moderation tools'],
    challenge: 'Content moderation & scaling',
  },
  {
    id: 'landing',
    icon: MousePointerClick,
    title: 'Landing Pages',
    purpose: 'One action only (sign up, buy, download)',
    features: ['Clear CTA', 'Minimal navigation', 'Conversion-driven copy'],
    usage: 'Used heavily in marketing campaigns',
  },
  {
    id: 'portal',
    icon: LayoutDashboard,
    title: 'Portal Websites',
    purpose: 'Central access point for multiple services',
    examples: 'Employee portals, government service portals',
    features: ['Login-based access', 'Role management', 'Multiple subsystems'],
    architecture: 'Architecture-heavy',
  },
];

export default function WebsiteTypesSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToCard = (index) => {
    const clamped = Math.max(0, Math.min(index, websiteTypes.length - 1));
    const card = scrollRef.current?.querySelector(`[data-index="${clamped}"]`);
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setActiveIndex(clamped);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const containerRect = scrollRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cards = Array.from(scrollRef.current.querySelectorAll('[data-index]'));

    let nearestIndex = activeIndex;
    let minDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = Number(card.getAttribute('data-index'));
      }
    });

    if (nearestIndex !== activeIndex) {
      setActiveIndex(nearestIndex);
    }
  };

  return (
    <section id="website-types" className="py-20 px-6 lg:px-12 bg-[#f8f9fb]">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-sm font-semibold text-[#1a8a6e] tracking-wider uppercase mb-3">Website Types</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#000066] mb-3">What Are You Looking For?</h2>
          <div className="w-12 h-1 bg-[#eef4f3] rounded-full mx-auto mb-4" />
          <p className="text-base text-gray-500 max-w-2xl mx-auto">Choose your ideal website format through an interactive carousel. Center cards stay in focus while side cards stay subtle for fast comparison.</p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8f9fb] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8f9fb] to-transparent z-10" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-visible px-2 md:px-8 pb-6 pt-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {websiteTypes.map((type, index) => {
              const theme = cardThemes[type.id];
              const offset = index - activeIndex;
              const distance = Math.abs(offset);
              const isCenter = distance === 0;
              const isLeft = offset < 0;

              const rotateY = isCenter ? 0 : isLeft ? Math.min(20 + (distance - 1) * 6, 30) : -Math.min(20 + (distance - 1) * 6, 30);
              const translateX = isCenter ? 0 : isLeft ? -Math.min(40 + (distance - 1) * 14, 70) : Math.min(40 + (distance - 1) * 14, 70);
              const scale = isCenter ? 1 : distance === 1 ? 0.9 : 0.84;
              const opacity = isCenter ? 1 : distance === 1 ? 0.6 : 0.38;
              const depth = isCenter ? 52 : distance === 1 ? 10 : -20;

              return (
                <motion.div
                  key={type.id}
                  data-index={index}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  animate={{
                    scale,
                    opacity,
                    y: isCenter ? 0 : 8,
                    x: translateX,
                    z: depth,
                    rotateY,
                  }}
                  className="snap-center shrink-0 w-[82%] sm:w-[56%] lg:w-[34%] xl:w-[24%]"
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: Math.max(1, 20 - distance),
                    transition: 'all 0.4s ease',
                    willChange: 'transform, opacity',
                  }}
                >
                  <button
                    onClick={() => goToCard(index)}
                    className={`group w-full text-left h-full p-5 rounded-2xl border border-gray-100 border-l-4 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out ${theme.hoverGlowClass} ${isCenter ? 'ring-2 ring-[#1a8a6e]/20' : ''}`}
                    style={{
                      borderLeftColor: theme.accent,
                      background: theme.cardBackground || '#ffffff',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.iconBgClass}`}>
                        <type.icon className="w-5 h-5" color={theme.iconColor} strokeWidth={2.3} />
                      </div>
                      <h3 className="font-semibold text-[#000066] leading-snug">{type.title}</h3>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-1">Purpose</p>
                        <p className="text-gray-900 leading-relaxed">{type.purpose}</p>
                      </div>

                      {type.examples && (
                        <div>
                          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-1">Examples</p>
                          <p className="text-gray-900 leading-relaxed">{type.examples}</p>
                        </div>
                      )}

                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-1">Key Features</p>
                        <ul className="space-y-1.5">
                          {type.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-gray-900 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: theme.accent }} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {(type.tech || type.risk || type.kpi || type.complexity || type.concerns || type.successMetric || type.revenue || type.advanced || type.challenge || type.usage || type.architecture) && (
                        <div className="p-3 rounded-xl bg-[#f8f9fb] border border-[#e9edfb] space-y-1.5 text-xs sm:text-sm">
                          {type.tech && <p><span className="font-semibold text-[#000066]">Typical tech:</span> <span className="text-gray-600">{type.tech}</span></p>}
                          {type.risk && <p><span className="font-semibold text-[#000066]">Risk:</span> <span className="text-gray-600">{type.risk}</span></p>}
                          {type.kpi && <p><span className="font-semibold text-[#000066]">KPIs:</span> <span className="text-gray-600">{type.kpi}</span></p>}
                          {type.complexity && <p><span className="font-semibold text-[#000066]">Complexity:</span> <span className="text-gray-600">{type.complexity}</span></p>}
                          {type.concerns && <p><span className="font-semibold text-[#000066]">Critical concerns:</span> <span className="text-gray-600">{type.concerns}</span></p>}
                          {type.successMetric && <p><span className="font-semibold text-[#000066]">Success metric:</span> <span className="text-gray-600">{type.successMetric}</span></p>}
                          {type.revenue && <p><span className="font-semibold text-[#000066]">Revenue models:</span> <span className="text-gray-600">{type.revenue}</span></p>}
                          {type.advanced && <p><span className="font-semibold text-[#000066]">Advanced:</span> <span className="text-gray-600">{type.advanced}</span></p>}
                          {type.challenge && <p><span className="font-semibold text-[#000066]">Biggest challenge:</span> <span className="text-gray-600">{type.challenge}</span></p>}
                          {type.usage && <p><span className="font-semibold text-[#000066]">Note:</span> <span className="text-gray-600">{type.usage}</span></p>}
                          {type.architecture && <p><span className="font-semibold text-[#000066]">Architecture:</span> <span className="text-gray-600">{type.architecture}</span></p>}
                        </div>
                      )}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => goToCard(activeIndex - 1)}
              className="w-9 h-9 rounded-full border border-[#e4e8f5] bg-white flex items-center justify-center text-[#000066] hover:bg-[#f3f6ff] transition-colors"
              aria-label="Previous website type"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {websiteTypes.map((type, index) => (
                <button
                  key={type.id}
                  onClick={() => goToCard(index)}
                  aria-label={`Go to ${type.title}`}
                  className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-[#1a8a6e]' : 'w-2 bg-[#cfd8f6]'}`}
                />
              ))}
            </div>

            <button
              onClick={() => goToCard(activeIndex + 1)}
              className="w-9 h-9 rounded-full border border-[#e4e8f5] bg-white flex items-center justify-center text-[#000066] hover:bg-[#f3f6ff] transition-colors"
              aria-label="Next website type"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
