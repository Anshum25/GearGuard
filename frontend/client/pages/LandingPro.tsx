import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import LoadingScreen from "@/components/landing/LoadingScreen";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ImpactSection from "@/components/landing/ImpactSection";
import BuiltForOdooSection from "@/components/landing/BuiltForOdooSection";
import PreviewSection from "@/components/landing/PreviewSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPro() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {!isLoading && (
                <main className="min-h-screen bg-background">
                    <Navbar />
                    <div id="hero">
                        <HeroSection />
                    </div>
                    <ProblemSection />
                    <SolutionSection />
                    <FeaturesSection />
                    <HowItWorksSection />
                    <ImpactSection />
                    <BuiltForOdooSection />
                    <PreviewSection />
                    <CTASection />
                    <Footer />
                </main>
            )}
        </>
    );
}
