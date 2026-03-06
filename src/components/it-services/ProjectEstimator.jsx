import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Check, ChevronLeft, ChevronRight, Calculator, IndianRupee, MessageCircle, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContactPopup } from './ContactForm';

// Indian market pricing data: [min, max] in Lakhs
const pricingData = {
  landing: {
    big:    { template: [0.8, 1.5],   semi: [1.5, 3],    full: [3, 6] },
    medium: { template: [0.4, 0.8],   semi: [0.8, 1.8],  full: [1.8, 3.5] },
    new:    { template: [0.2, 0.4],   semi: [0.4, 0.9],  full: [0.9, 2] },
    freelancer: { template: [0.1, 0.25], semi: [0.25, 0.6], full: [0.6, 1.2] },
  },
  informational: {
    big:    { template: [1.5, 3],    semi: [3, 6],     full: [6, 12] },
    medium: { template: [0.8, 1.8],  semi: [1.8, 4],   full: [4, 8] },
    new:    { template: [0.4, 0.9],  semi: [0.9, 2],   full: [2, 4] },
    freelancer: { template: [0.25, 0.6], semi: [0.6, 1.5], full: [1.5, 3] },
  },
  corporate: {
    big:    { template: [3, 6],     semi: [6, 12],    full: [12, 25] },
    medium: { template: [1.8, 4],   semi: [4, 9],     full: [9, 18] },
    new:    { template: [0.9, 2],   semi: [2, 5],     full: [5, 10] },
    freelancer: { template: [0.6, 1.5], semi: [1.5, 4], full: [4, 8] },
  },
  ecommerce: {
    big:    { template: [6, 12],    semi: [12, 25],   full: [25, 60] },
    medium: { template: [4, 9],     semi: [9, 18],    full: [18, 40] },
    new:    { template: [2, 5],     semi: [5, 12],    full: [12, 25] },
    freelancer: { template: [1.5, 4],   semi: [4, 8],   full: [8, 18] },
  },
  educational: {
    big:    { template: [8, 15],    semi: [15, 30],   full: [30, 70] },
    medium: { template: [5, 10],    semi: [10, 22],   full: [22, 45] },
    new:    { template: [2.5, 6],   semi: [6, 15],    full: [15, 30] },
    freelancer: { template: [2, 4],     semi: [4, 10],  full: [10, 20] },
  },
  portal: {
    big:    { template: [15, 30],   semi: [30, 60],   full: [60, 150] },
    medium: { template: [10, 20],   semi: [20, 40],   full: [40, 80] },
    new:    { template: [5, 12],    semi: [12, 25],   full: [25, 50] },
    freelancer: { template: [4, 8],     semi: [8, 18],  full: [18, 35] },
  },
};

const websiteTypes = [
  { id: 'landing', label: 'Landing Page', description: 'Single page, one clear action — sign up, buy, download.', purpose: 'One action only (sign up, buy, download)', examples: 'Marketing campaigns, product launches', features: ['Clear CTA', 'Minimal navigation', 'Conversion-driven copy'], category: 'landing' },
  { id: 'informational', label: 'Informational / Portfolio', description: 'Share information, showcase work — not for transactions.', purpose: 'Share information, not transact', examples: 'Company profiles, schools, NGOs, government portals', features: ['Static or semi-dynamic pages', 'About, Services, Contact, Policies', 'Minimal user interaction'], category: 'informational' },
  { id: 'corporate', label: 'Business / Corporate', description: 'Establish credibility, generate leads and inquiries.', purpose: 'Establish credibility and generate leads', examples: 'IT firms, consultancies, startups', features: ['Service pages', 'Lead forms', 'Case studies', 'SEO-focused content'], category: 'corporate' },
  { id: 'ecommerce', label: 'E-commerce', description: 'Sell products or services online with full shopping experience.', purpose: 'Sell products or services online', examples: 'Amazon-style stores, niche D2C brands', features: ['Product catalogue', 'Cart & checkout', 'Payment gateway', 'Order & inventory management'], category: 'ecommerce' },
  { id: 'blog', label: 'Blogging / Content', description: 'Publish articles, long-form content, and media.', purpose: 'Publish articles and long-form content', examples: 'News portals, Medium-style blogs', features: ['Categories & tags', 'CMS', 'Comments', 'SEO optimisation'], category: 'informational' },
  { id: 'educational', label: 'Educational / E-Learning', description: 'Teach and assess users with structured courses.', purpose: 'Teach and assess users', examples: 'Online schools, coaching platforms, LMS', features: ['Courses & lessons', 'Video hosting', 'Quizzes & certificates', 'User progress tracking'], category: 'educational' },
  { id: 'community', label: 'Community / Social', description: 'User interaction, content creation, and community building.', purpose: 'User interaction and content creation', examples: 'Forums, social networks', features: ['User profiles', 'Messaging', 'Feeds', 'Moderation tools'], category: 'portal' },
  { id: 'portal', label: 'Portal / Web App', description: 'Central access point for multiple services and user roles.', purpose: 'Central access for multiple services', examples: 'Employee portals, government service portals, SaaS dashboards', features: ['Login-based access', 'Role management', 'Multiple subsystems', 'API integrations'], category: 'portal' },
];

const designApproaches = [
  { id: 'template', name: 'Template-Based', subtitle: 'Quick & Budget-Friendly', verdict: 'Good only if the website is not central to your business model.', pros: ['Lowest cost', 'Fastest delivery', 'Proven layouts'], cons: ['Looks generic', 'Limited flexibility', 'Hard to scale'] },
  { id: 'semi', name: 'Semi-Customised', subtitle: 'Best Value — Recommended', verdict: 'This is the sweet spot for most serious businesses.', pros: ['Balanced cost vs value', 'Faster than full custom', 'Easier future expansion'], cons: ['Still limited by base template', 'Requires disciplined UX decisions'] },
  { id: 'full', name: 'Fully Customised', subtitle: 'Unique & Premium', verdict: 'Only do this when the business cannot function without it.', pros: ['Complete control', 'Best UX & performance', 'Scales cleanly', 'No design limitations'], cons: ['Highest cost', 'Longer timelines', 'Needs strong product thinking'] },
];

const formatINR = (lakhs) => {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)}Cr`;
  if (lakhs >= 1) return `₹${lakhs}L`;
  return `₹${Math.round(lakhs * 100000).toLocaleString('en-IN')}`;
};

const steps = [
  { id: 1, title: 'Website Type' },
  { id: 2, title: 'Design Approach' },
  { id: 3, title: 'Business Questions' },
];

// Radio group helper
function RadioOption({ name, value, selected, onChange, label }) {
  return (
    <label className={cn(
      "group relative overflow-hidden flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 backdrop-blur-xl",
      selected === value
        ? "bg-white/10 border-[#e79d1a]/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#e79d1a]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    )}>
      <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#e79d1a]/25 via-transparent to-[#1a8a6e]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <input type="radio" name={name} value={value} checked={selected === value} onChange={() => onChange(value)} className="hidden" />
      <span className={cn(
        "relative z-10 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-300",
        selected === value ? "border-[#e79d1a]" : "border-gray-400 group-hover:border-[#e79d1a]"
      )}>
        {selected === value && <span className="w-2 h-2 rounded-full bg-[#e79d1a]" />}
      </span>
      <span className={cn(
        "relative z-10 text-sm font-medium transition-colors duration-300",
        selected === value ? "text-[#e79d1a]" : "text-gray-200 group-hover:text-[#e79d1a]"
      )}>{label}</span>
    </label>
  );
}

function WebsiteTypeGlowCard({ type, selected, onSelect, gridPointer }) {
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
    <button
      ref={cardRef}
      onClick={() => onSelect(type.id)}
      className="group relative overflow-hidden w-full p-4 rounded-xl border text-left transition-all duration-300 backdrop-blur-xl bg-white/5"
      style={{
        borderColor: selected
          ? '#e79d1a'
          : spotlight.inside
            ? 'rgba(251,191,36,0.3)'
            : 'rgba(255,255,255,0.1)',
        boxShadow: selected
          ? '0 0 0 1px rgba(231,157,26,0.22), 0 0 14px rgba(231,157,26,0.22), 0 12px 28px rgba(0,0,0,0.45)'
          : spotlight.inside
            ? '0 0 0 1px rgba(251,191,36,0.14), 0 0 10px rgba(251,191,36,0.21), 0 0 28px rgba(245,158,11,0.17), 0 0 62px rgba(245,158,11,0.1), 0 12px 30px rgba(0,0,0,0.45)'
            : '0 10px 28px rgba(0,0,0,0.38)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
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
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
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

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="relative z-10 flex-1">
          <h4 className={cn(
            'font-semibold transition-colors duration-300',
            selected ? 'text-[#e79d1a]' : 'text-white'
          )}>{type.label}</h4>
          <p className="text-sm text-gray-300 mt-0.5">{type.description}</p>
          {selected && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-xs font-medium text-[#9ad0c3] mb-1">Examples: {type.examples}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {type.features.map(feature => <span key={feature} className="text-xs bg-white/10 text-gray-200 px-2 py-0.5 rounded-full border border-white/15">{feature}</span>)}
              </div>
            </div>
          )}
        </div>
        <div className={cn(
          'relative z-10 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1 transition-colors duration-300',
          selected ? 'border-[#e79d1a] bg-[#e79d1a]' : 'border-gray-300'
        )}>
          {selected && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
    </button>
  );
}

export default function ProjectEstimator({ estimatorRef }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [sel, setSel] = useState({ websiteType: null, designApproach: null });
  const [bizQ, setBizQ] = useState({ q1: null, q2: null, q2detail: '', q3: null });
  const [estimate, setEstimate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [websiteTypePointer, setWebsiteTypePointer] = useState({ x: 0, y: 0, active: false });
  const orgSizeLabels = {
    big: 'Big Organization',
    medium: 'Medium Organization',
    new: 'New Business',
    freelancer: 'Freelancer',
  };
  const orgOrder = ['big', 'medium', 'new', 'freelancer'];

  useEffect(() => {
    if (sel.websiteType && sel.designApproach) {
      const wt = websiteTypes.find(t => t.id === sel.websiteType);
      const cat = wt.category;
      const categoryPricing = pricingData[cat] || {};
      const rangesByOrg = orgOrder.reduce((acc, orgKey) => {
        const range = categoryPricing?.[orgKey]?.[sel.designApproach];
        if (range) acc[orgKey] = { min: range[0], max: range[1] };
        return acc;
      }, {});

      if (Object.keys(rangesByOrg).length) {
        setEstimate({ rangesByOrg });
      } else {
        setEstimate(null);
      }
    } else {
      setEstimate(null);
    }
  }, [sel]);

  const canProceed = () => {
    if (currentStep === 1) return !!sel.websiteType;
    if (currentStep === 2) return !!sel.designApproach;
    return !!bizQ.q1 && !!bizQ.q2 && !!bizQ.q3;
  };

  const handleWebsiteTypeSelect = (websiteTypeId) => {
    setSel((prev) => ({ ...prev, websiteType: websiteTypeId }));
    setCurrentStep(2);
  };

  const handleDesignApproachSelect = (approachId) => {
    setSel((prev) => ({ ...prev, designApproach: approachId }));
    setCurrentStep(3);
  };

  const handleWebsiteTypePointerMove = (event) => {
    setWebsiteTypePointer({ x: event.clientX, y: event.clientY, active: true });
  };

  const handleWebsiteTypePointerLeave = () => {
    setWebsiteTypePointer((prev) => ({ ...prev, active: false }));
  };

  return (
    <section ref={estimatorRef} className="py-20 px-6 lg:px-12 bg-[#000000] border-t border-gray-700">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Website Cost Estimator</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#e79d1a] to-[#fff4d6] rounded-full mx-auto mb-4" />
          <p className="text-base text-gray-500 max-w-2xl mx-auto">Based on real Indian market pricing. Select your options to get an instant estimate.</p>
        </motion.div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium",
                currentStep === step.id ? "bg-[#000066] text-white" :
                currentStep > step.id ? "bg-[#eef1ff] text-[#000066]" : "bg-gray-100 text-gray-400"
              )}>
                <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  currentStep === step.id ? "bg-white text-[#000066]" :
                  currentStep > step.id ? "bg-[#1a8a6e] text-white" : "bg-gray-300 text-white"
                )}>
                  {currentStep > step.id ? <Check className="w-3 h-3" /> : step.id}
                </span>
                <span className="hidden sm:block">{step.title}</span>
              </div>
              {index < steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wizard */}
          <div className="lg:col-span-2">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="mb-4 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#283593] bg-[#283593] text-white hover:bg-[#3949ab] hover:border-[#3949ab] transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <AnimatePresence mode="wait">
              {/* STEP 1: Website Type */}
              {currentStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-semibold text-white mb-2">What type of website do you need?</h3>
                  <p className="text-sm text-slate-500 mb-6">Each type has different complexity, cost, and purpose.</p>
                  <div
                    className="space-y-3"
                    onMouseMove={handleWebsiteTypePointerMove}
                    onMouseEnter={handleWebsiteTypePointerMove}
                    onMouseLeave={handleWebsiteTypePointerLeave}
                  >
                    {websiteTypes.map(type => (
                      <WebsiteTypeGlowCard
                        key={type.id}
                        type={type}
                        selected={sel.websiteType === type.id}
                        onSelect={handleWebsiteTypeSelect}
                        gridPointer={websiteTypePointer}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Design Approach */}
              {currentStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">How do you want to build it?</h3>
                  <p className="text-sm text-slate-500 mb-6">The design approach impacts cost, timeline, and scalability.</p>
                  <div className="space-y-4">
                    {designApproaches.map(approach => (
                      <button key={approach.id} onClick={() => handleDesignApproachSelect(approach.id)}
                        className={cn("group relative overflow-hidden w-full p-5 rounded-xl border text-left transition-all duration-300 backdrop-blur-xl",
                          sel.designApproach === approach.id
                            ? "bg-white/10 border-[#e79d1a]/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#e79d1a]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]",
                          approach.id === 'semi' && "ring-1 ring-[#1a8a6e]/30"
                        )}>
                        <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#e79d1a]/25 via-transparent to-[#1a8a6e]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {approach.id === 'semi' && (
                          <span className="absolute -top-3 left-4 px-2 py-0.5 bg-[#e79d1a] text-white text-xs font-semibold rounded-full">Recommended</span>
                        )}
                        <div className="flex items-start justify-between gap-4">
                          <div className="relative z-10 flex-1">
                            <h4 className={cn(
                              "font-semibold transition-colors duration-300",
                              sel.designApproach === approach.id ? "text-[#e79d1a]" : "text-white group-hover:text-[#e79d1a]"
                            )}>{approach.name}</h4>
                            <p className="text-sm text-[#9ad0c3] font-medium">{approach.subtitle}</p>
                            {sel.designApproach === approach.id && (
                              <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs font-semibold text-[#9ad0c3] mb-1">Pros</p>
                                  {approach.pros.map(p => <p key={p} className="text-xs text-gray-200">✓ {p}</p>)}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-[#9ad0c3] mb-1">Cons</p>
                                  {approach.cons.map(c => <p key={c} className="text-xs text-gray-300">– {c}</p>)}
                                </div>
                                <div className="col-span-2">
                                  <p className="text-xs italic text-gray-200 border-l-2 border-[#e79d1a] pl-2">"{approach.verdict}"</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={cn("relative z-10 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1 transition-colors duration-300",
                            sel.designApproach === approach.id ? "border-[#e79d1a] bg-[#e79d1a]" : "border-gray-300 group-hover:border-[#e79d1a]"
                          )}>
                            {sel.designApproach === approach.id && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Business Questions */}
              {currentStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">A few business questions</h3>
                    <p className="text-sm text-slate-500">These help us understand your project better.</p>
                  </div>

                  {/* Q1 */}
                  <div>
                    <p className="font-semibold text-white/90 mb-3">1. Is the website a support tool or a product itself?</p>
                    <div className="space-y-2">
                      <RadioOption name="q1" value="support" selected={bizQ.q1} onChange={v => setBizQ(prev => ({ ...prev, q1: v }))} label="Support tool" />
                      <RadioOption name="q1" value="product" selected={bizQ.q1} onChange={v => setBizQ(prev => ({ ...prev, q1: v }))} label="Product itself" />
                    </div>
                  </div>

                  {/* Q2 */}
                  <div>
                    <p className="font-semibold text-white/90 mb-3">2. Will workflows change in the next 12 months?</p>
                    <div className="space-y-2">
                      <RadioOption name="q2" value="yes" selected={bizQ.q2} onChange={v => setBizQ(prev => ({ ...prev, q2: v }))} label="Yes" />
                      <RadioOption name="q2" value="no" selected={bizQ.q2} onChange={v => setBizQ(prev => ({ ...prev, q2: v }))} label="No" />
                      <RadioOption name="q2" value="notsure" selected={bizQ.q2} onChange={v => setBizQ(prev => ({ ...prev, q2: v }))} label="Not sure" />
                    </div>
                    <AnimatePresence>
                      {bizQ.q2 === 'yes' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-3"
                        >
                          <textarea
                            value={bizQ.q2detail}
                            onChange={e => setBizQ(prev => ({ ...prev, q2detail: e.target.value }))}
                            placeholder="Please describe the expected workflow changes..."
                            rows={3}
                            className="w-full p-3 rounded-xl border-2 border-[#000066]/30 bg-[#eef1ff]/30 text-sm text-white/80 resize-none focus:outline-none focus:border-[#000066]"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Q3 */}
                  <div>
                    <p className="font-semibold text-white/90 mb-3">3. Do users interact or just consume information?</p>
                    <div className="space-y-2">
                      <RadioOption name="q3" value="consume" selected={bizQ.q3} onChange={v => setBizQ(prev => ({ ...prev, q3: v }))} label="Users only consume information" />
                      <RadioOption name="q3" value="interact" selected={bizQ.q3} onChange={v => setBizQ(prev => ({ ...prev, q3: v }))} label="Users interact" />
                      <RadioOption name="q3" value="both" selected={bizQ.q3} onChange={v => setBizQ(prev => ({ ...prev, q3: v }))} label="Both" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-end mt-8">
              {currentStep === 3 && (
                <button disabled={!canProceed()} onClick={() => setShowPopup(true)}
                  className="px-5 py-2.5 bg-[#1a8a6e] hover:bg-[#e79d1a] text-white rounded-lg font-medium disabled:opacity-40 transition-colors flex items-center gap-2">
                  Contact Our Specialist <MessageCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Estimate Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div
                className="relative overflow-hidden rounded-2xl p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_60px_rgba(139,92,246,0.35)] border border-[#8b5cf6]/35 border-t-0"
                style={{
                  background:
                    'linear-gradient(180deg, #000000 0%, #000000 34%, #160826 56%, #2b0f4a 72%, #4c1d95 84%, #8b5cf6 calc(100% - 30px), #ece4ff calc(100% - 14px), #ffffff 100%)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 55%, rgba(255,255,255,0) 100%)',
                  }}
                />

                <div className="relative z-10 flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center border border-gray-500/70">
                    <Calculator className="w-5 h-5 text-[#8256e6]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white ">Market Estimate</h3>
                    <p className="text-xs text-white/75">Indian market rates</p>
                  </div>
                </div>

                <div className="relative z-10 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-white/80 mb-2 text-sm">
                      <IndianRupee className="w-4 h-4" />
                      <span>Estimated Cost Range by Organization</span>
                    </div>
                    <div className="space-y-2">
                      {estimate ? (
                        orgOrder.map((orgKey) => {
                          const range = estimate.rangesByOrg?.[orgKey];
                          if (!range) return null;
                          return (
                            <div key={orgKey} className="flex items-center justify-between rounded-lg border border-white/35 bg-white/12 px-3 py-2">
                              <span className="text-sm font-medium text-white/90">{orgSizeLabels[orgKey]}</span>
                              <span className="text-sm font-bold text-white">
                                {formatINR(range.min)} – {formatINR(range.max)}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-white/75 text-sm">Select type & approach</span>
                      )}
                    </div>
                  </div>

                  {(sel.websiteType || sel.designApproach) && (
                    <div className="pt-4 border-t border-white/40 space-y-2 text-sm">
                      {sel.websiteType && <div className="flex justify-between"><span className="text-white/70">Type</span><span className="text-right text-white">{websiteTypes.find(t => t.id === sel.websiteType)?.label}</span></div>}
                      {sel.designApproach && <div className="flex justify-between"><span className="text-white/70">Design</span><span className="text-white">{designApproaches.find(d => d.id === sel.designApproach)?.name}</span></div>}
                    </div>
                  )}

                  {estimate && (
                    <motion.div
                      key={`${sel.websiteType || 'none'}-${sel.designApproach || 'none'}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="relative mt-4 p-4 rounded-2xl border border-[#f6af35]/35 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_24px_rgba(251,191,36,0.18)]"
                      style={{
                        background:
                          'radial-gradient(circle at 85% 12%, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0.06) 28%, transparent 62%), linear-gradient(180deg, rgba(10,14,33,0.92) 0%, rgba(6,10,24,0.94) 100%)',
                      }}
                    >
                      <div className="flex gap-2">
                        <Sparkles className="w-4 h-4 text-[#f6af35] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-200 leading-relaxed">
                          <span className="font-semibold text-white">We can help you build this faster and at a better price.</span>{' '}
                          Speak with our specialist to explore options tailored for your project.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full mt-2 py-3 rounded-xl bg-[#f6af35] hover:bg-[#e79d1a] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Contact Us
                  </button>
                </div>

                <p className="relative z-10 text-xs text-white/80 mt-5 flex items-start gap-1">
                  <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  Indian market rates for reference. Actual pricing depends on specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        prefillData={{ website_type: sel.websiteType, design_approach: sel.designApproach }}
      />
    </section>
  );
}
