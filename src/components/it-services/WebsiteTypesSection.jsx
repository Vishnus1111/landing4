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
  { id: 'informational', icon: Globe, title: 'Informational', preview: 'Service overview + trust pages', featureHint: 'Best for: brochures, institutions', priceHint: 'Starts at ₹35k' },
  { id: 'corporate', icon: Building2, title: 'Corporate', preview: 'Lead-driven company profile', featureHint: 'Includes: case studies + inquiry flow', priceHint: 'Starts at ₹55k' },
  { id: 'ecommerce', icon: ShoppingCart, title: 'E-commerce', preview: 'Catalog, cart, and secure checkout', featureHint: 'Includes: payments + inventory', priceHint: 'Starts at ₹95k' },
  { id: 'portfolio', icon: BookOpen, title: 'Portfolio', preview: 'Project-first personal brand site', featureHint: 'Best for: creators and freelancers', priceHint: 'Starts at ₹30k' },
  { id: 'blog', icon: Globe, title: 'Blog / Content', preview: 'CMS-ready publishing experience', featureHint: 'Includes: SEO structure + taxonomy', priceHint: 'Starts at ₹45k' },
  { id: 'educational', icon: GraduationCap, title: 'E-Learning', preview: 'Courses, progress, and learner UX', featureHint: 'Includes: lessons + assessments', priceHint: 'Starts at ₹1.2L' },
  { id: 'community', icon: Users, title: 'Community', preview: 'User profiles with engagement loops', featureHint: 'Includes: feed + moderation basics', priceHint: 'Starts at ₹1.5L' },
  { id: 'landing', icon: MousePointerClick, title: 'Landing Page', preview: 'Single-goal conversion experience', featureHint: 'Includes: CTA blocks + analytics setup', priceHint: 'Starts at ₹25k' },
  { id: 'portal', icon: LayoutDashboard, title: 'Portal', preview: 'Role-based dashboard workflows', featureHint: 'Includes: auth + multi-module access', priceHint: 'Starts at ₹1.8L' },
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

                    <div className="rounded-xl border border-[#e8ecf7] bg-white overflow-hidden mb-4">
                      <div className="h-8 px-3 flex items-center gap-1.5 border-b border-[#eef2ff] bg-[#f8faff]">
                        <span className="w-2 h-2 rounded-full bg-[#dbe4ff]" />
                        <span className="w-2 h-2 rounded-full bg-[#dbe4ff]" />
                        <span className="w-2 h-2 rounded-full bg-[#dbe4ff]" />
                      </div>
                      <div className="p-3 space-y-2.5">
                        <div className="h-2.5 rounded-full bg-[#edf2ff] w-[75%]" />
                        <div className="h-2.5 rounded-full bg-[#edf2ff] w-[60%]" />
                        <div className="h-8 rounded-lg" style={{ backgroundColor: `${theme.accent}22` }} />
                      </div>
                    </div>

                    <p className="text-sm text-gray-900 mb-2">{type.preview}</p>
                    <p className="text-xs text-gray-500 mb-3">{type.featureHint}</p>
                    <p className="text-sm font-semibold" style={{ color: theme.accent }}>{type.priceHint}</p>
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
