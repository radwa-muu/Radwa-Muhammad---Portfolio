import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
import { EditModeBar } from './components/EditModeBar';
import { InteractiveBackground } from './components/InteractiveBackground';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { SocialPost, VideoScript } from './utils/portfolioData';
import { DESKTOP_STAGE_WIDTH, useDesktopScale } from './hooks/useDesktopScale';
import { useScrollReveal } from './hooks/useScrollAnimations';

const PortfolioContent: React.FC = () => {
  const { isEditMode } = usePortfolio();
  const [activePost, setActivePost] = useState<SocialPost | null>(null);
  const [activeVideoScript, setActiveVideoScript] = useState<VideoScript | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');
  const scale = useDesktopScale();
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  useScrollReveal(stageRef, scale);

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

  // Global content & media protection for visitors (preserving Form inputs and active Edit Mode)
  useEffect(() => {
    if (isEditMode) return;

    const isEditableTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (!isEditableTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (!isEditableTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleCopyOrCut = (e: ClipboardEvent) => {
      if (!isEditableTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleSelectStart = (e: Event) => {
      if (!isEditableTarget(e.target)) {
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
      if ((key === 'c' || key === 'x' || key === 'a') && !isEditableTarget(e.target)) {
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
  }, [isEditMode]);

  // Keep scaled wrapper height synced directly via DOM without triggering React re-renders during scroll
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const wrapper = stageWrapperRef.current;
    if (!stage || !wrapper) return;

    if (scale >= 1) {
      wrapper.style.height = '';
      return;
    }

    const syncHeight = () => {
      const h = stage.scrollHeight;
      if (h > 0) {
        wrapper.style.height = `${Math.ceil(h * scale)}px`;
      }
    };

    syncHeight();
    document.fonts?.ready.then(syncHeight).catch(() => {});
    const settleTimer = window.setTimeout(syncHeight, 450);
    window.addEventListener('load', syncHeight, { once: true });
    window.addEventListener('resize', syncHeight, { passive: true });

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener('load', syncHeight);
      window.removeEventListener('resize', syncHeight);
    };
  }, [scale]);

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) setSelectedServiceForInquiry(serviceName);
    else setSelectedServiceForInquiry('');
    setInquiryModalOpen(true);
  };

  const isScaled = scale < 1;

  return (
    <div
      data-edit-mode={isEditMode ? 'true' : 'false'}
      className="min-h-screen w-full bg-cinema-unified text-[#F5F2F1] relative overflow-x-clip selection:bg-[#dc2626] selection:text-white"
    >
      <InteractiveBackground />

      {/* Top Responsive Glass Pill Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} scale={scale} />

      {/* Proportional Desktop Stage Wrapper (GPU-scaled on mobile/tablet so layout is 100% identical) */}
      <div
        ref={stageWrapperRef}
        className="relative z-10 w-full overflow-hidden"
      >
        <div
          id="portfolio-stage"
          ref={stageRef}
          style={
            isScaled
              ? ({
                  width: `${DESKTOP_STAGE_WIDTH}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  '--vw': '12.8px',
                } as React.CSSProperties)
              : undefined
          }
        >
          <main id="portfolio-main" className="w-full flex flex-col">
            {/* Hero Cover */}
            <Hero onOpenInquiry={() => handleOpenInquiry()} scale={scale} />

            {/* About Me */}
            <About />

            {/* Services Timeline */}
            <Services onSelectService={(serviceTitle) => handleOpenInquiry(serviceTitle)} />

            {/* Clients Grid */}
            <Clients />

            {/* Selected Work Index */}
            <SelectedWorkIndex
              scale={scale}
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

      {/* Edit Mode Floating Bar (Native viewport scale) */}
      <EditModeBar />

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
    </PortfolioProvider>
  );
}
