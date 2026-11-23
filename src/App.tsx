import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ArrowUp } from 'lucide-react';
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const lastFocusedElRef = useRef<HTMLElement | null>(null);

  useScrollReveal(stageRef);

  const isAnyModalOpen = Boolean(activePost || activeVideoScript || inquiryModalOpen);

  const captureFocusTrigger = () => {
    if (document.activeElement instanceof HTMLElement) {
      lastFocusedElRef.current = document.activeElement;
    }
  };

  const restoreFocusTrigger = useCallback(() => {
    const el = lastFocusedElRef.current;
    lastFocusedElRef.current = null;
    if (el && el.isConnected) {
      requestAnimationFrame(() => {
        el.focus();
      });
    }
  }, []);

  const handleOpenPost = (post: SocialPost) => {
    captureFocusTrigger();
    setActivePost(post);
  };

  const handleClosePost = useCallback(() => {
    setActivePost(null);
    restoreFocusTrigger();
  }, [restoreFocusTrigger]);

  const handleOpenVideo = (script: VideoScript) => {
    captureFocusTrigger();
    setActiveVideoScript(script);
  };

  const handleCloseVideo = useCallback(() => {
    setActiveVideoScript(null);
    restoreFocusTrigger();
  }, [restoreFocusTrigger]);

  const handleOpenInquiry = (serviceName?: string) => {
    captureFocusTrigger();
    if (serviceName) setSelectedServiceForInquiry(serviceName);
    else setSelectedServiceForInquiry('');
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = useCallback(() => {
    setInquiryModalOpen(false);
    restoreFocusTrigger();
  }, [restoreFocusTrigger]);

  // Show floating Back-to-Top after scrolling down
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dismiss video or inquiry modal on Escape (VisualLightboxModal handles its own Escape + focus trap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeVideoScript) handleCloseVideo();
        if (inquiryModalOpen) handleCloseInquiry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoScript, inquiryModalOpen, handleCloseVideo, handleCloseInquiry]);

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

  return (
    <div className="min-h-screen w-full bg-cinema-unified text-[#F5F2F1] relative overflow-x-clip selection:bg-[#dc2626] selection:text-white">
      <InteractiveBackground />

      {/* Top Floating Glass Pill Navigation */}
      <Navbar
        onOpenInquiry={handleOpenInquiry}
        showBackToTop={showBackToTop && !isAnyModalOpen}
      />

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
                onOpenLightbox={handleOpenPost}
                onOpenInquiry={(brand) =>
                  handleOpenInquiry(brand ? `استفسار عن محتوى ${brand}` : undefined)
                }
              />

              {/* Section 02: Scripts */}
              <ScriptsSection
                onOpenVideo={handleOpenVideo}
                onOpenInquiry={(topic) =>
                  handleOpenInquiry(topic ? `طلب سكربت فيديو: ${topic}` : undefined)
                }
              />

              {/* Section 03: Motion Video Scripts */}
              <MotionScriptsSection onOpenVideo={handleOpenVideo} />

              {/* Section 04: Company Profile Content */}
              <CompanyProfileSection onOpenLightbox={handleOpenPost} />

              {/* Section 05: Content Strategy */}
              <ContentStrategySection onOpenLightbox={handleOpenPost} />

              {/* Section 06: Marketing Plan & Strategy */}
              <MarketingPlanSection onOpenLightbox={handleOpenPost} />

              {/* Contact & Footer Section */}
              <ContactSection onOpenInquiry={(srv) => handleOpenInquiry(srv)} />
            </main>
          </div>
        </div>

      {/* Desktop Outer-Gutter Back-to-Top Control (mobile uses non-overlapping top-bar button; both hide when any modal/viewer is open) */}
      {showBackToTop && !isAnyModalOpen && (
        <button
          id="floating-back-to-top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top | العودة للأعلى"
          title="Back to top | العودة للأعلى"
          className="hidden xl:inline-flex fixed bottom-6 right-5 z-40 w-11 h-11 rounded-full bg-[#160409]/95 hover:bg-[#68101C] text-[#F5F2F1] hover:text-white border border-[#8A1526]/65 shadow-xl items-center justify-center transition-[background-color,border-color,transform] duration-200 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Lightbox Modal for Visual Social Posts & Decks (Native viewport scale) */}
      <VisualLightboxModal post={activePost} onClose={handleClosePost} />

      {/* Interactive Video Player & Script Modal (Native viewport scale) */}
      <VideoPlayerModal script={activeVideoScript} onClose={handleCloseVideo} />

      {/* Quick Inquiry / Contact Modal (Native viewport scale) */}
      <ContactModal
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
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
