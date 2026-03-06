import React, { useEffect, useRef, useState } from 'react';
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

const tintWithAlpha = (hexColor, alpha = 0.12) => {
  const normalized = hexColor.replace('#', '');
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const clampChannel = (value) => Math.max(0, Math.min(255, value));

const adjustHexColor = (hexColor, delta) => {
  const normalized = hexColor.replace('#', '');
  const red = clampChannel(Number.parseInt(normalized.slice(0, 2), 16) + delta);
  const green = clampChannel(Number.parseInt(normalized.slice(2, 4), 16) + delta);
  const blue = clampChannel(Number.parseInt(normalized.slice(4, 6), 16) + delta);

  return `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
};

const activeCardGradient = (hexColor) =>
  `linear-gradient(180deg, #000000 0%, #000000 34%, ${adjustHexColor(hexColor, -110)} 56%, ${adjustHexColor(hexColor, -68)} 70%, ${adjustHexColor(hexColor, -28)} 82%, ${adjustHexColor(hexColor, 18)} calc(100% - 30px), #ffffff calc(100% - 20px), #ffffff 100%)`;

const educationalActiveGradient =
  'linear-gradient(180deg, #000000 0%, #000000 34%, #160826 56%, #2b0f4a 72%, #4c1d95 84%, #8b5cf6 93%, #ece4ff 98%, #ffffff 100%)';

const educationalOverlayGradient =
  'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 55%, rgba(255,255,255,0) 100%)';

const activeCardGlow = (hexColor) =>
  `0 20px 60px rgba(0,0,0,0.5), 0 0 60px ${tintWithAlpha(hexColor, 0.35)}`;

const activeOverlayGradient = (hexColor) =>
  `linear-gradient(135deg, #000000 20%, ${tintWithAlpha(hexColor, 0.4)} 80%)`;

export default function WebsiteTypesSection() {
  const scrollRef = useRef(null);
  const scrollEndTimerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const centerCard = (index, behavior = 'smooth') => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector(`[data-index="${index}"]`);
    if (!card) return;

    const targetLeft = card.offsetLeft + card.offsetWidth / 2 - container.clientWidth / 2;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const clampedLeft = Math.max(0, Math.min(targetLeft, maxScrollLeft));

    container.scrollTo({ left: clampedLeft, behavior });
  };

  const goToCard = (index) => {
    const clamped = Math.max(0, Math.min(index, websiteTypes.length - 1));
    centerCard(clamped, 'smooth');
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

    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = setTimeout(() => {
      centerCard(nearestIndex, 'smooth');
    }, 90);
  };

  useEffect(() => {
    const handleResize = () => {
      centerCard(activeIndex, 'auto');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [activeIndex]);

  return (
    <section
      id="website-types"
      className="relative overflow-hidden py-[120px] px-6 lg:px-12"
      style={{
        background: '#000000',
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(255,184,0,0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
          zIndex: 0,
        }}
      />
      <div className="relative z-10 container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-[42px] font-bold text-white tracking-[-0.02em] mb-3">Choose the Right Website for Your Business</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#e79d1a] to-[#fff4d6] rounded-full mx-auto mb-4" />
          <p className="text-[17px] text-white/75 max-w-2xl mx-auto">Choose your ideal website format through an interactive carousel. Center cards stay in focus while side cards stay subtle for fast comparison.</p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050b1f] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050b1f] to-transparent z-10" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-visible px-2 md:px-8 pb-6 pt-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {websiteTypes.map((type, index) => {
              const theme = cardThemes[type.id];
              const isEducational = type.id === 'educational';
              const offset = index - activeIndex;
              const distance = Math.abs(offset);
              const isCenter = distance === 0;
              const isActiveNonEducational = isCenter && !isEducational;
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
                  className="snap-center snap-always shrink-0 w-[82%] sm:w-[56%] lg:w-[34%] xl:w-[24%]"
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: Math.max(1, 20 - distance),
                    transition: 'all 0.4s ease',
                    willChange: 'transform, opacity',
                  }}
                >
                  <button
                    onClick={() => goToCard(index)}
                    className={`group relative overflow-hidden w-full text-left h-full p-5 rounded-2xl border border-l-4 transition-all duration-[350ms] ease-out ${theme.hoverGlowClass} ${
                      isCenter ? 'scale-[1.05]' : 'scale-100'
                    }`}
                    style={{
                      borderLeftColor: theme.accent,
                      borderColor: isCenter ? tintWithAlpha(theme.accent, 0.25) : 'rgba(0,0,0,0.05)',
                      borderRightColor: 'transparent',
                      background: isCenter
                        ? type.id === 'educational'
                          ? educationalActiveGradient
                          : activeCardGradient(theme.accent)
                        : '#ffffff',
                      boxShadow: isCenter ? activeCardGlow(theme.accent) : '0 10px 30px rgba(0,0,0,0.15)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {isCenter && (
                      <div
                        className="pointer-events-none absolute w-[140%] h-[120%] -top-[20%] -left-[20%] rounded-[60px] opacity-60"
                        style={{
                          background: isEducational ? educationalOverlayGradient : activeOverlayGradient(theme.accent),
                          transform: isEducational ? 'rotate(0deg)' : 'rotate(-12deg)',
                          opacity: isEducational ? 0.3 : 0.36,
                        }}
                      />
                    )}

                    {isCenter && type.id !== 'educational' && (
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[36px]"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 42%, #ffffff 65%, #ffffff 100%)',
                        }}
                      />
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isCenter ? 'bg-white/10 border border-white/15' : theme.iconBgClass
                        }`}
                      >
                        <type.icon className="w-5 h-5" color={isActiveNonEducational ? adjustHexColor(theme.accent, 42) : theme.iconColor} strokeWidth={2.3} />
                      </div>
                      <h3 className={`font-semibold leading-snug ${isCenter ? (isActiveNonEducational ? 'text-white' : 'text-white') : 'text-[#000066]'}`}>{type.title}</h3>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-1 ${isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-300') : 'text-gray-500'}`}>Purpose</p>
                        <p className={`${isCenter ? (isActiveNonEducational ? 'text-white' : 'text-gray-100') : 'text-gray-900'} leading-relaxed`}>{type.purpose}</p>
                      </div>

                      {type.examples && (
                        <div>
                          <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-1 ${isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-300') : 'text-gray-500'}`}>Examples</p>
                          <p className={`${isCenter ? (isActiveNonEducational ? 'text-white' : 'text-gray-100') : 'text-gray-900'} leading-relaxed`}>{type.examples}</p>
                        </div>
                      )}

                      <div>
                        <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-1 ${isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-300') : 'text-gray-500'}`}>Key Features</p>
                        <ul className="space-y-1.5">
                          {type.features.map((feature) => (
                            <li key={feature} className={`flex items-start gap-2 ${isCenter ? (isActiveNonEducational ? 'text-white' : 'text-gray-100') : 'text-gray-900'} leading-relaxed`}>
                              <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: isActiveNonEducational ? adjustHexColor(theme.accent, 42) : theme.accent }} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {(type.tech || type.risk || type.kpi || type.complexity || type.concerns || type.successMetric || type.revenue || type.advanced || type.challenge || type.usage || type.architecture) && (
                        <div
                          className="p-3 rounded-xl border space-y-1.5 text-xs sm:text-sm transition-colors duration-300"
                          style={{
                            backgroundColor: isCenter ? tintWithAlpha(theme.accent, 0.12) : 'transparent',
                            borderColor: isCenter ? tintWithAlpha(theme.accent, 0.24) : 'transparent',
                          }}
                        >
                          {type.tech && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Typical tech:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.tech}</span></p>}
                          {type.risk && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Risk:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.risk}</span></p>}
                          {type.kpi && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>KPIs:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.kpi}</span></p>}
                          {type.complexity && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Complexity:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.complexity}</span></p>}
                          {type.concerns && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Critical concerns:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.concerns}</span></p>}
                          {type.successMetric && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Success metric:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.successMetric}</span></p>}
                          {type.revenue && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Revenue models:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.revenue}</span></p>}
                          {type.advanced && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Advanced:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.advanced}</span></p>}
                          {type.challenge && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Biggest challenge:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.challenge}</span></p>}
                          {type.usage && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Note:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.usage}</span></p>}
                          {type.architecture && <p><span className={isCenter ? 'font-semibold text-white' : 'font-semibold text-[#000066]'}>Architecture:</span> <span className={isCenter ? (isActiveNonEducational ? 'text-gray-100' : 'text-gray-200') : 'text-gray-600'}>{type.architecture}</span></p>}
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
