import React, { useEffect, useRef, useState } from 'react';
import NavbarIT from '@/components/it-services/NavbarIT';
import HeroBanner from '@/components/it-services/HeroBanner';
import TrustStripIT from '@/components/it-services/TrustStripIT';
import ServicesGrid from '@/components/it-services/ServicesGrid';
import ProjectEstimator from '@/components/it-services/ProjectEstimator';
import WebsiteTypesSection from '@/components/it-services/WebsiteTypesSection';
import DesignApproachesSection from '@/components/it-services/designApproachesSection';
import ProcessSection from '@/components/it-services/ProcessSection';
import PartnershipCTAIT from '@/components/it-services/PartnershipCTAIT';
import FooterIT from '@/components/it-services/FooterIT';
import { motion, AnimatePresence } from 'framer-motion';

export default function ITServices() {
  const estimatorRef = useRef(null);
  const servicesRef = useRef(null); 
  const [showEstimator, setShowEstimator] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const scrollToEstimator = () => {
    estimatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWebsiteDevYes = () => {
    setShowEstimator(true);
    setTimeout(() => {
      estimatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#050816]">
      <NavbarIT />
      <div className="relative">
        <div className="sticky top-0 h-screen z-0 overflow-hidden">
          <HeroBanner onScrollToEstimator={() => {
            setShowEstimator(true);
            setTimeout(() => estimatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
          }} onScrollToServices={() => servicesRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        </div>
        <TrustStripIT />
        <div ref={servicesRef} className="relative z-20">
          <ServicesGrid onWebsiteDevYes={handleWebsiteDevYes} />
        </div>
      </div>

      <AnimatePresence>
        {showEstimator && (
          <motion.div
            key="estimator"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ProjectEstimator estimatorRef={estimatorRef} />
          </motion.div>
        )}
      </AnimatePresence>

      <WebsiteTypesSection />
      <DesignApproachesSection />
      <ProcessSection />
      <PartnershipCTAIT />
      <FooterIT />
    </div>
  );
}
