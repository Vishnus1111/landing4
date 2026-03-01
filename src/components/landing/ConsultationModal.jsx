import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ConsultationModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        service: 'Financial Services',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Prevent background scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle ESC key
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/xzznnlkn', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    company: formData.company || 'Not provided',
                    service: formData.service,
                    message: formData.message,
                })
            });

            if (response.ok) {
                setSubmitSuccess(true);
                setFormData({
                    fullName: '',
                    email: '',
                    company: '',
                    service: 'Financial Services',
                    message: ''
                });

                // Reset success message after 3 seconds
                setTimeout(() => {
                    setSubmitSuccess(false);
                    onClose();
                }, 3000);
            } else {
                alert('Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-100 bg-white">
                                <h2 className="text-2xl font-bold text-[#000066]">Request Consultation</h2>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {submitSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#000066] mb-2">Thank you!</h3>
                                        <p className="text-gray-600">
                                            Thank you for requesting a consultation. Our team will get back to you shortly.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Your full name"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B99E] focus:border-transparent"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B99E] focus:border-transparent"
                                            />
                                        </div>

                                        {/* Company */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Your company or organization"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B99E] focus:border-transparent"
                                            />
                                        </div>

                                        {/* Service Dropdown */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Service Interested In <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B99E] focus:border-transparent"
                                            >
                                                <option>Financial Services</option>
                                                <option>IT & Analytics</option>
                                                <option>Training & Development</option>
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Brief Requirement / Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Briefly describe your requirement or what you would like to consult us about"
                                                required
                                                rows="4"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '8px',
                                                    backgroundColor: 'white',
                                                    color: '#111827',
                                                    fontSize: '14px',
                                                    fontFamily: 'inherit',
                                                    resize: 'none'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.outline = 'none';
                                                    e.target.style.boxShadow = '0 0 0 2px #00B99E';
                                                    e.target.style.borderColor = 'transparent';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.boxShadow = 'none';
                                                    e.target.style.borderColor = '#d1d5db';
                                                }}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#00B99E] hover:bg-[#00a88e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
