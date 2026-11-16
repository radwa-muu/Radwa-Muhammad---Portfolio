import React, { useState, useEffect } from 'react';
import { SocialPost } from '../utils/portfolioData';
import { X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { useHorizontalSwipe } from '../hooks/useSwipeGesture';

interface VisualLightboxModalProps {
  post: SocialPost | null;
  onClose: () => void;
}

export const VisualLightboxModal: React.FC<VisualLightboxModalProps> = ({ post, onClose }) => {
  const { data, isEditMode, setIsEditMode, updatePost } = usePortfolio();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    setActiveSlideIndex(post?.initialSlideIndex ?? 0);
  }, [post?.id, post?.initialSlideIndex]);

  const livePost = post
    ? data.socialCampaigns[post.brandId]?.posts.find((p) => p.id === post.id) || post
    : null;

  const slides = livePost?.slides || [];
  const carouselImages =
    livePost?.carouselImages || (livePost?.imageUrl ? [livePost.imageUrl] : []);
  const totalSlides = livePost ? Math.max(slides.length, carouselImages.length, 1) : 1;
  const hasMultipleSlides = totalSlides > 1;

  const nextSlide = () => {
    if (activeSlideIndex < totalSlides - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prev) => prev - 1);
    }
  };

  const swipe = useHorizontalSwipe(prevSlide, nextSlide);

  useEffect(() => {
    if (!post || !hasMultipleSlides) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!post || !livePost) return null;

  const currentSlide = slides[activeSlideIndex] || null;
  const activeImage = currentSlide?.imageUrl || carouselImages[activeSlideIndex] || livePost.imageUrl;

  const updateCurrentSlide = (patch: { title?: string; description?: string }) => {
    if (!currentSlide) return;
    const nextSlides = slides.map((s, idx) =>
      idx === activeSlideIndex ? { ...s, ...patch } : s
    );
    updatePost(livePost.brandId, livePost.id, { slides: nextSlides });
  };

  const fullOriginalCaption = livePost.fullCaptionAr ?? livePost.hookAr;
  const isHindiCaption = /[\u0900-\u097F]/.test(fullOriginalCaption || '');

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-3 sm:p-6 overflow-y-auto modal-backdrop-enter"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div
        className={`relative ${
          livePost.aspectRatio === 'landscape' ? 'max-w-4xl' : 'max-w-2xl'
        } w-full bg-[#141414] rounded-3xl p-4 sm:p-7 border border-[#2a2a2a] shadow-2xl flex flex-col my-auto max-h-[92dvh] overflow-y-auto modal-panel-enter`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-stone-400 hover:text-white p-2 rounded-full bg-stone-900/90 hover:bg-[#dc2626] transition-colors duration-300 ease-out z-30 cursor-pointer"
          aria-label="Close modal | إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="pr-10 pl-1 text-left mb-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap font-body-plex">
            <EditableText
              as="span"
              value={livePost.dateBadge}
              onChange={(val) => updatePost(livePost.brandId, livePost.id, { dateBadge: val })}
              className="text-[11px] font-semibold text-[#ef4444] bg-[#dc2626]/10 px-2.5 py-0.5 rounded border border-[#dc2626]/30 tracking-wide"
            />
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
              {livePost.brandId}
            </span>
            {hasMultipleSlides && (
              <span className="text-xs font-semibold text-[#E9DEDE] bg-[#68101C]/40 px-2.5 py-0.5 rounded border border-[#8A1526]/45 tabular-nums">
                SLIDE {activeSlideIndex + 1} OF {totalSlides}
              </span>
            )}
          </div>

          <EditableText
            as="h3"
            id="lightbox-title"
            value={livePost.titleEn}
            onChange={(val) => updatePost(livePost.brandId, livePost.id, { titleEn: val })}
            className="font-displayEn text-3xl sm:text-4xl font-normal text-white uppercase tracking-[0.03em] leading-[0.95]"
          />
          <EditableText
            as="p"
            dir="rtl"
            value={livePost.titleAr}
            onChange={(val) => updatePost(livePost.brandId, livePost.id, { titleAr: val })}
            className="font-body-plex text-base sm:text-lg font-bold text-[#E9DEDE]/90 text-right mt-1.5 leading-snug"
          />
        </div>

        {/* Visual Container (Touch swipeable, zero overlay arrows on artwork) */}
        <div
          onTouchStart={hasMultipleSlides ? swipe.onTouchStart : undefined}
          onTouchEnd={hasMultipleSlides ? swipe.onTouchEnd : undefined}
          className={`swipe-deck w-full ${
            livePost.aspectRatio === 'landscape' ? 'aspect-video' : 'aspect-[4/5] sm:aspect-square'
          } rounded-2xl relative overflow-hidden bg-black border border-[#2a2a2a] shadow-inner flex items-center justify-center shrink-0`}
        >
          {activeImage ? (
            <img
              key={activeImage}
              src={activeImage}
              alt={currentSlide?.title || livePost.titleEn}
              className="w-full h-full object-contain bg-black slide-fade-enter"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${livePost.gradientBg} p-6 flex flex-col justify-between text-white text-center`}>
              <span className="text-5xl block my-auto">{livePost.emojiIcon}</span>
            </div>
          )}

          {/* Top Bar inside card */}
          <div className="absolute top-3 inset-x-3 flex justify-between items-center text-xs text-white/90 z-10 pointer-events-none font-body-plex">
            <span className="bg-black/85 px-3 py-1 rounded-full text-[11px] font-medium border border-white/15">
              {livePost.metaInfoEn || livePost.dateBadge}
            </span>
            {hasMultipleSlides && (
              <span className="bg-black/85 px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border border-white/20 text-[#E9DEDE] tabular-nums">
                <Layers className="w-3 h-3 text-[#ef4444]" />
                <span>{activeSlideIndex + 1} / {totalSlides}</span>
              </span>
            )}
          </div>
        </div>

        {/* Carousel Stepper Controls */}
        {hasMultipleSlides && (
          <div className="flex items-center justify-between mt-3 px-1 gap-2 font-body-plex">
            <button
              type="button"
              onClick={prevSlide}
              disabled={activeSlideIndex === 0}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-[background-color,border-color,color,opacity] duration-300 ease-out cursor-pointer ${
                activeSlideIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-white/5 text-stone-500'
                  : 'bg-[#1f1f1f] hover:bg-[#dc2626] text-white border border-[#2a2a2a]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`h-2 rounded-full transition-[width,background-color] duration-300 ease-out cursor-pointer ${
                    idx === activeSlideIndex ? 'w-6 bg-[#dc2626]' : 'w-2 bg-stone-700 hover:bg-stone-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              disabled={activeSlideIndex === totalSlides - 1}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-[background-color,border-color,color,opacity] duration-300 ease-out cursor-pointer ${
                activeSlideIndex === totalSlides - 1
                  ? 'opacity-40 cursor-not-allowed bg-white/5 text-stone-500'
                  : 'bg-[#1f1f1f] hover:bg-[#dc2626] text-white border border-[#2a2a2a]'
              }`}
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Thumbnail Strip */}
        {hasMultipleSlides && (
          <div className={`mt-3 grid gap-2 ${totalSlides >= 6 ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-4 sm:grid-cols-5'}`}>
            {Array.from({ length: totalSlides }).map((_, idx) => {
              const thumbSrc = slides[idx]?.imageUrl || carouselImages[idx] || livePost.imageUrl;
              if (!thumbSrc) return null;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`relative ${
                    livePost.aspectRatio === 'landscape' ? 'aspect-video' : 'aspect-[4/5]'
                  } rounded-lg overflow-hidden border-2 transition-[transform,opacity,border-color] duration-300 ease-out cursor-pointer ${
                    idx === activeSlideIndex
                      ? 'border-[#dc2626] ring-2 ring-[#dc2626]/40 scale-[1.02]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/35'
                  }`}
                  aria-label={`View slide ${idx + 1}`}
                >
                  <img
                    src={thumbSrc}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-body-plex font-semibold tabular-nums text-white">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Slide Details + Bilingual Caption */}
        <div className="mt-4 space-y-3 font-body-plex">
          {currentSlide && (
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#262626] space-y-1.5">
              <span className="text-[11px] font-body-plex text-[#E86677] uppercase tracking-wider block font-bold tabular-nums">
                SLIDE {currentSlide.slideNumber} | الشريحة {currentSlide.slideNumber}
              </span>
              <EditableText
                as="h4"
                value={currentSlide.title}
                onChange={(val) => updateCurrentSlide({ title: val })}
                className="text-sm sm:text-base font-bold text-white font-body-plex"
              />
              <EditableText
                as="p"
                multiline
                value={currentSlide.description}
                onChange={(val) => updateCurrentSlide({ description: val })}
                className="text-xs sm:text-sm text-stone-300 font-body-plex leading-relaxed whitespace-pre-line"
              />
            </div>
          )}

          {/* Post Caption Box */}
          <div className="bg-[#171717] p-4 rounded-xl border border-[#262626] space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-body-plex text-[#ef4444] uppercase tracking-wider font-bold">
                POST CAPTION &amp; ORIGINAL COPY | نص المنشور الكامل
              </span>
            </div>

            <EditableText
              as="p"
              multiline
              value={livePost.hookEn}
              onChange={(val) => updatePost(livePost.brandId, livePost.id, { hookEn: val })}
              className="text-xs sm:text-sm text-stone-300 font-body-plex leading-relaxed whitespace-pre-line"
              placeholder="Add English summary..."
            />

            <EditableText
              as="p"
              multiline
              dir={isHindiCaption ? 'ltr' : 'rtl'}
              value={fullOriginalCaption}
              onChange={(val) =>
                updatePost(livePost.brandId, livePost.id, { fullCaptionAr: val })
              }
              className={`text-xs sm:text-sm text-stone-200 font-body-plex leading-relaxed whitespace-pre-line pt-2.5 border-t border-[#262626] ${
                isHindiCaption ? 'text-left' : 'text-right'
              }`}
              placeholder="إضافة الكابشن الكامل هنا..."
            />
          </div>

          {/* Creative Direction */}
          {(livePost.creativeDirectionAr || isEditMode) && (
            <div className="bg-[#171717] p-4 rounded-xl border border-[#262626] space-y-1.5">
              <span className="text-[11px] font-body-plex text-stone-400 uppercase tracking-wider block font-bold">
                CREATIVE DIRECTION FOR DESIGNER | التوجيه الإبداعي للمصمم
              </span>
              <EditableText
                as="p"
                multiline
                dir="rtl"
                value={livePost.creativeDirectionAr || ''}
                onChange={(val) =>
                  updatePost(livePost.brandId, livePost.id, { creativeDirectionAr: val })
                }
                className="text-xs sm:text-sm text-stone-300 font-body-plex leading-relaxed text-right"
                placeholder="إضافة التوجيه الإبداعي للمصمم..."
              />
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400 pt-2 border-t border-[#262626] font-body-plex">
          <span className="text-[11px] font-medium tracking-wider text-stone-500">
            {isEditMode
              ? 'EDIT MODE ACTIVE — وضع التعديل مفعّل'
              : 'RADWA MUHAMMAD — CAMPAIGN ASSET'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300 ease-out cursor-pointer ${
                isEditMode
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-[#dc2626]/20 hover:bg-[#dc2626]/35 text-red-200 border border-[#dc2626]/40'
              }`}
            >
              {isEditMode ? 'DONE | تم التعديل' : 'EDIT CAPTIONS | تعديل'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-[#262626] hover:bg-[#333333] rounded-full text-white text-xs font-bold transition-colors duration-300 ease-out cursor-pointer"
            >
              CLOSE | إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
