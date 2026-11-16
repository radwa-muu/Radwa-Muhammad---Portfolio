import React, { useState } from 'react';
import { SocialPost, SocialCampaign } from '../utils/portfolioData';
import { Layers, Eye, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useHorizontalSwipe } from '../hooks/useSwipeGesture';

interface SocialMediaSectionProps {
  onOpenLightbox: (post: SocialPost) => void;
  onOpenInquiry?: (brandName?: string) => void;
}

// Interactive Carousel Card Component for multi-slide posts
const CarouselCard: React.FC<{
  post: SocialPost;
  brandNameEn: string;
  onOpenLightbox: (post: SocialPost) => void;
}> = ({ post, brandNameEn, onOpenLightbox }) => {
  const images = post.carouselImages || (post.imageUrl ? [post.imageUrl] : []);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = images.length || post.slidesCount || 1;
  const swipe = useHorizontalSwipe(
    () => setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides),
    () => setCurrentSlideIndex((prev) => (prev + 1) % totalSlides)
  );

  const isPortrait = post.aspectRatio === 'portrait' || (images[0] && images[0].includes('med_01'));

  return (
    <div
      onClick={() => {
        if (!swipe.shouldSuppressClick()) onOpenLightbox(post);
      }}
      onTouchStart={totalSlides > 1 ? swipe.onTouchStart : undefined}
      onTouchEnd={totalSlides > 1 ? swipe.onTouchEnd : undefined}
      className="swipe-deck card-luxury rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#8A1526] shadow-lg relative"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpenLightbox(post);
      }}
      aria-label={`View post for ${post.dateBadge}`}
    >
      {/* Visual Cover / Carousel Frame with exact natural aspect ratio & zero cropping */}
      <div className={`relative ${isPortrait ? 'aspect-[4/5]' : 'aspect-square'} bg-[#0e0306] overflow-hidden flex items-center justify-center p-1.5`}>
        {images.length > 0 ? (
          <img
            key={images[currentSlideIndex]}
            src={images[currentSlideIndex]}
            alt={`${post.titleAr} - Slide ${currentSlideIndex + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain rounded-lg slide-fade-enter"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${post.gradientBg} p-5 flex flex-col justify-between text-white rounded-lg`}>
            <span className="text-4xl block my-auto text-center">{post.emojiIcon}</span>
          </div>
        )}

        {/* Top bar inside card */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-center text-xs font-body-plex tabular-nums z-10 pointer-events-none">
          <span className="bg-black/85 px-2.5 py-0.5 rounded font-bold text-white text-[11px] border border-white/10">
            {brandNameEn}
          </span>
          <span className="bg-black/85 px-2.5 py-0.5 rounded-full text-[11px] flex items-center gap-1 border border-white/15 text-amber-300">
            <Layers className="w-3 h-3 text-cyan-300" />
            <span>{currentSlideIndex + 1} / {totalSlides}</span>
          </span>
        </div>

        {/* Carousel Pagination Dots */}
        {totalSlides > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out ${
                  idx === currentSlideIndex
                    ? 'w-5 bg-[#dc2626] shadow-sm'
                    : 'w-1.5 bg-white/55'
                }`}
              />
            ))}
          </div>
        )}

        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Text Hook Area */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-[#120306]/90 border-t border-[rgba(104,16,28,0.35)] space-y-2.5">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center gap-2">
            <span className="text-body-21">{post.dateBadge}</span>
            <span className="text-[11px] font-body-plex text-stone-300 bg-white/5 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
              <Eye className="w-3 h-3 text-[#8A1526]" />
            </span>
          </div>

          <h4 className="text-body-21 leading-snug">{post.titleEn}</h4>
          <p dir="rtl" className="text-body-21 leading-snug">
            {post.titleAr}
          </p>
        </div>

        <p dir="rtl" className="text-body-21 leading-relaxed opacity-90">
          {post.hookAr}
        </p>
      </div>
    </div>
  );
};

// Clean bare square post card for MiMi Mo timeline strip
const MiMiMoPostCard: React.FC<{
  post: SocialPost;
  isFirst: boolean;
  isLast: boolean;
  onOpenLightbox: (post: SocialPost) => void;
}> = ({ post, isFirst, isLast, onOpenLightbox }) => {
  const imgSrc = post.imageUrl || post.carouselImages?.[0];

  return (
    <div className="flex flex-col group/mm max-w-[360px] sm:max-w-none mx-auto sm:mx-0 w-full">
      {/* Bare crisp square image */}
      <div
        onClick={() => onOpenLightbox(post)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onOpenLightbox(post);
        }}
        aria-label={`View post ${post.dateBadge}`}
        className="touch-card relative aspect-square rounded-[4px] overflow-hidden bg-[#120306] group cursor-pointer shadow-lg transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mm:-translate-y-1.5 group-active/mm:-translate-y-1.5 group-hover/mm:ring-1 group-hover/mm:ring-[#b81d33]/80 group-active/mm:ring-1 group-active/mm:ring-[#dc2626]"
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={post.titleEn || post.dateBadge}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${post.gradientBg} p-5 flex items-center justify-center`}>
            <span className="text-4xl">{post.emojiIcon}</span>
          </div>
        )}
      </div>

      {/* Horizontal timeline track + centered white dot */}
      <div className="flex items-center justify-center relative my-3.5 sm:my-4">
        <div
          className={`absolute h-[1px] bg-white/30 group-hover/mm:bg-[#8A1526]/70 group-active/mm:bg-[#8A1526]/70 transition-colors duration-300 ease-out left-0 right-0 ${
            isFirst && isLast
              ? 'lg:left-0 lg:right-0'
              : isFirst
              ? 'lg:left-0 lg:-right-2.5'
              : isLast
              ? 'lg:-left-2.5 lg:right-0'
              : 'lg:-left-2.5 lg:-right-2.5'
          }`}
        />
        <span className="w-2.5 h-2.5 rounded-full bg-white group-hover/mm:bg-[#dc2626] group-active/mm:bg-[#dc2626] transition-colors duration-300 ease-out relative z-10 shadow-[0_0_8px_rgba(255,255,255,0.65)]" />
      </div>

      {/* Date heading in Bebas Neue */}
      <h4 className="font-displayEn font-normal text-[26px] sm:text-[30px] leading-none text-white group-hover/mm:text-[#fca5a5] transition-colors duration-300 ease-out tracking-wide text-center">
        {post.dateBadge}
      </h4>

      {/* Arabic quoted caption underneath */}
      <div
        onClick={() => onOpenLightbox(post)}
        className="cursor-pointer"
        title="اضغط لعرض الكابشن كاملًا"
      >
        <p
          dir="rtl"
          className="font-body-plex font-normal text-[14px] sm:text-[13.5px] text-[#E9DEDE]/90 group-hover/mm:text-white transition-colors duration-300 ease-out leading-[1.6] text-right mt-2 line-clamp-3"
        >
          {post.hookAr}
        </p>
      </div>
    </div>
  );
};

// Stacked physical deck carousel card for Medianesta
const MedianestaDeckCard: React.FC<{
  post: SocialPost;
  onOpenLightbox: (post: SocialPost) => void;
}> = ({ post, onOpenLightbox }) => {
  const images = post.carouselImages || (post.imageUrl ? [post.imageUrl] : []);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = images.length || post.slidesCount || 1;

  const goNext = () => setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  const goPrev = () => setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const swipe = useHorizontalSwipe(goPrev, goNext);

  const peekOffsets = [
    { offsetIdx: 1, leftPct: '7.5%', insetPct: '1.6%', z: 'z-20', opacityClass: 'opacity-[0.6]' },
    { offsetIdx: 2, leftPct: '14.5%', insetPct: '3.2%', z: 'z-10', opacityClass: 'opacity-[0.38]' },
  ];

  const parts = (post.dateBadge || `${post.titleEn} | ${post.titleAr}`).split('|').map((s) => s.trim());
  const enPart = parts[0] || post.titleEn;
  const arPart = parts[1] || post.titleAr;

  return (
    <div className="flex flex-col group/deck">
      {/* Stacked Deck Visual Container */}
      <div
        onClick={() => {
          if (!swipe.shouldSuppressClick()) onOpenLightbox(post);
        }}
        onTouchStart={totalSlides > 1 ? swipe.onTouchStart : undefined}
        onTouchEnd={totalSlides > 1 ? swipe.onTouchEnd : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onOpenLightbox(post);
        }}
        aria-label={`View carousel ${post.titleEn}`}
        className="swipe-deck touch-card relative w-full group cursor-pointer select-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/deck:-translate-y-1.5 group-active/deck:-translate-y-1.5"
      >
        <div className="relative w-full">
          {/* Peeking layers rendered behind front card */}
          {images.length > 1 &&
            peekOffsets.map((layer) => {
              if (layer.offsetIdx >= images.length) return null;
              const imgIdx = (currentSlideIndex + layer.offsetIdx) % images.length;
              return (
                <div
                  key={layer.offsetIdx}
                  className={`absolute w-[82%] rounded-[4px] overflow-hidden bg-[#0e0306] shadow-md pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/deck:translate-x-1 group-active/deck:translate-x-1 ${layer.z}`}
                  style={{
                    left: layer.leftPct,
                    top: layer.insetPct,
                    bottom: layer.insetPct,
                  }}
                >
                  <img
                    src={images[imgIdx]}
                    alt={`${post.titleEn} preview ${imgIdx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover object-top ${layer.opacityClass}`}
                  />
                </div>
              );
            })}

          {/* Front active slide */}
          <div className="relative w-[82%] aspect-square rounded-[4px] overflow-hidden z-30 bg-[#120306] shadow-lg transition-[box-shadow,border-color] duration-300 ease-out group-hover/deck:ring-1 group-hover/deck:ring-[#b81d33]/80 group-active/deck:ring-1 group-active/deck:ring-[#dc2626]">
            {images.length > 0 ? (
              <img
                key={images[currentSlideIndex]}
                src={images[currentSlideIndex]}
                alt={`${post.titleEn} - Slide ${currentSlideIndex + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top slide-fade-enter"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${post.gradientBg} p-5 flex items-center justify-center`}>
                <span className="text-4xl">{post.emojiIcon}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text below stacked deck */}
      <div className="mt-4">
        <div className="flex flex-wrap items-baseline justify-center gap-x-2 text-center">
          <h4 className="font-displayEn font-normal text-[25px] sm:text-[27px] leading-none text-white tracking-wide uppercase">
            {enPart}
          </h4>
          {arPart && (
            <>
              <span className="text-white/35 text-lg leading-none">|</span>
              <span dir="rtl" className="font-body-plex font-bold text-[17px] sm:text-[18px] text-white leading-snug">
                {arPart}
              </span>
            </>
          )}
        </div>

        <span className="block font-body-plex text-[13px] text-white/45 mt-1 text-center">
          {totalSlides} {totalSlides === 1 ? 'slide' : 'slides'}
        </span>

        <div
          onClick={() => onOpenLightbox(post)}
          className="cursor-pointer"
          title="اضغط لعرض الكابشن كاملًا"
        >
          <p
            dir="rtl"
            className="font-body-plex font-normal text-[13.5px] sm:text-[14px] text-[#E9DEDE]/85 group-hover/deck:text-white transition-colors duration-300 ease-out leading-[1.6] text-right mt-2.5 line-clamp-3"
          >
            {post.hookAr}
          </p>
        </div>
      </div>
    </div>
  );
};

// Clean 4:5 Portrait / Stacked-Deck card for showcase brands
const BrandShowcaseCard: React.FC<{
  post: SocialPost;
  isWorldHunter: boolean;
  onOpenLightbox: (post: SocialPost) => void;
}> = ({ post, isWorldHunter, onOpenLightbox }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const carouselSlides = post.carouselImages && post.carouselImages.length > 0 ? post.carouselImages : [];
  const imgSrc =
    carouselSlides.length > 0
      ? carouselSlides[currentSlideIndex] || carouselSlides[0]
      : post.imageUrl;
  const peekSlices = post.peekImages || [];
  const hasRealDeck = carouselSlides.length > 1;

  const goNext = () => {
    if (carouselSlides.length > 1) {
      setCurrentSlideIndex((prev) => (prev + 1) % carouselSlides.length);
    }
  };
  const goPrev = () => {
    if (carouselSlides.length > 1) {
      setCurrentSlideIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    }
  };
  const swipe = useHorizontalSwipe(goPrev, goNext);

  // Detect Hindi / Devanagari caption (e.g. Creative Mark cm-2) for LTR alignment
  const isHindiScript = /[\u0900-\u097F]/.test(post.hookAr || '');

  const peekOffsets = [
    { offsetIdx: 1, leftPct: '7.5%', insetPct: '1.6%', z: 'z-20', opacityClass: 'opacity-[0.62]' },
    { offsetIdx: 2, leftPct: '14.5%', insetPct: '3.2%', z: 'z-10', opacityClass: 'opacity-[0.4]' },
  ];

  return (
    <div className="flex flex-col group/showcase">
      <div
        onClick={() => {
          if (!swipe.shouldSuppressClick()) onOpenLightbox(post);
        }}
        onTouchStart={hasRealDeck ? swipe.onTouchStart : undefined}
        onTouchEnd={hasRealDeck ? swipe.onTouchEnd : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onOpenLightbox(post);
        }}
        aria-label={`View post ${post.dateBadge}`}
        className="swipe-deck touch-card relative w-full group cursor-pointer select-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/showcase:-translate-y-1.5 group-active/showcase:-translate-y-1.5"
      >
        <div className="relative w-full">
          {hasRealDeck
            ? peekOffsets.map((layer) => {
                if (layer.offsetIdx >= carouselSlides.length) return null;
                const imgIdx = (currentSlideIndex + layer.offsetIdx) % carouselSlides.length;
                return (
                  <div
                    key={layer.offsetIdx}
                    className={`absolute w-[82%] rounded-[4px] overflow-hidden shadow-md bg-[#0e0306] pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/showcase:translate-x-1 group-active/showcase:translate-x-1 ${layer.z}`}
                    style={{
                      left: layer.leftPct,
                      top: layer.insetPct,
                      bottom: layer.insetPct,
                    }}
                  >
                    <img
                      src={carouselSlides[imgIdx]}
                      alt={`${post.dateBadge} slide ${imgIdx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover object-top ${layer.opacityClass}`}
                    />
                  </div>
                );
              })
            : peekSlices.length > 0 &&
              peekSlices.slice(0, 2).map((peekSrc, idx) => {
                const layer = peekOffsets[idx];
                if (!layer) return null;
                return (
                  <div
                    key={idx}
                    className={`absolute w-[82%] rounded-[4px] overflow-hidden shadow-md flex justify-end bg-[#0e0306] pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/showcase:translate-x-1 group-active/showcase:translate-x-1 ${layer.z}`}
                    style={{
                      left: layer.leftPct,
                      top: layer.insetPct,
                      bottom: layer.insetPct,
                    }}
                  >
                    <img
                      src={peekSrc}
                      alt={`${post.dateBadge} slide ${idx + 2}`}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-[11%] object-fill ${layer.opacityClass}`}
                    />
                  </div>
                );
              })}

          <div
            className={`relative ${
              post.aspectRatio === 'square' && !hasRealDeck && peekSlices.length === 0
                ? 'w-full aspect-square'
                : 'w-[82%] aspect-[4/5]'
            } rounded-[4px] overflow-hidden z-30 bg-[#120306] shadow-lg transition-[box-shadow,border-color] duration-300 ease-out group-hover/showcase:ring-1 group-hover/showcase:ring-[#b81d33]/80 group-active/showcase:ring-1 group-active/showcase:ring-[#dc2626]`}
          >
            {imgSrc ? (
              <img
                key={imgSrc}
                src={imgSrc}
                alt={post.titleEn || post.dateBadge}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top slide-fade-enter"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${post.gradientBg} p-5 flex items-center justify-center`}>
                <span className="text-4xl">{post.emojiIcon}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text below artwork */}
      <div className="mt-4">
        {post.dateBadge.includes('|') ? (
          (() => {
            const parts = post.dateBadge.split('|').map((s) => s.trim());
            const enPart = parts[0];
            const arPart = parts[1];
            return (
              <div className="flex flex-wrap items-baseline justify-center gap-x-2 text-center">
                <h4 className="font-displayEn font-normal text-[25px] sm:text-[27px] leading-none text-white tracking-wide uppercase">
                  {enPart}
                </h4>
                {arPart && (
                  <>
                    <span className="text-white/35 text-lg leading-none">|</span>
                    <span dir="rtl" className="font-body-plex font-bold text-[17px] sm:text-[18px] text-white leading-snug">
                      {arPart}
                    </span>
                  </>
                )}
              </div>
            );
          })()
        ) : (
          <h4 className="font-displayEn font-normal text-[26px] sm:text-[28px] leading-none text-white tracking-wide uppercase text-center">
            {post.dateBadge}
          </h4>
        )}

        {!isWorldHunter && post.metaInfoEn && (
          <span className="block font-body-plex text-[13px] text-white/45 mt-1 text-center">
            {post.metaInfoEn}
          </span>
        )}

        <div
          onClick={() => onOpenLightbox(post)}
          className="cursor-pointer"
          title="اضغط لعرض الكابشن كاملًا"
        >
          <p
            dir={isHindiScript ? 'ltr' : 'rtl'}
            className={`font-body-plex font-normal text-[13.5px] sm:text-[14px] text-[#E9DEDE]/85 group-hover/showcase:text-white transition-colors duration-300 ease-out leading-[1.6] mt-2.5 ${
              isHindiScript ? 'text-left' : 'text-right'
            } line-clamp-3`}
          >
            {post.hookAr}
          </p>
        </div>

        {isWorldHunter && post.engagement && (
          <span className="block font-body-plex text-[13px] text-white/45 mt-1.5">
            {post.engagement}
          </span>
        )}
      </div>
    </div>
  );
};

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ onOpenLightbox, onOpenInquiry }) => {
  const { data } = usePortfolio();
  const campaignsList = Object.values(data.socialCampaigns);

  const formatBrandTitleAr = (campId: string, raw: string) => {
    if (campId === 'mimimo' && raw === 'ميـــمي مو') return 'ميمي مو';
    if (campId === 'medianesta' && raw === 'ميـــديانيستا') return 'ميديانيستا';
    if (campId === 'worldhunter' && raw === 'الصـــياد العالمي') return 'الصياد العالمي';
    if (campId === 'zeldar' && raw === 'ظـــل الــــدار') return 'ظل الدار';
    if (campId === 'filmrent' && raw === 'فيلـــمرنت') return 'فيلمرنت';
    if (campId === 'creativemark' && raw === 'كريتيـــف مارك') return 'كريتيف مارك';
    return raw;
  };

  return (
    <>
      {/* Section 01 Divider: SOCIAL MEDIA CONTENT */}
      <section
        id="social-media-content"
        className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip flex flex-col justify-center items-center"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center select-none cursor-default interactive-lockup">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-right" />
            <span className="text-[38px] sm:text-[48px] font-displayEn font-normal text-white tracking-[0.06em] leading-none block">
              01
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-left" />
          </div>

          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear lg:whitespace-nowrap"
            style={{ fontSize: 'clamp(42px, calc(10.5 * var(--vw, 1vw)), 162px)' }}
          >
            SOCIAL MEDIA CONTENT
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white leading-none text-center -mt-[0.26em] sm:-mt-[0.36em]"
            style={{
              fontSize: 'clamp(28px, calc(6 * var(--vw, 1vw)), 92px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            محتوى السوشيال ميديا
          </p>
        </div>
      </section>

      {/* Social Media Brands */}
      {campaignsList.map((camp: SocialCampaign) => {
        const isMiMiMo = camp.id === 'mimimo';
        const isMedianesta = camp.id === 'medianesta';
        const isMultiWordTitle = camp.id === 'worldhunter' || camp.id === 'creativemark';
        const isElHoofy = camp.id === 'elhoofy';

        return (
          <section
            key={camp.id}
            className="py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip"
          >
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Top Header Block: Centered brand title + 2 centered top-lined info columns */}
              <div className={isMiMiMo ? 'mb-8 lg:mb-10' : isMedianesta ? 'mb-7 lg:mb-8' : 'mb-8 lg:mb-10'}>
                {/* Centered Brand Title Lockup */}
                <div className="text-center mb-6 lg:mb-8">
                  <div className="w-fit max-w-full mx-auto relative select-none text-center cursor-default interactive-lockup">
                    <h3
                      style={{
                        fontSize: isElHoofy
                          ? 'clamp(40px, calc(6 * var(--vw, 1vw)), 84px)'
                          : isMultiWordTitle
                          ? 'clamp(36px, calc(5.2 * var(--vw, 1vw)), 74px)'
                          : 'clamp(44px, calc(6.8 * var(--vw, 1vw)), 94px)',
                      }}
                      className={`font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear ${
                        isElHoofy || isMultiWordTitle ? 'sm:whitespace-nowrap' : ''
                      }`}
                    >
                      {camp.brandNameEn}
                    </h3>
                    <p
                      dir="rtl"
                      style={{
                        fontSize: isElHoofy
                          ? 'clamp(26px, calc(3.1 * var(--vw, 1vw)), 44px)'
                          : isMultiWordTitle
                          ? 'clamp(28px, calc(3.6 * var(--vw, 1vw)), 50px)'
                          : 'clamp(30px, calc(4.2 * var(--vw, 1vw)), 58px)',
                        textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                      }}
                      className={`font-amiri font-bold text-white leading-none text-center ${
                        isElHoofy
                          ? '-mt-[0.38em] sm:-mt-[0.42em]'
                          : isMultiWordTitle
                          ? '-mt-[0.40em] sm:-mt-[0.46em]'
                          : isMiMiMo
                          ? '-mt-[0.42em] sm:-mt-[0.52em]'
                          : '-mt-[0.38em] sm:-mt-[0.42em]'
                      }`}
                    >
                      {formatBrandTitleAr(camp.id, camp.brandNameAr)}
                    </p>
                  </div>
                </div>

                {/* 2 Top-Lined Columns: The campaign/client/platform + My role */}
                <div data-layout-grid className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                  <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                    <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                      <span className="font-body-plex font-bold text-white">
                        {camp.campaignLabelEn}
                      </span>
                      <span className="text-white/35">|</span>
                      <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                        {camp.campaignLabelAr}
                      </span>
                    </div>
                    <p className="font-body-plex text-[14.5px] sm:text-[15.5px] text-white/90 leading-[1.45] text-left">
                      {camp.campaignEn}
                    </p>
                    <p
                      dir="rtl"
                      className="font-body-plex text-[14.5px] sm:text-[15.5px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                    >
                      {camp.campaignAr}
                    </p>
                  </div>

                  <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                    <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                      <span className="font-body-plex font-bold text-white">
                        {camp.roleLabelEn}
                      </span>
                      <span className="text-white/35">|</span>
                      <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                        {camp.roleLabelAr}
                      </span>
                    </div>
                    <p className="font-body-plex text-[14.5px] sm:text-[15.5px] text-white/90 leading-[1.45] text-left">
                      {camp.roleEn}
                    </p>
                    <p
                      dir="rtl"
                      className="font-body-plex text-[14.5px] sm:text-[15.5px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                    >
                      {camp.roleAr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medianesta Carousel Explainer Subtitle Row above Decks */}
              {isMedianesta && camp.subInfoEn && (
                <div className="mb-7">
                  <p className="font-body-plex text-[14.5px] sm:text-[15.5px] text-[#BDB5B5] text-center leading-relaxed">
                    {`${camp.subInfoEn} | ${camp.subInfoAr || ''}`}
                  </p>
                </div>
              )}

              {/* Posts Showcase Grid */}
              {isMiMiMo ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-5">
                  {camp.posts.map((post, idx) => (
                    <MiMiMoPostCard
                      key={post.id}
                      post={post}
                      isFirst={idx === 0}
                      isLast={idx === camp.posts.length - 1}
                      onOpenLightbox={onOpenLightbox}
                    />
                  ))}
                </div>
              ) : isMedianesta ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {camp.posts.map((post) => (
                    <MedianestaDeckCard
                      key={post.id}
                      post={post}
                      onOpenLightbox={onOpenLightbox}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {camp.posts.map((post) => (
                    <BrandShowcaseCard
                      key={post.id}
                      post={post}
                      isWorldHunter={camp.id === 'worldhunter'}
                      onOpenLightbox={onOpenLightbox}
                    />
                  ))}
                </div>
              )}

              {/* Bottom-Right Clean Pill Outline CTA Button */}
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 pt-8 sm:pt-10">
                {camp.brandUrl ? (
                  <a
                    href={camp.brandUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-btn px-6 sm:px-7 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14.5px] sm:text-[15px] text-center"
                  >
                    <span className="text-white">{camp.pageButtonTextEn}</span>
                    <span className="text-white/45">|</span>
                    <span className="text-[#E9DEDE]">{camp.pageButtonTextAr}</span>
                    <ExternalLink className="w-4 h-4 text-amber-300 shrink-0 hidden" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenInquiry?.(camp.brandNameEn)}
                    className="interactive-btn px-6 sm:px-7 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14.5px] sm:text-[15px] text-center"
                  >
                    <span className="text-white">{camp.pageButtonTextEn}</span>
                    <span className="text-white/45">|</span>
                    <span className="text-[#E9DEDE]">{camp.pageButtonTextAr}</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};
