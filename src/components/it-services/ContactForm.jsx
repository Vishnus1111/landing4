import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Send, CheckCircle, Shield, Clock, Cpu, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const trustSignals = [
  { icon: Shield, text: 'Your data is secure and confidential' },
  { icon: Clock, text: 'Response within 24 hours' },
  { icon: Cpu, text: 'Built with modern technologies and best practices' },
];

// ── Inline Contact Popup ──────────────────────────────────────────────────────
export function ContactPopup({ open, onClose, prefillData }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.ProjectEstimate.create({ ...form, ...(prefillData || {}), status: 'new' });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
            <div className="p-8">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-[#eef1ff] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#1a8a6e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#000066] mb-2">We'll be in touch!</h3>
                  <p className="text-gray-500 text-sm">Our specialist will contact you within 24 hours.</p>
                  <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-[#000066] hover:bg-[#e79d1a] text-white font-semibold rounded-lg transition-colors">Close</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-[#000066] mb-1">Talk to Our Specialist</h3>
                  <p className="text-sm text-gray-400 mb-6">We'll get back to you within 24 hours.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label className="text-gray-700 font-medium">Name <span className="text-red-500">*</span></Label>
                      <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" required className="mt-1.5 h-11 border-gray-200 focus:border-[#000066]" />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Email Address <span className="text-red-500">*</span></Label>
                      <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required className="mt-1.5 h-11 border-gray-200 focus:border-[#000066]" />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Phone Number <span className="text-red-500">*</span></Label>
                      <Input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" required className="mt-1.5 h-11 border-gray-200 focus:border-[#000066]" />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Additional Details <span className="text-gray-400 font-normal">(optional)</span></Label>
                      <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Anything else you'd like us to know..." rows={3} className="mt-1.5 resize-none border-gray-200 focus:border-[#000066]" />
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full h-11 bg-[#000066] hover:bg-[#e79d1a] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                      {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Submit</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Main Contact Section ──────────────────────────────────────────────────────
export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.ProjectEstimate.create({ ...formData, status: 'new' });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-20 px-6 lg:px-12 bg-[#f8f9fb]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold text-[#1a8a6e] tracking-wider uppercase mb-3">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#000066] mb-3">Let's Build Something Great Together</h2>
            <div className="w-12 h-1 bg-[#1a8a6e] rounded-full mb-6" />
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Share your project details and we'll get back to you with a personalised proposal. No pressure, no obligations — just a conversation about how we can help you succeed.
            </p>
            <div className="space-y-4">
              {trustSignals.map((s, i) => (
                <motion.div key={s.text} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eef1ff] flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-[#000066]" />
                  </div>
                  <span className="text-gray-600 text-sm">{s.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-[#eef1ff] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#1a8a6e]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#000066] mb-3">Message Received!</h3>
                  <p className="text-gray-500">Thank you for reaching out. We'll get back to you within 24 hours with a personalised response.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-5">
                  <div>
                    <Label className="text-gray-700 font-medium">Full Name <span className="text-red-500">*</span></Label>
                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="John Smith" required className="mt-2 h-11 border-gray-200 focus:border-[#000066]" />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Email Address <span className="text-red-500">*</span></Label>
                    <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com" required className="mt-2 h-11 border-gray-200 focus:border-[#000066]" />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Phone Number</Label>
                    <Input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="mt-2 h-11 border-gray-200 focus:border-[#000066]" />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Tell Us About Your Project <span className="text-red-500">*</span></Label>
                    <Textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your project, goals, and any specific requirements..." required rows={5} className="mt-2 border-gray-200 focus:border-[#000066] resize-none" />
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full h-11 bg-[#000066] hover:bg-[#e79d1a] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                    {isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
