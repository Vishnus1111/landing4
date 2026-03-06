import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import TrustStrip from '@/components/landing/TrustStrip';
import ServicesSection from '@/components/landing/ServicesSection';
import WhyChoose from '@/components/landing/WhyChoose';
import Achievements from '@/components/landing/Achievements';
import WhoWeServe from '@/components/landing/WhoWeServe';
import PartnershipCTA from '@/components/landing/PartnershipCTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-inter">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;600;700;800&display=swap');
                
                .font-inter {
                    font-family: 'Inter', sans-serif;
                }
                
                .font-poppins {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <Navbar />
            <Hero />
            <TrustStrip />
            <div id="services">
                <ServicesSection />
            </div>
            <div id="why-us">
                <WhyChoose />
            </div>
            <Achievements />
            <div id="who-we-serve">
                <WhoWeServe />
            </div>
            <div id="contact">
                <PartnershipCTA />
            </div>
            <Footer />
        </div>
    );
}
