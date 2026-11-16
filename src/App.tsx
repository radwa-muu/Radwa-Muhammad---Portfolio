import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
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
import { ViewModeToggle } from './components/ViewModeToggle';
import { PortfolioProvider } from './context/PortfolioContext';
import { SocialPost, VideoScript } from './utils/portfolioData';
import { useScrollReveal } from './hooks/useScrollAnimations';
import { DESKTOP_STAGE_WIDTH, ViewMode, useDesktopScale } from './hooks/useDesktopScale';

const PortfolioContent: React.FC = () => {
  const [activePost, setActivePost] = useState<SocialPost | null>(null);
  const [activeVideoScript, setActiveVideoScript] = useState<VideoScript | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');
  const [scaledHeight, setScaledHeight] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const pendingScrollRatioRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number>(0);

  const { scale, isMobileScreen, isDesktopView } = useDesktopScale(viewMode);

  useScrollReveal(stageRef, scale);

  const handleChangeViewMode = useCallback(
    (nextMode: ViewMode) => {
      if (nextMode === viewMode) return;

      const doc = document.documentElement;
      const currentMaxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      pendingScrollRatioRef.current = window.scrollY > 40 ? window.scrollY / currentMaxScroll : 0;

      setIsTransitioning(true);
      setViewMode(nextMode);

      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        transitionTimerRef.current = 0;
      }, 280);
    },
    [viewMode]
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  // Measure scaled height continuously in Desktop View and restore proportional scroll position smoothly
  useLayoutEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const syncMetrics = () => {
      if (isDesktopView) {
        setScaledHeight(Math.round(stageEl.offsetHeight * scale));
      } else {
        setScaledHeight(0);
      }
    };

    syncMetrics();

    let resizeObserver: ResizeObserver | null = null;
    if (isDesktopView && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncMetrics);
      resizeObserver.observe(stageEl);
    }

    let rafA = 0;
    let rafB = 0;
    if (pendingScrollRatioRef.current !== null) {
      const ratio = pendingScrollRatioRef.current;
      pendingScrollRatioRef.current = null;
      rafA = window.requestAnimationFrame(() => {
        syncMetrics();
        rafB = window.requestAnimationFrame(() => {
          const doc = document.documentElement;
          const nextMaxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
          window.scrollTo({ top: Math.round(nextMaxScroll * ratio), behavior: 'auto' });
        });
      });
    }

    return () => {
      if (rafA) window.cancelAnimationFrame(rafA);
      if (rafB) window.cancelAnimationFrame(rafB);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [isDesktopView, scale]);

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

  const anyModalOpen = Boolean(activePost || activeVideoScript || inquiryModalOpen);

  return (
    <div className="min-h-screen w-full bg-cinema-unified text-[#F5F2F1] relative overflow-x-clip selection:bg-[#dc2626] selection:text-white">
      <InteractiveBackground />

      {/* Scoped View Container: switches smoothly between Responsive Mobile (default) and Zoomed Desktop View */}
      <div id="portfolio-desktop-scope" className={isDesktopView ? 'desktop-view' : ''}>
        {/* Top Floating Glass Pill Navigation */}
        <Navbar
          onOpenInquiry={handleOpenInquiry}
          scale={scale}
          isDesktopView={isDesktopView}
        />

        {/* Portfolio Stage Wrapper (clips horizontal width cleanly in scaled Desktop View) */}
        <div
          id="portfolio-stage-frame"
          className="relative z-10 w-full overflow-hidden"
          style={
            isDesktopView && scaledHeight > 0
              ? { height: `${scaledHeight + 68}px` }
              : undefined
          }
        >
          <div
            id="portfolio-stage"
            ref={stageRef}
            className={`origin-top-left transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isTransitioning ? 'opacity-85' : 'opacity-100'
            }`}
            style={
              isDesktopView
                ? {
                    width: `${DESKTOP_STAGE_WIDTH}px`,
                    transform: `scale(${scale})`,
                  }
                : {
                    width: '100%',
                    transform: 'scale(1)',
                  }
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
      </div>

      {/* Mobile View-Mode Toggle (Crisp 1:1 native touch scale outside scaled stage) */}
      {isMobileScreen && (
        <ViewModeToggle
          viewMode={viewMode}
          onChangeMode={handleChangeViewMode}
          hidden={anyModalOpen}
        />
      )}

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
