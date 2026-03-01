import React, { useState, useEffect } from 'react';
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
      "flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all",
      selected === value ? "border-[#000066] bg-[#eef1ff]/60" : "border-gray-100 hover:border-[#e79d1a]/40 bg-white"
    )}>
      <input type="radio" name={name} value={value} checked={selected === value} onChange={() => onChange(value)} className="hidden" />
      <span className={cn(
        "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
        selected === value ? "border-[#000066]" : "border-gray-400"
      )}>
        {selected === value && <span className="w-2 h-2 rounded-full bg-[#000066]" />}
      </span>
      <span className="text-sm text-gray-700 font-medium">{label}</span>
    </label>
  );
}

export default function ProjectEstimator({ estimatorRef }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [sel, setSel] = useState({ websiteType: null, designApproach: null });
  const [bizQ, setBizQ] = useState({ q1: null, q2: null, q2detail: '', q3: null });
  const [estimate, setEstimate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
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

  return (
    <section ref={estimatorRef} className="py-20 px-6 lg:px-12 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-sm font-semibold text-[#1a8a6e] tracking-wider uppercase mb-3 block">Project Estimator</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#000066] mb-3">Calculate Your Website Cost</h2>
          <div className="w-12 h-1 bg-[#1a8a6e] rounded-full mx-auto mb-4" />
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
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">What type of website do you need?</h3>
                  <p className="text-sm text-slate-500 mb-6">Each type has different complexity, cost, and purpose.</p>
                  <div className="space-y-3">
                    {websiteTypes.map(type => (
                      <button key={type.id} onClick={() => handleWebsiteTypeSelect(type.id)}
                        className={cn("w-full p-4 rounded-xl border-2 text-left transition-all",
                          sel.websiteType === type.id ? "border-[#000066] bg-[#eef1ff]/60" : "border-gray-100 hover:border-[#e79d1a]/40 bg-white"
                        )}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">{type.label}</h4>
                            <p className="text-sm text-slate-500 mt-0.5">{type.description}</p>
                            {sel.websiteType === type.id && (
                              <div className="mt-3 pt-3 border-t border-teal-200">
                                <p className="text-xs font-medium text-teal-700 mb-1">Examples: {type.examples}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {type.features.map(f => <span key={f} className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{f}</span>)}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1",
                            sel.websiteType === type.id ? "border-[#000066] bg-[#000066]" : "border-gray-300"
                          )}>
                            {sel.websiteType === type.id && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                      </button>
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
                        className={cn("w-full p-5 rounded-xl border-2 text-left transition-all relative",
                          sel.designApproach === approach.id ? "border-[#000066] bg-[#eef1ff]/60" : "border-gray-100 hover:border-[#e79d1a]/40 bg-white",
                          approach.id === 'semi' && "ring-1 ring-[#1a8a6e]/30"
                        )}>
                        {approach.id === 'semi' && (
                          <span className="absolute -top-3 left-4 px-2 py-0.5 bg-[#e79d1a] text-white text-xs font-semibold rounded-full">Recommended</span>
                        )}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">{approach.name}</h4>
                            <p className="text-sm text-teal-600 font-medium">{approach.subtitle}</p>
                            {sel.designApproach === approach.id && (
                              <div className="mt-3 pt-3 border-t border-teal-200 grid grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs font-semibold text-slate-700 mb-1">Pros</p>
                                  {approach.pros.map(p => <p key={p} className="text-xs text-slate-600">✓ {p}</p>)}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-700 mb-1">Cons</p>
                                  {approach.cons.map(c => <p key={c} className="text-xs text-slate-500">– {c}</p>)}
                                </div>
                                <div className="col-span-2">
                                  <p className="text-xs italic text-slate-600 border-l-2 border-teal-400 pl-2">"{approach.verdict}"</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1",
                            sel.designApproach === approach.id ? "border-[#000066] bg-[#000066]" : "border-gray-300"
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
                    <h3 className="text-xl font-semibold text-slate-900 mb-1">A few business questions</h3>
                    <p className="text-sm text-slate-500">These help us understand your project better.</p>
                  </div>

                  {/* Q1 */}
                  <div>
                    <p className="font-semibold text-slate-900 mb-3">1. Is the website a support tool or a product itself?</p>
                    <div className="space-y-2">
                      <RadioOption name="q1" value="support" selected={bizQ.q1} onChange={v => setBizQ(prev => ({ ...prev, q1: v }))} label="Support tool" />
                      <RadioOption name="q1" value="product" selected={bizQ.q1} onChange={v => setBizQ(prev => ({ ...prev, q1: v }))} label="Product itself" />
                    </div>
                  </div>

                  {/* Q2 */}
                  <div>
                    <p className="font-semibold text-slate-900 mb-3">2. Will workflows change in the next 12 months?</p>
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
                            className="w-full p-3 rounded-xl border-2 border-[#000066]/30 bg-[#eef1ff]/30 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#000066]"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Q3 */}
                  <div>
                    <p className="font-semibold text-slate-900 mb-3">3. Do users interact or just consume information?</p>
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
              <div className="bg-gradient-to-b from-[#d89a24] via-[#f8c86a] to-[#fff8dc] rounded-2xl p-6 text-[#1f2937] shadow-2xl border border-[#f2d489]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center border border-white/50">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Market Estimate</h3>
                    <p className="text-xs text-[#6b4b12]">Indian market rates</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-[#6b4b12] mb-2 text-sm">
                      <IndianRupee className="w-4 h-4" />
                      <span>Estimated Cost Range by Organization</span>
                    </div>
                    <div className="space-y-2">
                      {estimate ? (
                        orgOrder.map((orgKey) => {
                          const range = estimate.rangesByOrg?.[orgKey];
                          if (!range) return null;
                          return (
                            <div key={orgKey} className="flex items-center justify-between rounded-lg border border-white/50 bg-white/35 px-3 py-2">
                              <span className="text-sm font-medium text-[#5a3f10]">{orgSizeLabels[orgKey]}</span>
                              <span className="text-sm font-bold text-[#1f2937]">
                                {formatINR(range.min)} – {formatINR(range.max)}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-[#6b4b12] text-sm">Select type & approach</span>
                      )}
                    </div>
                  </div>

                  {(sel.websiteType || sel.designApproach) && (
                    <div className="pt-4 border-t border-white/40 space-y-2 text-sm">
                      {sel.websiteType && <div className="flex justify-between"><span className="text-[#6b4b12]">Type</span><span className="text-right">{websiteTypes.find(t => t.id === sel.websiteType)?.label}</span></div>}
                      {sel.designApproach && <div className="flex justify-between"><span className="text-[#6b4b12]">Design</span><span>{designApproaches.find(d => d.id === sel.designApproach)?.name}</span></div>}
                    </div>
                  )}

                  {estimate && (
                    <motion.div
                      key={`${sel.websiteType || 'none'}-${sel.designApproach || 'none'}`}
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="mt-4 p-4 bg-[#fd85fd] rounded-2xl border border-[#f59e0b]/30 shadow-[0_8px_20px_rgba(245,158,11,0.12)] animate-premium-glow-once"
                    >
                      <div className="flex gap-2">
                        <Sparkles className="w-4 h-4 text-[#8a5c08] flex-shrink-0 mt-0.5" />
                        <p className="text-sm bg-gradient-to-b from-[#5a3f10] to-[#9a7a3c] bg-clip-text text-transparent">
                          <span className="font-semibold bg-gradient-to-b from-[#1f2937] to-[#5f6b7a] bg-clip-text text-transparent">But we can help you build this sooner and at a better price!</span>{' '}
                          Contact our specialist.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full mt-2 py-3 rounded-xl bg-[#000066] hover:bg-[#1a1a8f] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Contact Us
                  </button>
                </div>

                <p className="text-xs text-[#6b4b12] mt-5 flex items-start gap-1">
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
