import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, ShoppingCart, GraduationCap, LayoutDashboard, Check, BookOpen, Users, MousePointerClick } from 'lucide-react';

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
  { id: 'informational', icon: Globe, title: 'Informational Websites', purpose: 'Share information, not transact.', examples: 'Company profiles, schools, NGOs, government portals', features: ['Static or semi-dynamic pages', 'About, Services, Contact, Policies', 'Minimal user interaction', 'Typical tech: HTML, CSS, basic CMS'], risk: 'Becomes irrelevant if not updated', complexity: 1 },
  { id: 'corporate', icon: Building2, title: 'Business / Corporate Websites', purpose: 'Establish credibility and generate leads.', examples: 'IT firms, consultancies, startups', features: ['Service pages', 'Lead forms', 'Case studies', 'SEO-focused content'], kpi: 'Conversions, inquiries, trust signals', complexity: 2 },
  { id: 'ecommerce', icon: ShoppingCart, title: 'E-commerce Websites', purpose: 'Sell products or services online.', examples: 'Amazon, Flipkart, niche D2C stores', features: ['Product catalogue', 'Cart & checkout', 'Payment gateway', 'Order & inventory management'], note: 'Complexity: High. Critical concerns: Security, performance, scalability.', complexity: 4 },
  { id: 'portfolio', icon: BookOpen, title: 'Portfolio Websites', purpose: 'Showcase skills and work.', examples: 'Designers, developers, photographers', features: ['Project galleries', 'Resume / CV', 'Contact form'], kpi: 'Clarity + visual impact', complexity: 1 },
  { id: 'blog', icon: Globe, title: 'Blogging / Content Websites', purpose: 'Publish articles and long-form content.', examples: 'Medium-style blogs, news portals', features: ['Categories & tags', 'CMS', 'Comments', 'SEO optimisation'], note: 'Revenue models: Ads, sponsorships, subscriptions', complexity: 2 },
  { id: 'educational', icon: GraduationCap, title: 'Educational / E-Learning Websites', purpose: 'Teach and assess users.', examples: 'Online schools, coaching platforms', features: ['Courses & lessons', 'Video hosting', 'Quizzes & certificates', 'User progress tracking'], note: 'Advanced: LMS, role-based access', complexity: 4 },
  { id: 'community', icon: Users, title: 'Community / Social Websites', purpose: 'User interaction and content creation.', examples: 'Forums, social networks', features: ['User profiles', 'Messaging', 'Feeds', 'Moderation tools'], note: 'Biggest challenge: Content moderation & scaling', complexity: 5 },
  { id: 'landing', icon: MousePointerClick, title: 'Landing Pages', purpose: 'One action only (sign up, buy, download).', examples: 'Marketing campaigns, product launches', features: ['Clear CTA', 'Minimal navigation', 'Conversion-driven copy'], note: 'Used heavily in marketing campaigns', complexity: 1 },
  { id: 'portal', icon: LayoutDashboard, title: 'Portal Websites', purpose: 'Central access point for multiple services.', examples: 'Employee portals, government service portals', features: ['Login-based access', 'Role management', 'Multiple subsystems'], note: 'Architecture-heavy', complexity: 5 },
];

export default function WebsiteTypesSection() {
  return (
    <section id="website-types" className="py-20 px-6 lg:px-12 bg-[#f8f9fb]">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-sm font-semibold text-[#1a8a6e] tracking-wider uppercase mb-3">Website Types</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#000066] mb-3">What Are You Looking For?</h2>
          <div className="w-12 h-1 bg-[#eef4f3] rounded-full mx-auto mb-4" />
          <p className="text-base text-gray-500 max-w-2xl mx-auto">Different goals require different solutions. Explore all website types with their purpose, features, and best use cases.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websiteTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="h-full"
            >
              {(() => {
                const theme = cardThemes[type.id];
                return (
                  <div
                    className={`group h-full p-6 rounded-2xl border border-gray-100 border-l-4 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] hover:ring-2 ${theme.hoverGlowClass} transition-all duration-300 ease-out`}
                    style={{
                      borderLeftColor: theme.accent,
                      background: theme.cardBackground || '#ffffff',
                    }}
                  >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`icon w-11 h-11 rounded-xl flex items-center justify-center ${theme.iconBgClass} transition-transform duration-300 group-hover:scale-110`}>
                    <type.icon className="w-[22px] h-[22px]" color={theme.iconColor} strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#000066] leading-snug">{type.title}</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="mb-3">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-1">Purpose</p>
                    <p className="text-sm text-gray-900">{type.purpose}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-1">Examples</p>
                    <p className="text-sm text-gray-900">{type.examples}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-2">Key Features</p>
                    <div className="space-y-1.5">
                      {type.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 flex-shrink-0" color="#16A34A" strokeWidth={2.7} />
                          <span className="text-sm text-gray-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(type.note || type.kpi || type.risk) && (
                    <div className="p-3 rounded-xl bg-[#f8f9fb] border border-[#eef1ff]">
                      <span className="font-semibold text-[#000066] text-sm">Note: </span>
                      <span className="text-gray-500 text-sm">{type.note || type.kpi || type.risk}</span>
                    </div>
                  )}

                </div>
              </div>
                );
              })()}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
