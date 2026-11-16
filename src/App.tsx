import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Clients } from './components/Clients';
import { SelectedWorkIndex } from './components/SelectedWorkIndex';
import { SocialMediaSection } from './components/SocialMediaSection';
import { ScriptsSection } from './components/ScriptsSection';
import { MotionScriptsSection } from './components/MotionScriptsSection';
import { CompanyProfileSection } from './components/CompanyProfileSection';
import { ContentStrategySection } from './components/ContentStrategySection';
import { MarketingPlanSection } from './components/MarketingPlanSection';
import { ContactSection } from './components/ContactSection';
import { VisualLightboxModal } from './components/VisualLightboxModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ContactModal } from './components/ContactModal';
import { InteractiveBackground } from './components/InteractiveBackground';
import { PortfolioProvider } from './context/PortfolioContext';
import { SocialPost, VideoScript } from './utils/portfolioData';
import { useScrollReveal } from './hooks/useScrollAnimations';

const PortfolioContent: React.FC = () => {
  const [activePost, setActivePost] = useState<SocialPost | null>(null);
  const [activeVideoScript, setActiveVideoScript] = useState<VideoScript | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');

  const stageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(stageRef);

  // Dismiss any open modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePost(null);
        setActiveVideoScript(null);
        setInquiryModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Global content & media protection for visitors (preserving Contact form inputs)
  useEffect(() => {
    const isFormFieldTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest('input, textarea, select'));
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (!isFormFieldTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (!isFormFieldTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleCopyOrCut = (e: ClipboardEvent) => {
      if (!isFormFieldTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleSelectStart = (e: Event) => {
      if (!isFormFieldTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleProtectedKeys = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const key = e.key.toLowerCase();
      // Always block Save / Print / View-Source
      if (key === 's' || key === 'p' || key === 'u') {
        e.preventDefault();
        return;
      }
      // Block Copy / Cut / Select-All outside form inputs
      if ((key === 'c' || key === 'x' || key === 'a') && !isFormFieldTarget(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopyOrCut);
    document.addEventListener('cut', handleCopyOrCut);
    document.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('keydown', handleProtectedKeys);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopyOrCut);
      document.removeEventListener('cut', handleCopyOrCut);
      document.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('keydown', handleProtectedKeys);
    };
  }, []);

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) setSelectedServiceForInquiry(serviceName);
    else setSelectedServiceForInquiry('');
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-cinema-unified text-[#F5F2F1] relative overflow-x-clip selection:bg-[#dc2626] selection:text-white">
      <InteractiveBackground />

      {/* Top Floating Glass Pill Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Native Full-Width Responsive Portfolio Stage */}
      <div id="portfolio-stage-frame" className="relative z-10 w-full overflow-x-clip">
        <div id="portfolio-stage" ref={stageRef} className="w-full">
          <main id="portfolio-main" className="w-full flex flex-col">
            {/* Hero Cover */}
            <Hero onOpenInquiry={() => handleOpenInquiry()} />

              {/* About Me */}
              <About />

              {/* Services Timeline */}
              <Services onSelectService={(serviceTitle) => handleOpenInquiry(serviceTitle)} />

              {/* Clients Grid */}
              <Clients />

              {/* Selected Work Index */}
              <SelectedWorkIndex
                onRequestSample={(sampleName) =>
                  handleOpenInquiry(`طلب نموذج: ${sampleName}`)
                }
              />

              {/* Section 01: Social Media Content */}
              <SocialMediaSection
                onOpenLightbox={(post) => setActivePost(post)}
                onOpenInquiry={(brand) =>
                  handleOpenInquiry(brand ? `استفسار عن محتوى ${brand}` : undefined)
                }
              />

              {/* Section 02: Scripts */}
              <ScriptsSection
                onOpenVideo={(script) => setActiveVideoScript(script)}
                onOpenInquiry={(topic) =>
                  handleOpenInquiry(topic ? `طلب سكربت فيديو: ${topic}` : undefined)
                }
              />

              {/* Section 03: Motion Video Scripts */}
              <MotionScriptsSection onOpenVideo={(script) => setActiveVideoScript(script)} />

              {/* Section 04: Company Profile Content */}
              <CompanyProfileSection onOpenLightbox={(post) => setActivePost(post)} />

              {/* Section 05: Content Strategy */}
              <ContentStrategySection onOpenLightbox={(post) => setActivePost(post)} />

              {/* Section 06: Marketing Plan & Strategy */}
              <MarketingPlanSection onOpenLightbox={(post) => setActivePost(post)} />

              {/* Contact & Footer Section */}
              <ContactSection onOpenInquiry={(srv) => handleOpenInquiry(srv)} />
            </main>
          </div>
        </div>

      {/* Lightbox Modal for Visual Social Posts & Decks (Native viewport scale) */}
      <VisualLightboxModal post={activePost} onClose={() => setActivePost(null)} />

      {/* Interactive Video Player & Script Modal (Native viewport scale) */}
      <VideoPlayerModal script={activeVideoScript} onClose={() => setActiveVideoScript(null)} />

      {/* Quick Inquiry / Contact Modal (Native viewport scale) */}
      <ContactModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        lang="ar"
        defaultService={selectedServiceForInquiry}
      />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
      <Analytics />
    </PortfolioProvider>
  );
}
