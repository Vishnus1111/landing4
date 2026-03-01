import React, { useEffect, useRef, useState } from 'react';
import NavbarIT from '@/Components/it-services/NavbarIT';
import HeroBanner from '@/Components/it-services/HeroBanner';
import TrustStripIT from '@/Components/it-services/TrustStripIT';
import ServicesGrid from '@/Components/it-services/ServicesGrid';
import ProjectEstimator from '@/Components/it-services/ProjectEstimator';
import WebsiteTypesSection from '@/Components/it-services/WebsiteTypesSection';
import DesignApproachesSection from '@/Components/it-services/designApproachesSection';
import ProcessSection from '@/Components/it-services/ProcessSection';
import PartnershipCTAIT from '@/Components/it-services/PartnershipCTAIT';
import FooterIT from '@/Components/it-services/FooterIT';
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
    <div className="min-h-screen bg-white">
      <NavbarIT />
      <HeroBanner onScrollToEstimator={() => {
        setShowEstimator(true);
        setTimeout(() => estimatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }} onScrollToServices={() => servicesRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <TrustStripIT />
      <div ref={servicesRef}>
        <ServicesGrid onWebsiteDevYes={handleWebsiteDevYes} />
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
