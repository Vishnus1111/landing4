import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import itHeroVideo from '../../../asset/itherovideo.mp4';

export default function HeroBanner({ onScrollToEstimator, onScrollToServices }) {
  const heroCards = [
    {
      title: 'Dashboard UI',
      description: 'Analytics, KPIs, and workflow insights in one unified command center.',
      rotation: 'lg:-rotate-[7deg]',
      delay: '0s',
      position: 'lg:-top-2 lg:left-8',
      size: 'lg:w-[300px]',
    },
    {
      title: 'Website Preview',
      description: 'High-converting, responsive experiences designed for speed and growth.',
      rotation: 'lg:rotate-[4deg]',
      delay: '1s',
      position: 'lg:top-28 lg:right-0',
      size: 'lg:w-[350px]',
    },
    {
      title: 'Mobile App',
      description: 'Seamless mobile journeys with scalable architecture and delightful UX.',
      rotation: 'lg:-rotate-[5deg]',
      delay: '2s',
      position: 'lg:bottom-0 lg:left-20',
      size: 'lg:w-[310px]',
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-0 lg:pt-40 px-6 lg:px-8 ">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={itHeroVideo} type="video/mp4" />
      </video>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="font-poppins text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                Build. Scale. Succeed.
              </h1>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-[#f6af35] via-[#ffd36f] to-[#f6af35] bg-clip-text text-transparent">
                  Meilleur Analytics
                </span>{' '}
                <span className="text-gray-200">IT Services</span>
              </h2>
              
              <h3 className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
                Innovative IT Solutions – Empowering Your Digital Growth
              </h3>
              
              <p className="text-gray-200 text-lg leading-relaxed max-w-xl">
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
                className="border-2 border-white text-white hover:bg-white hover:text-[#000066] px-8 py-6 text-lg font-medium rounded-full transition-all duration-300"
              >
                Explore Our Services
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative flex flex-col gap-4 lg:block h-auto lg:h-[540px] mt-4 lg:mt-0"
          >
            {heroCards.map((card) => (
              <div
                key={card.title}
                className={`relative lg:absolute w-full sm:w-[88%] ${card.size} ${card.rotation} ${card.position}`}
              >
                <div
                  className="it-hero-card p-5 rounded-[20px]"
                  style={{ animation: `itHeroFloat 5s ease-in-out infinite`, animationDelay: card.delay }}
                >
                  <div className="space-y-3">
                    <p className="text-sm text-gray-300 uppercase tracking-[0.18em]">Product View</p>
                    <h4 className="text-2xl font-semibold text-white">{card.title}</h4>
                    <div className="h-20 rounded-xl bg-white/10 border border-white/10" />
                    <p className="text-sm text-gray-200 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
