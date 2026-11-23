import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy, type RenderTask } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  MoveHorizontal,
  SlidersHorizontal,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export interface PdfDocumentRequest {
  id: string;
  pdfUrl: string;
  titleEn: string;
  titleAr: string;
  badgeEn: string;
  badgeAr?: string;
}

interface FullPdfViewerModalProps {
  documentRequest: PdfDocumentRequest | null;
  onClose: () => void;
}

type FitMode = 'screen' | 'width';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;
const MAX_CANVAS_SIDE = 4096;

export const FullPdfViewerModal: React.FC<FullPdfViewerModalProps> = ({
  documentRequest,
  onClose,
}) => {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>('1');
  const [loadProgress, setLoadProgress] = useState<number | null>(null);
  const [isLoadingDoc, setIsLoadingDoc] = useState<boolean>(false);
  const [isRenderingPage, setIsRenderingPage] = useState<boolean>(false);
  const [hasPaintedPage, setHasPaintedPage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  const [fitMode, setFitMode] = useState<FitMode>('screen');
  const [zoom, setZoom] = useState<number>(1);
  const [pageBaseSize, setPageBaseSize] = useState<{ width: number; height: number } | null>(null);
  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [toolsMenuOpen, setToolsMenuOpen] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const toolsBtnRef = useRef<HTMLButtonElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragOriginRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  // Reset state & load real PDF document whenever documentRequest changes
  useEffect(() => {
    if (!documentRequest) {
      setPdfDoc(null);
      setNumPages(0);
      setCurrentPage(1);
      setPageInput('1');
      setPageBaseSize(null);
      setErrorMessage(null);
      setIsLoadingDoc(false);
      setLoadProgress(null);
      return;
    }

    let cancelled = false;
    let loadedDoc: PDFDocumentProxy | null = null;

    setPdfDoc(null);
    setNumPages(0);
    setCurrentPage(1);
    setPageInput('1');
    setFitMode('screen');
    setZoom(1);
    setPageBaseSize(null);
    setToolsMenuOpen(false);
    setErrorMessage(null);
    setHasPaintedPage(false);
    setIsLoadingDoc(true);
    setLoadProgress(0);

    const loadingTask = getDocument({
      url: documentRequest.pdfUrl,
      useSystemFonts: true,
    });

    loadingTask.onProgress = (progress: { loaded: number; total: number }) => {
      if (cancelled) return;
      if (progress.total > 0) {
        const pct = Math.min(100, Math.round((progress.loaded / progress.total) * 100));
        setLoadProgress(pct);
      } else {
        setLoadProgress(null);
      }
    };

    loadingTask.promise
      .then((doc) => {
        if (cancelled) {
          doc.cleanup().catch(() => {});
          return;
        }
        loadedDoc = doc;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);
        setPageInput('1');
        setIsLoadingDoc(false);
        setLoadProgress(100);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Unable to load PDF document.';
        setErrorMessage(msg);
        setIsLoadingDoc(false);
      });

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
        renderTaskRef.current = null;
      }
      if (loadedDoc) {
        loadedDoc.cleanup().catch(() => {});
      }
      loadingTask.destroy().catch(() => {});
    };
  }, [documentRequest, reloadNonce]);

  // Sync page input field with currentPage
  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  // Reset scroll to top-left when page changes
  useEffect(() => {
    setToolsMenuOpen(false);
    if (stageRef.current) {
      stageRef.current.scrollTo({ top: 0, left: 0 });
    }
  }, [currentPage]);

  // Measure viewport dimensions
  useEffect(() => {
    if (!documentRequest) return;
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
  }, [documentRequest]);

  // Lock background page scroll & move focus into modal on open
  useEffect(() => {
    if (!documentRequest) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const rafId = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
    };
  }, [documentRequest]);

  // Close tools menu on outside click
  useEffect(() => {
    if (!toolsMenuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        toolsMenuRef.current &&
        !toolsMenuRef.current.contains(target) &&
        toolsBtnRef.current &&
        !toolsBtnRef.current.contains(target)
      ) {
        setToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [toolsMenuOpen]);

  const goToPage = useCallback(
    (targetPage: number) => {
      if (numPages <= 0) return;
      const clamped = Math.max(1, Math.min(numPages, Math.floor(targetPage)));
      setCurrentPage(clamped);
    },
    [numPages]
  );

  const goFirst = useCallback(() => goToPage(1), [goToPage]);
  const goPrev = useCallback(() => goToPage(currentPage - 1), [goToPage, currentPage]);
  const goNext = useCallback(() => goToPage(currentPage + 1), [goToPage, currentPage]);
  const goLast = useCallback(() => goToPage(numPages), [goToPage, numPages]);

  const handleZoomIn = useCallback(() => {
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
    setFitMode('screen');
    setZoom(1);
    setToolsMenuOpen(false);
    stageRef.current?.scrollTo({ top: 0, left: 0 });
  }, []);

  // Render active PDF page onto HiDPI canvas with exact natural aspect ratio
  useEffect(() => {
    if (!pdfDoc || numPages <= 0 || viewportSize.width <= 0 || viewportSize.height <= 0) {
      return;
    }

    let cancelled = false;
    setIsRenderingPage(true);

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        setPageBaseSize({ width: baseViewport.width, height: baseViewport.height });

        const horizontalPad = viewportSize.width < 640 ? 16 : 32;
        const verticalPad = viewportSize.width < 640 ? 16 : 32;
        const availW = Math.max(220, viewportSize.width - horizontalPad);
        const availH = Math.max(180, viewportSize.height - verticalPad);

        const fitScale =
          fitMode === 'screen'
            ? Math.min(availW / baseViewport.width, availH / baseViewport.height)
            : availW / baseViewport.width;

        const displayScale = Math.max(0.1, fitScale * zoom);
        const cssWidth = Math.max(120, Math.round(baseViewport.width * displayScale));
        const cssHeight = Math.max(80, Math.round(baseViewport.height * displayScale));

        const dpr = Math.min(window.devicePixelRatio || 1, 2.25);
        const maxScaleByCanvas = Math.min(
          MAX_CANVAS_SIDE / baseViewport.width,
          MAX_CANVAS_SIDE / baseViewport.height
        );
        const renderScale = Math.min(displayScale * dpr, maxScaleByCanvas);
        const renderViewport = page.getViewport({ scale: renderScale });

        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {
            // ignore
          }
          renderTaskRef.current = null;
        }

        canvas.width = Math.max(1, Math.floor(renderViewport.width));
        canvas.height = Math.max(1, Math.floor(renderViewport.height));
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;

        const task = page.render({
          canvas,
          viewport: renderViewport,
        });
        renderTaskRef.current = task;

        await task.promise;
        if (!cancelled) {
          renderTaskRef.current = null;
          setHasPaintedPage(true);
          setIsRenderingPage(false);
        }
      } catch (err: unknown) {
        if (cancelled) return;
        const name = err instanceof Error ? err.name : '';
        if (name === 'RenderingCancelledException') return;
        setIsRenderingPage(false);
      }
    };

    renderPage();

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, numPages, currentPage, fitMode, zoom, viewportSize.width, viewportSize.height]);

  // Keyboard navigation + focus trap inside dialog
  useEffect(() => {
    if (!documentRequest) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingInInput = target?.tagName === 'INPUT';

      if (e.key === 'Escape') {
        e.preventDefault();
        if (toolsMenuOpen) {
          setToolsMenuOpen(false);
          toolsBtnRef.current?.focus();
          return;
        }
        onClose();
        return;
      }

      if (!isTypingInInput) {
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
        if (e.key === 'Home') {
          e.preventDefault();
          goFirst();
          return;
        }
        if (e.key === 'End') {
          e.preventDefault();
          goLast();
          return;
        }

        const stage = stageRef.current;
        const isHorizontallyScrollable =
          stage !== null && stage.scrollWidth > stage.clientWidth + 4;

        if (e.key === 'PageDown' || (e.key === 'ArrowRight' && !isHorizontallyScrollable)) {
          e.preventDefault();
          goNext();
          return;
        }
        if (e.key === 'PageUp' || (e.key === 'ArrowLeft' && !isHorizontallyScrollable)) {
          e.preventDefault();
          goPrev();
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
    documentRequest,
    toolsMenuOpen,
    onClose,
    handleZoomIn,
    handleZoomOut,
    handleReset,
    goFirst,
    goPrev,
    goNext,
    goLast,
  ]);

  if (!documentRequest) return null;

  const isFitScreenUnzoomed = fitMode === 'screen' && zoom === 1;
  const zoomPercent = Math.round(zoom * 100);
  const isDefaultState = fitMode === 'screen' && zoom === 1;

  // Desktop mouse drag-to-pan when page overflows viewport
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
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

  const commitPageInput = () => {
    const parsed = parseInt(pageInput.replace(/[^\d]/g, ''), 10);
    if (!Number.isNaN(parsed) && numPages > 0) {
      goToPage(parsed);
    } else {
      setPageInput(String(currentPage));
    }
  };

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-50 bg-[#090708]/98 sm:bg-black/92 flex items-center justify-center sm:p-4 lg:p-6 modal-backdrop-enter"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div
        ref={dialogRef}
        id="full-pdf-viewer-dialog"
        className="relative w-full h-[100dvh] sm:h-[94dvh] sm:max-w-6xl bg-[#0e0407] sm:rounded-2xl border-0 sm:border border-[#8A1526]/45 shadow-2xl flex flex-col overflow-hidden modal-panel-enter"
      >
        {/* Top Bar */}
        <div
          id="pdf-viewer-top-bar"
          className="shrink-0 relative z-20 flex items-center justify-between gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#140509] border-b border-white/12 font-body-plex"
        >
          <div className="min-w-0 flex-1 flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-semibold text-[#fca5a5] tracking-wide whitespace-nowrap shrink-0 tabular-nums">
              {numPages > 0 ? `${numPages} PAGES` : documentRequest.badgeEn}
            </span>
            <span className="hidden sm:inline text-white/30 shrink-0" aria-hidden="true">
              ·
            </span>
            <h3
              id="pdf-viewer-title"
              dir="rtl"
              className="text-[13px] sm:text-sm font-bold text-white truncate text-right sm:text-left"
            >
              {documentRequest.titleAr}
              {documentRequest.titleEn ? (
                <span dir="ltr" className="hidden md:inline font-normal text-[#BDB5B5]">
                  {' '}
                  — {documentRequest.titleEn}
                </span>
              ) : null}
            </h3>
          </div>

          <div className="shrink-0 flex items-center gap-1 sm:gap-1.5">
            {/* View & Jump Menu */}
            <button
              ref={toolsBtnRef}
              type="button"
              onClick={() => setToolsMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={toolsMenuOpen}
              aria-controls="pdf-viewer-tools-menu"
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

            {/* Close Button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="shrink-0 min-w-[40px] min-h-[40px] sm:px-3 rounded-full bg-[#68101C] hover:bg-[#dc2626] text-white border border-[#ef4444]/50 inline-flex items-center justify-center gap-1.5 text-xs font-bold transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close PDF viewer | إغلاق العارض"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* Tools Dropdown */}
          {toolsMenuOpen && (
            <div
              ref={toolsMenuRef}
              id="pdf-viewer-tools-menu"
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

              {numPages > 1 && (
                <>
                  <div className="h-[1px] bg-white/10 my-1" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      goFirst();
                      setToolsMenuOpen(false);
                    }}
                    disabled={currentPage <= 1}
                    className="w-full min-h-[42px] px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-[#E9DEDE] hover:bg-white/[0.06] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronsLeft className="w-3.5 h-3.5 shrink-0 text-[#fca5a5]" />
                    <span>First Page (1)</span>
                    <span className="text-white/35">·</span>
                    <span dir="rtl">الصفحة الأولى</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      goLast();
                      setToolsMenuOpen(false);
                    }}
                    disabled={currentPage >= numPages}
                    className="w-full min-h-[42px] px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-[#E9DEDE] hover:bg-white/[0.06] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronsRight className="w-3.5 h-3.5 shrink-0 text-[#fca5a5]" />
                    <span>Last Page ({numPages})</span>
                    <span className="text-white/35">·</span>
                    <span dir="rtl">الصفحة الأخيرة</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Main Scrollable PDF Viewport */}
        <div
          ref={stageRef}
          id="pdf-viewer-stage"
          tabIndex={0}
          aria-label="Full PDF slide viewport — scroll to pan when zoomed"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
          className={`flex-1 min-h-0 overflow-auto bg-[#070204] relative focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#b81d33] ${
            isFitScreenUnzoomed ? '' : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          {isLoadingDoc && (
            <div
              id="pdf-viewer-loading"
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center font-body-plex bg-[#070204]/95"
            >
              <Loader2 className="w-8 h-8 text-[#ef4444] animate-spin" />
              <p dir="rtl" className="text-sm sm:text-base font-semibold text-white">
                جاري تحميل الملف كاملًا…
              </p>
              <p className="text-xs text-[#BDB5B5] tabular-nums">
                {loadProgress !== null
                  ? `Loading original document (${loadProgress}%)`
                  : 'Loading original PDF document…'}
              </p>
              <div className="w-56 max-w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#b81d33] transition-[width] duration-200"
                  style={{ width: `${loadProgress !== null ? Math.max(8, loadProgress) : 35}%` }}
                />
              </div>
            </div>
          )}

          {errorMessage && !isLoadingDoc && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center font-body-plex bg-[#070204]">
              <AlertCircle className="w-8 h-8 text-[#ef4444]" />
              <p dir="rtl" className="text-sm sm:text-base font-semibold text-white">
                تعذّر تحميل ملف الـ PDF حاليًا
              </p>
              <p className="text-xs text-[#BDB5B5] max-w-md break-words">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setReloadNonce((n) => n + 1)}
                className="mt-1 px-4 py-2 min-h-[40px] rounded-full bg-[#68101C] hover:bg-[#dc2626] text-white text-xs font-bold border border-[#ef4444]/50 transition-colors cursor-pointer"
              >
                Retry · إعادة المحاولة
              </button>
            </div>
          )}

          <div
            className={
              isFitScreenUnzoomed
                ? 'w-full min-h-full p-2 sm:p-4 flex items-center justify-center'
                : 'w-max min-w-full min-h-full p-2 sm:p-4 flex items-start justify-center'
            }
          >
            <div className="relative inline-flex items-center justify-center">
              <canvas
                ref={canvasRef}
                id="pdf-viewer-canvas"
                aria-label={`${documentRequest.titleEn} — Page ${currentPage} of ${numPages || '?'}`}
                className={`block mx-auto rounded-md bg-white shadow-2xl transition-opacity duration-200 ${
                  pdfDoc && hasPaintedPage ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {isRenderingPage && pdfDoc && !hasPaintedPage && (
                <div
                  aria-live="polite"
                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-center font-body-plex"
                >
                  <Loader2 className="w-7 h-7 text-[#ef4444] animate-spin" />
                  <span dir="rtl" className="text-xs sm:text-sm font-semibold text-[#E9DEDE]">
                    جاري تجهيز الصفحة {currentPage}…
                  </span>
                </div>
              )}
              {isRenderingPage && pdfDoc && hasPaintedPage && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/15 inline-flex items-center gap-1.5 text-[11px] font-body-plex text-white/90"
                >
                  <Loader2 className="w-3 h-3 text-[#ef4444] animate-spin" />
                  <span>{currentPage}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation & Zoom Bar */}
        <div
          id="pdf-viewer-bottom-bar"
          className="shrink-0 flex items-center justify-between gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#140509] border-t border-white/12 font-body-plex"
        >
          {/* Left: Zoom Controls (+ desktop Fit/Reset shortcuts) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM || !pdfDoc}
              aria-label="Zoom out | تصغير"
              className="min-w-[36px] sm:min-w-[40px] min-h-[40px] rounded-lg border border-white/15 bg-white/[0.04] hover:bg-[#68101C]/50 hover:border-[#b81d33] disabled:opacity-40 disabled:cursor-not-allowed text-white inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span
              className="min-w-[38px] sm:min-w-[44px] text-center text-[11px] sm:text-xs font-bold text-[#F5F2F1] tabular-nums select-none"
              aria-live="polite"
            >
              {zoomPercent}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM || !pdfDoc}
              aria-label="Zoom in | تكبير"
              className="min-w-[36px] sm:min-w-[40px] min-h-[40px] rounded-lg border border-white/15 bg-white/[0.04] hover:bg-[#68101C]/50 hover:border-[#b81d33] disabled:opacity-40 disabled:cursor-not-allowed text-white inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Desktop inline Fit & Reset shortcuts */}
            <div className="hidden lg:flex items-center gap-1.5 ml-2 pl-2 border-l border-white/10">
              <button
                type="button"
                onClick={handleFitScreen}
                disabled={!pdfDoc}
                aria-pressed={fitMode === 'screen' && zoom === 1}
                className={`min-h-[38px] px-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-white ${
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
                disabled={!pdfDoc}
                aria-pressed={fitMode === 'width' && zoom === 1}
                className={`min-h-[38px] px-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-white ${
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
                disabled={isDefaultState || !pdfDoc}
                aria-label="Reset zoom | إعادة ضبط"
                className="min-h-[38px] px-2.5 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-[#68101C]/50 hover:border-[#b81d33] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-[#E9DEDE] hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Right: Full Page Navigation (First / Prev / Jump Input / Total / Next / Last) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={goFirst}
              disabled={!pdfDoc || currentPage <= 1}
              aria-label="First page | الصفحة الأولى"
              title="First page | الصفحة الأولى"
              className="hidden min-[360px]:inline-flex min-w-[34px] sm:min-w-[38px] min-h-[40px] rounded-lg text-xs font-semibold items-center justify-center bg-white/[0.06] hover:bg-[#8A1526] disabled:opacity-35 disabled:cursor-not-allowed text-white border border-white/15 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronsLeft className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={goPrev}
              disabled={!pdfDoc || currentPage <= 1}
              aria-label="Previous page | الصفحة السابقة"
              className="min-w-[36px] sm:min-w-[40px] sm:px-2.5 min-h-[40px] rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 bg-white/[0.06] hover:bg-[#8A1526] disabled:opacity-35 disabled:cursor-not-allowed text-white border border-white/15 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">Prev</span>
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                commitPageInput();
              }}
              className="inline-flex items-center gap-1 px-1.5 sm:px-2 min-h-[40px] rounded-lg bg-black/55 border border-white/15 text-xs font-semibold text-[#F5F2F1] tabular-nums"
            >
              <input
                id="pdf-page-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-label="Page number | رقم الصفحة"
                value={pageInput}
                disabled={!pdfDoc}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={commitPageInput}
                className="w-8 sm:w-10 text-center bg-transparent text-white font-bold focus:outline-none focus:bg-white/10 rounded px-0.5 py-0.5 tabular-nums"
              />
              <span className="text-white/40 select-none">/</span>
              <span id="pdf-total-pages" className="text-[#E9DEDE] select-none pr-0.5">
                {numPages > 0 ? numPages : '—'}
              </span>
            </form>

            <button
              type="button"
              onClick={goNext}
              disabled={!pdfDoc || currentPage >= numPages}
              aria-label="Next page | الصفحة التالية"
              className="min-w-[36px] sm:min-w-[40px] sm:px-2.5 min-h-[40px] rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 bg-white/[0.06] hover:bg-[#8A1526] disabled:opacity-35 disabled:cursor-not-allowed text-white border border-white/15 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white"
            >
              <span className="hidden md:inline">Next</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={goLast}
              disabled={!pdfDoc || currentPage >= numPages}
              aria-label="Last page | الصفحة الأخيرة"
              title="Last page | الصفحة الأخيرة"
              className="hidden min-[360px]:inline-flex min-w-[34px] sm:min-w-[38px] min-h-[40px] rounded-lg text-xs font-semibold items-center justify-center bg-white/[0.06] hover:bg-[#8A1526] disabled:opacity-35 disabled:cursor-not-allowed text-white border border-white/15 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronsRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Hidden aspect debug attribute for clean natural aspect verification */}
        {pageBaseSize && (
          <span
            className="sr-only"
            data-pdf-page-size={`${Math.round(pageBaseSize.width)}x${Math.round(pageBaseSize.height)}`}
          />
        )}
      </div>
    </div>
  );
};
