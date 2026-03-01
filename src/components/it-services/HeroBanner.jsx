import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import itHeroImage from '../../../asset/ithero.jpeg';

export default function HeroBanner({ onScrollToEstimator, onScrollToServices }) {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-32 pb-20 lg:pt-40 px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-[#000066] leading-tight tracking-tight">
                Welcome to<br />
                <span className="bg-gradient-to-r from-[#000066] to-[#f6af35] bg-clip-text text-transparent">
                  Meilleur Analytics<br />
                  IT Services
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                Innovative IT Solutions - Empowering Your Digital Growth
              </h2>
              
              <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                Meilleur Analytics IT Services is driven by skilled professionals delivering scalable and reliable solutions across Web Development, Software Solutions, Cloud Services, and Digital Transformation. We combine technical expertise, modern technologies, and a client-focused approach to help businesses build, optimize, and grow in the digital world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={onScrollToEstimator}
                size="lg"
                className="bg-[#f6af35] hover:bg-[#e89d2a] text-white px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#f6af35]/20"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={onScrollToServices}
                className="border-2 border-[#000066] text-[#000066] hover:bg-[#000066] hover:text-white px-8 py-6 text-lg font-medium rounded-full transition-all duration-300"
              >
                Explore Our Services
              </Button>
            </div>
          </motion.div>

          {/* RIGHT — Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.3 }} 
            className="relative hidden lg:flex items-center justify-center h-[500px]"
          >
            <img
              src={itHeroImage}
              alt="IT services hero"
              className="w-full max-w-[640px] h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
