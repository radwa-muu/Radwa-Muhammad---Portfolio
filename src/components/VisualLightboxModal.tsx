import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SocialPost } from '../utils/portfolioData';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  MoveHorizontal,
  SlidersHorizontal,
  HelpCircle,
  Check,
  ArrowDown,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface VisualLightboxModalProps {
  post: SocialPost | null;
  onClose: () => void;
}

type FitMode = 'screen' | 'width';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

export const VisualLightboxModal: React.FC<VisualLightboxModalProps> = ({ post, onClose }) => {
  const { data } = usePortfolio();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [fitMode, setFitMode] = useState<FitMode>('screen');
  const [zoom, setZoom] = useState<number>(1);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);
  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const toolsBtnRef = useRef<HTMLButtonElement>(null);
  const helpBtnRef = useRef<HTMLButtonElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const helpPopoverRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const captionSectionRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragOriginRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    setActiveSlideIndex(post?.initialSlideIndex ?? 0);
    setZoom(1);
    setFitMode('screen');
    setNaturalSize(null);
    setToolsMenuOpen(false);
    setHelpOpen(false);
  }, [post?.id, post?.initialSlideIndex]);

  // Reset zoom/size whenever slide changes
  useEffect(() => {
    setZoom(1);
    setNaturalSize(null);
    setToolsMenuOpen(false);
    if (stageRef.current) {
      stageRef.current.scrollTo({ top: 0, left: 0 });
    }
  }, [activeSlideIndex]);

  // Measure scroll viewport width & height for accurate Fit Screen, Fit Width & Zoom calculations
  useEffect(() => {
    if (!post) return;
    const el = stageRef.current;
    if (!el) return;

    const updateSize = () => {
      setViewportSize({ width: el.clientWidth, height: el.clientHeight });
    };
    updateSize();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateSize);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [post]);

  // Lock background page scroll & move focus into modal on open
  useEffect(() => {
    if (!post) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const rafId = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
    };
  }, [post]);

  // Close popovers when clicking outside them
  useEffect(() => {
    if (!toolsMenuOpen && !helpOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        toolsMenuOpen &&
        toolsMenuRef.current &&
        !toolsMenuRef.current.contains(target) &&
        toolsBtnRef.current &&
        !toolsBtnRef.current.contains(target)
      ) {
        setToolsMenuOpen(false);
      }
      if (
        helpOpen &&
        helpPopoverRef.current &&
        !helpPopoverRef.current.contains(target) &&
        helpBtnRef.current &&
        !helpBtnRef.current.contains(target)
      ) {
        setHelpOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [toolsMenuOpen, helpOpen]);

  const livePost = post
    ? data.socialCampaigns[post.brandId]?.posts.find((p) => p.id === post.id) || post
    : null;

  const slides = livePost?.slides || [];
  const carouselImages =
    livePost?.carouselImages || (livePost?.imageUrl ? [livePost.imageUrl] : []);
  const totalSlides = livePost ? Math.max(slides.length, carouselImages.length, 1) : 1;
  const hasMultipleSlides = totalSlides > 1;

  const nextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleZoomIn = useCallback(() => {
    setFitMode('width');
    setZoom((prev) => Math.min(MAX_ZOOM, Number((prev + ZOOM_STEP).toFixed(2))));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(MIN_ZOOM, Number((prev - ZOOM_STEP).toFixed(2))));
  }, []);

  const handleFitScreen = useCallback(() => {
    setFitMode('screen');
    setZoom(1);
    setToolsMenuOpen(false);
    stageRef.current?.scrollTo({ top: 0, left: 0 });
  }, []);

  const handleFitWidth = useCallback(() => {
    setFitMode('width');
    setZoom(1);
    setToolsMenuOpen(false);
    stageRef.current?.scrollTo({ top: 0, left: 0 });
  }, []);

  const handleReset = useCallback(() => {
    const isTallPortrait =
      naturalSize !== null && naturalSize.height / naturalSize.width > 1.25;
    const isNarrowScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    setFitMode(isTallPortrait && isNarrowScreen ? 'width' : 'screen');
    setZoom(1);
    setToolsMenuOpen(false);
    stageRef.current?.scrollTo({ top: 0, left: 0 });
  }, [naturalSize]);

  const scrollToCaption = useCallback(() => {
    setToolsMenuOpen(false);
    setHelpOpen(false);
    if (captionSectionRef.current && stageRef.current) {
      const targetTop = captionSectionRef.current.offsetTop;
      stageRef.current.scrollTo({ top: Math.max(0, targetTop - 8), behavior: 'smooth' });
    }
  }, []);

  // Keyboard navigation + focus trap inside dialog
  useEffect(() => {
    if (!post) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (toolsMenuOpen) {
          setToolsMenuOpen(false);
          toolsBtnRef.current?.focus();
          return;
        }
        if (helpOpen) {
          setHelpOpen(false);
          helpBtnRef.current?.focus();
          return;
        }
        onClose();
        return;
      }

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
        return;
      }

      if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        handleZoomOut();
        return;
      }

      if (e.key === '0') {
        e.preventDefault();
        handleReset();
        return;
      }

      const stage = stageRef.current;
      const isHorizontallyScrollable =
        stage !== null && stage.scrollWidth > stage.clientWidth + 4;

      if (hasMultipleSlides) {
        if (e.key === 'PageDown' || (e.key === 'ArrowRight' && !isHorizontallyScrollable)) {
          e.preventDefault();
          nextSlide();
          return;
        }
        if (e.key === 'PageUp' || (e.key === 'ArrowLeft' && !isHorizontallyScrollable)) {
          e.preventDefault();
          prevSlide();
          return;
        }
      }

      // Accessible Tab focus trap within dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    post,
    hasMultipleSlides,
    toolsMenuOpen,
    helpOpen,
    onClose,
    nextSlide,
    prevSlide,
    handleZoomIn,
    handleZoomOut,
    handleReset,
  ]);

  if (!post || !livePost) return null;

  const currentSlide = slides[activeSlideIndex] || null;
  const activeImage =
    currentSlide?.imageUrl || carouselImages[activeSlideIndex] || livePost.imageUrl;

  const fullOriginalCaption = livePost.fullCaptionAr ?? livePost.hookAr;
  const isHindiCaption = /[\u0900-\u097F]/.test(fullOriginalCaption || '');
  const hasAnyTextContent = Boolean(
    currentSlide || fullOriginalCaption || livePost.hookEn || livePost.creativeDirectionAr
  );

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const natW = img.naturalWidth;
    const natH = img.naturalHeight;
    if (!natW || !natH) return;
    setNaturalSize({ width: natW, height: natH });

    // For tall portrait strategy/persona/profile slides on mobile, default to Fit Width so copy is legible immediately
    const isTallPortrait = natH / natW > 1.25;
    if (isTallPortrait && window.innerWidth < 768) {
      setFitMode('width');
    } else {
      setFitMode('screen');
    }
    stageRef.current?.scrollTo({ top: 0, left: 0 });
  };

  // Optional desktop mouse drag-to-scroll when content overflows stage
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    // Allow normal click/scroll inside text block without hijacking pointer
    if (captionSectionRef.current && captionSectionRef.current.contains(e.target as Node)) return;
    if (el.scrollWidth <= el.clientWidth + 2 && el.scrollHeight <= el.clientHeight + 2) return;
    isDraggingRef.current = true;
    dragOriginRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !stageRef.current) return;
    const dx = e.clientX - dragOriginRef.current.x;
    const dy = e.clientY - dragOriginRef.current.y;
    stageRef.current.scrollLeft = dragOriginRef.current.scrollLeft - dx;
    stageRef.current.scrollTop = dragOriginRef.current.scrollTop - dy;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Compute exact image dimensions preserving 100% natural aspect ratio with zero cropping
  const horizontalPad = viewportSize.width < 640 ? 16 : 32;
  const verticalPad = viewportSize.width < 640 ? 16 : 32;
  const availableStageWidth = Math.max(240, viewportSize.width - horizontalPad);
  const availableStageHeight = Math.max(220, viewportSize.height - verticalPad);
  const isFitScreenUnzoomed = fitMode === 'screen' && zoom === 1;

  const computedImgStyle: React.CSSProperties = isFitScreenUnzoomed
    ? {
        maxWidth: `${availableStageWidth}px`,
        maxHeight: `${availableStageHeight}px`,
        width: 'auto',
        height: 'auto',
      }
    : {
        width: `${Math.round(availableStageWidth * zoom)}px`,
        maxWidth: 'none',
        height: 'auto',
      };

  const zoomPercent = Math.round(zoom * 100);
  const isDefaultState =
    zoom === 1 &&
    fitMode ===
      (naturalSize &&
      naturalSize.height / naturalSize.width > 1.25 &&
      typeof window !== 'undefined' &&
      window.innerWidth < 768
        ? 'width'
        : 'screen');

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-50 bg-[#090708]/98 sm:bg-black/92 flex items-center justify-center sm:p-4 lg:p-6 modal-backdrop-enter"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div
        ref={dialogRef}
        className="relative w-full h-[100dvh] sm:h-[94dvh] sm:max-w-6xl bg-[#0e0407] sm:rounded-2xl border-0 sm:border border-[#8A1526]/45 shadow-2xl flex flex-col overflow-hidden modal-panel-enter"
      >
        {/* Compact Single-Row Top Bar: Title + Secondary Tools Menu + Help + Close */}
        <div
          id="lightbox-top-bar"
          className="shrink-0 relative z-20 flex items-center justify-between gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#140509] border-b border-white/12 font-body-plex"
        >
          <div className="min-w-0 flex-1 flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-semibold text-[#fca5a5] tracking-wide whitespace-nowrap shrink-0">
              {livePost.dateBadge}
            </span>
            <span className="hidden sm:inline text-white/30 shrink-0" aria-hidden="true">
              ·
            </span>
            <h3
              id="lightbox-title"
              className="text-[13px] sm:text-sm font-bold text-white truncate"
            >
              {livePost.titleAr || livePost.titleEn}
              {livePost.titleEn && livePost.titleAr ? (
                <span className="hidden md:inline font-normal text-[#BDB5B5]">
                  {' '}
                  — {livePost.titleEn}
                </span>
              ) : null}
            </h3>
          </div>

          <div className="shrink-0 flex items-center gap-1 sm:gap-1.5">
            {/* Secondary View Options Menu (Fit Screen, Fit Width, Reset, Jump to Caption) */}
            <button
              ref={toolsBtnRef}
              type="button"
              onClick={() => {
                setHelpOpen(false);
                setToolsMenuOpen((prev) => !prev);
              }}
              aria-haspopup="menu"
              aria-expanded={toolsMenuOpen}
              aria-controls="lightbox-tools-menu"
              aria-label="View options | أدوات العرض"
              title="View options | أدوات العرض"
              className={`min-w-[40px] min-h-[40px] px-2 sm:px-2.5 rounded-lg border text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white ${
                toolsMenuOpen
                  ? 'bg-[#68101C]/75 border-[#b81d33] text-white'
                  : 'bg-white/[0.04] border-white/15 text-[#E9DEDE] hover:text-white hover:border-white/35'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">View</span>
            </button>

            {/* Help Button (Moves long usage instructions out of the chrome) */}
            <button
              ref={helpBtnRef}
              type="button"
              onClick={() => {
                setToolsMenuOpen(false);
                setHelpOpen((prev) => !prev);
              }}
              aria-expanded={helpOpen}
              aria-controls="lightbox-help-popover"
              aria-label="Viewer help | مساعدة العارض"
              title="Viewer help | مساعدة العارض"
              className={`min-w-[40px] min-h-[40px] rounded-lg border text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-white ${
                helpOpen
                  ? 'bg-[#68101C]/75 border-[#b81d33] text-white'
                  : 'bg-white/[0.04] border-white/15 text-[#E9DEDE] hover:text-white hover:border-white/35'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Prominent Always-Visible Close Button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="shrink-0 min-w-[40px] min-h-[40px] sm:px-3 rounded-full bg-[#68101C] hover:bg-[#dc2626] text-white border border-[#ef4444]/50 inline-flex items-center justify-center gap-1.5 text-xs font-bold transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close viewer | إغلاق العارض"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* Secondary Tools Dropdown Menu */}
          {toolsMenuOpen && (
            <div
              ref={toolsMenuRef}
              id="lightbox-tools-menu"
              role="menu"
              aria-label="View options | أدوات العرض"
              className="absolute right-2.5 sm:right-4 top-[calc(100%+6px)] z-30 w-64 rounded-xl bg-[#16050a] border border-white/20 shadow-2xl p-1.5 space-y-1 font-body-plex"
            >
              <button
                type="button"
                role="menuitemradio"
                aria-checked={fitMode === 'screen' && zoom === 1}
                onClick={handleFitScreen}
                className={`w-full min-h-[42px] px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white ${
                  fitMode === 'screen' && zoom === 1
                    ? 'bg-[#68101C]/70 text-white'
                    : 'text-[#E9DEDE] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Maximize className="w-3.5 h-3.5 shrink-0 text-[#fca5a5]" />
                  <span>Fit Screen</span>
                  <span className="text-white/35">·</span>
                  <span dir="rtl">ملاءمة الشاشة</span>
                </span>
                {fitMode === 'screen' && zoom === 1 && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
              </button>

              <button
                type="button"
                role="menuitemradio"
                aria-checked={fitMode === 'width' && zoom === 1}
                onClick={handleFitWidth}
                className={`w-full min-h-[42px] px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white ${
                  fitMode === 'width' && zoom === 1
                    ? 'bg-[#68101C]/70 text-white'
                    : 'text-[#E9DEDE] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <MoveHorizontal className="w-3.5 h-3.5 shrink-0 text-[#fca5a5]" />
                  <span>Fit Width</span>
                  <span className="text-white/35">·</span>
                  <span dir="rtl">ملاءمة العرض</span>
                </span>
                {fitMode === 'width' && zoom === 1 && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={handleReset}
                disabled={isDefaultState}
                className="w-full min-h-[42px] px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-[#E9DEDE] hover:bg-white/[0.06] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0 text-[#fca5a5]" />
                <span>Reset</span>
                <span className="text-white/35">·</span>
                <span dir="rtl">إعادة ضبط</span>
              </button>

              {hasAnyTextContent && (
                <>
                  <div className="h-[1px] bg-white/10 my-1" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={scrollToCaption}
                    className="w-full min-h-[42px] px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-[#E9DEDE] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ArrowDown className="w-3.5 h-3.5 shrink-0 text-[#fca5a5]" />
                    <span>Jump to caption</span>
                    <span className="text-white/35">·</span>
                    <span dir="rtl">الانتقال للنص</span>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Help Popover (On-Demand Instructions) */}
          {helpOpen && (
            <div
              ref={helpPopoverRef}
              id="lightbox-help-popover"
              role="region"
              aria-label="Viewer instructions | تعليمات العارض"
              className="absolute right-2.5 sm:right-4 top-[calc(100%+6px)] z-30 w-[min(320px,calc(100vw-20px))] rounded-xl bg-[#16050a] border border-white/20 shadow-2xl p-3.5 space-y-2.5 font-body-plex"
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white">
                  Viewer Guide <span className="text-white/35">·</span>{' '}
                  <span dir="rtl">إرشادات العارض</span>
                </span>
                <button
                  type="button"
                  onClick={() => setHelpOpen(false)}
                  aria-label="Close help | إغلاق المساعدة"
                  className="w-7 h-7 rounded-md hover:bg-white/10 text-[#BDB5B5] hover:text-white inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p dir="rtl" className="text-[13.5px] text-[#E9DEDE] leading-[1.65] text-right">
                استخدم «ملاءمة الشاشة» لعرض الصورة كاملة، و«ملاءمة العرض» لقراءة الشرائح الطويلة بالتمرير، أو أزرار + / − وتكبير المتصفح لتفحص التفاصيل. مرّر أفقيًا ورأسيًا للوصول لكل الأطراف، ومرّر لأسفل لقراءة الكابشن والتوجيه الإبداعي كاملًا.
              </p>
              <p className="text-[12.5px] text-[#BDB5B5] leading-[1.55] border-t border-white/10 pt-2">
                Use Fit Screen, Fit Width, + / −, or native browser zoom. Scroll vertically and horizontally when zoomed. Keys: Esc, +, −, 0, PageUp / PageDown.
              </p>
            </div>
          )}
        </div>

        {/* Main Scrollable Content Viewport: Image (Natural Aspect, Zero Crop) + Direct Full Caption & Creative Direction */}
        <div
          ref={stageRef}
          id="lightbox-stage"
          tabIndex={0}
          aria-label="Slide and caption viewport — scroll to pan and read"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
          className={`flex-1 min-h-0 overflow-auto bg-[#070204] relative focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#b81d33] ${
            isFitScreenUnzoomed ? '' : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          {/* Image Canvas Wrapper — Preserves 100% Natural Aspect Ratio & Full Horizontal Reachability */}
          <div
            className={
              isFitScreenUnzoomed
                ? 'w-full p-2 sm:p-4 flex items-center justify-center'
                : 'w-max min-w-full p-2 sm:p-4 flex items-start'
            }
          >
            {activeImage ? (
              <img
                key={activeImage}
                src={activeImage}
                alt={currentSlide?.title || livePost.titleEn}
                onLoad={handleImageLoad}
                style={computedImgStyle}
                className="block mx-auto rounded-md bg-black shadow-lg slide-fade-enter"
              />
            ) : (
              <div
                className={`w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br ${livePost.gradientBg} p-6 flex flex-col justify-center items-center text-white text-center`}
              >
                <span className="text-5xl block">{livePost.emojiIcon}</span>
              </div>
            )}
          </div>

          {/* Direct Scrollable Caption, Slide Details & Creative Direction (No Extra Click, No Fixed Drawer, No Truncation) */}
          {hasAnyTextContent && (
            <div
              ref={captionSectionRef}
              id="lightbox-caption-section"
              style={{ width: viewportSize.width > 0 ? `${viewportSize.width}px` : '100%' }}
              className="sticky left-0 px-3 sm:px-6 pt-3 pb-8 bg-[#0e0407] border-t border-white/10 font-body-plex cursor-auto"
            >
              <div className="max-w-3xl mx-auto space-y-4">
                {currentSlide && (
                  <div className="bg-[#17060b] p-4 rounded-xl border border-white/10 space-y-1.5">
                    <span className="text-xs text-[#fca5a5] tracking-wider block font-bold tabular-nums">
                      SLIDE {currentSlide.slideNumber} · الشريحة {currentSlide.slideNumber}
                    </span>
                    <h4 className="text-base font-bold text-white leading-snug">
                      {currentSlide.title}
                    </h4>
                    <p className="text-[16px] text-[#E9DEDE] leading-[1.7] whitespace-pre-line break-words">
                      {currentSlide.description}
                    </p>
                  </div>
                )}

                {(fullOriginalCaption || livePost.hookEn) && (
                  <div className="bg-[#15050a] p-4 sm:p-5 rounded-xl border border-white/10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                      <span dir="rtl" className="text-xs font-bold text-[#fca5a5]">
                        الكابشن الكامل
                      </span>
                      <span className="text-xs font-semibold text-[#BDB5B5]">
                        {livePost.dateBadge}
                      </span>
                    </div>

                    {fullOriginalCaption && (
                      <p
                        id="lightbox-full-caption"
                        dir={isHindiCaption ? 'ltr' : 'rtl'}
                        className={`text-[16px] text-[#F5F2F1] leading-[1.8] whitespace-pre-line break-words ${
                          isHindiCaption ? 'text-left' : 'text-right'
                        }`}
                      >
                        {fullOriginalCaption}
                      </p>
                    )}

                    {livePost.hookEn && (
                      <p className="text-[15px] text-[#BDB5B5] leading-[1.65] whitespace-pre-line break-words pt-3 border-t border-white/10 text-left">
                        {livePost.hookEn}
                      </p>
                    )}
                  </div>
                )}

                {livePost.creativeDirectionAr && (
                  <div
                    id="lightbox-creative-direction"
                    className="bg-[#15050a] p-4 sm:p-5 rounded-xl border border-white/10 space-y-2"
                  >
                    <span
                      dir="rtl"
                      className="text-xs text-[#fca5a5] block font-bold text-right"
                    >
                      التوجيه الإبداعي للمصمم · Creative Direction
                    </span>
                    <p
                      dir="rtl"
                      className="text-[16px] text-[#E9DEDE] leading-[1.75] text-right whitespace-pre-line break-words"
                    >
                      {livePost.creativeDirectionAr}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Slim Single-Row Bottom Action Bar: Always-Accessible Zoom + Slide Navigation */}
        <div
          id="lightbox-bottom-bar"
          className="shrink-0 flex items-center justify-between gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#140509] border-t border-white/12 font-body-plex"
        >
          {/* Zoom Controls (+ inline Fit controls on md+ desktop) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out | تصغير"
              className="min-w-[40px] min-h-[40px] rounded-lg border border-white/15 bg-white/[0.04] hover:bg-[#68101C]/50 hover:border-[#b81d33] disabled:opacity-40 disabled:cursor-not-allowed text-white inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span
              className="min-w-[44px] text-center text-xs font-bold text-[#F5F2F1] tabular-nums select-none"
              aria-live="polite"
            >
              {zoomPercent}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in | تكبير"
              className="min-w-[40px] min-h-[40px] rounded-lg border border-white/15 bg-white/[0.04] hover:bg-[#68101C]/50 hover:border-[#b81d33] disabled:opacity-40 disabled:cursor-not-allowed text-white inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Quick desktop-only inline Fit/Reset shortcuts (mobile keeps these in Top View menu) */}
            <div className="hidden md:flex items-center gap-1.5 ml-2 pl-2 border-l border-white/10">
              <button
                type="button"
                onClick={handleFitScreen}
                aria-pressed={fitMode === 'screen' && zoom === 1}
                className={`min-h-[38px] px-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white ${
                  fitMode === 'screen' && zoom === 1
                    ? 'bg-[#68101C]/75 border-[#b81d33] text-white'
                    : 'bg-white/[0.04] border-white/15 text-[#E9DEDE] hover:text-white hover:border-white/35'
                }`}
              >
                <Maximize className="w-3.5 h-3.5 shrink-0" />
                <span>Fit Screen</span>
              </button>

              <button
                type="button"
                onClick={handleFitWidth}
                aria-pressed={fitMode === 'width' && zoom === 1}
                className={`min-h-[38px] px-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white ${
                  fitMode === 'width' && zoom === 1
                    ? 'bg-[#68101C]/75 border-[#b81d33] text-white'
                    : 'bg-white/[0.04] border-white/15 text-[#E9DEDE] hover:text-white hover:border-white/35'
                }`}
              >
                <MoveHorizontal className="w-3.5 h-3.5 shrink-0" />
                <span>Fit Width</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isDefaultState}
                aria-label="Reset zoom | إعادة ضبط"
                className="min-h-[38px] px-2.5 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-[#68101C]/50 hover:border-[#b81d33] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-[#E9DEDE] hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Right Side: Compact Slide Stepper (Multi-slide) or Scroll-to-Caption Shortcut (Single-slide) */}
          {hasMultipleSlides ? (
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button
                type="button"
                onClick={prevSlide}
                disabled={activeSlideIndex === 0}
                aria-label="Previous slide | الشريحة السابقة"
                className="min-w-[40px] min-h-[40px] sm:px-3 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 bg-white/[0.06] hover:bg-[#8A1526] disabled:opacity-35 disabled:cursor-not-allowed text-white border border-white/15 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <span className="min-w-[44px] text-center text-xs font-semibold text-[#F5F2F1] tabular-nums select-none">
                {activeSlideIndex + 1} / {totalSlides}
              </span>

              <button
                type="button"
                onClick={nextSlide}
                disabled={activeSlideIndex === totalSlides - 1}
                aria-label="Next slide | الشريحة التالية"
                className="min-w-[40px] min-h-[40px] sm:px-3 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 bg-white/[0.06] hover:bg-[#8A1526] disabled:opacity-35 disabled:cursor-not-allowed text-white border border-white/15 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          ) : hasAnyTextContent ? (
            <button
              type="button"
              onClick={scrollToCaption}
              aria-label="Scroll to caption | قراءة الكابشن"
              className="min-h-[40px] px-2.5 sm:px-3 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-[#68101C]/50 hover:border-[#b81d33] text-xs font-semibold text-[#E9DEDE] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white"
            >
              <span dir="rtl">الكابشن</span>
              <ArrowDown className="w-3.5 h-3.5 shrink-0 text-[#fca5a5]" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
