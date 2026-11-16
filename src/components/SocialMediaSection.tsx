import React, { useState, useRef } from 'react';
import { SocialPost, SocialCampaign } from '../utils/portfolioData';
import { Layers, Eye, ExternalLink, Plus, Trash2, ImagePlus } from 'lucide-react';
import { usePortfolio, compressImageFile } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { useHorizontalSwipe } from '../hooks/useSwipeGesture';

interface SocialMediaSectionProps {
  onOpenLightbox: (post: SocialPost) => void;
  onOpenInquiry?: (brandName?: string) => void;
}

// Interactive Carousel Card Component for multi-slide posts (like Medianesta)
const CarouselCard: React.FC<{
  post: SocialPost;
  campaignId: string;
  brandNameEn: string;
  onOpenLightbox: (post: SocialPost) => void;
}> = ({ post, campaignId, brandNameEn, onOpenLightbox }) => {
  const { isEditMode, updatePost, deletePost } = usePortfolio();
  const images = post.carouselImages || (post.imageUrl ? [post.imageUrl] : []);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSlides = images.length || post.slidesCount || 1;
  const swipe = useHorizontalSwipe(
    () => setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides),
    () => setCurrentSlideIndex((prev) => (prev + 1) % totalSlides)
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      if (post.carouselImages && post.carouselImages.length > 0) {
        const updated = [...post.carouselImages];
        updated[currentSlideIndex] = compressed;
        updatePost(campaignId, post.id, { carouselImages: updated });
      } else {
        updatePost(campaignId, post.id, { imageUrl: compressed });
      }
    } catch {
      // ignore invalid image
    }
    e.target.value = '';
  };

  const isPortrait = post.aspectRatio === 'portrait' || (images[0] && images[0].includes('med_01'));

  return (
    <div
      onClick={() => {
        if (!isEditMode && !swipe.shouldSuppressClick()) onOpenLightbox(post);
      }}
      onTouchStart={totalSlides > 1 ? swipe.onTouchStart : undefined}
      onTouchEnd={totalSlides > 1 ? swipe.onTouchEnd : undefined}
      className="swipe-deck card-luxury rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#8A1526] shadow-lg relative"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !isEditMode) onOpenLightbox(post);
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

        {/* Edit Mode Image & Delete Controls */}
        {isEditMode && (
          <div
            className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-full bg-black/85 hover:bg-[#8A1526] text-white text-[11px] border border-white/25 flex items-center gap-1 shadow-lg cursor-pointer"
              title="تغيير أو رفع صورة | Upload/Replace Image"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              <span>تغيير الصورة</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => deletePost(campaignId, post.id)}
              className="p-1.5 rounded-full bg-black/85 hover:bg-red-700 text-red-200 hover:text-white border border-white/25 shadow-lg cursor-pointer"
              title="حذف المنشور | Delete post"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

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

      {/* Text Hook Area — Heading 32: IBM Plex Sans Arabic Regular 21px #E9DEDE */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-[#120306]/90 border-t border-[rgba(104,16,28,0.35)] space-y-2.5">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center gap-2">
            <EditableText
              as="span"
              value={post.dateBadge}
              onChange={(val) => updatePost(campaignId, post.id, { dateBadge: val })}
              className="text-body-21"
            />
            {!isEditMode && (
              <span className="text-[11px] font-body-plex text-stone-300 bg-white/5 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                <Eye className="w-3 h-3 text-[#8A1526]" />
              </span>
            )}
          </div>

          {/* Title: English on top, Arabic underneath */}
          <EditableText
            as="h4"
            value={post.titleEn}
            onChange={(val) => updatePost(campaignId, post.id, { titleEn: val })}
            className="text-body-21 leading-snug"
          />
          <EditableText
            as="p"
            dir="rtl"
            value={post.titleAr}
            onChange={(val) => updatePost(campaignId, post.id, { titleAr: val })}
            className="text-body-21 leading-snug"
          />
        </div>

        {/* Caption Hook: Arabic preview */}
        <EditableText
          as="p"
          multiline
          dir="rtl"
          value={post.hookAr}
          onChange={(val) => updatePost(campaignId, post.id, { hookAr: val })}
          className="text-body-21 leading-relaxed opacity-90"
        />
      </div>
    </div>
  );
};

// Clean bare square post card for MiMi Mo timeline strip (matches image_3803692a.png)
const MiMiMoPostCard: React.FC<{
  post: SocialPost;
  campaignId: string;
  isFirst: boolean;
  isLast: boolean;
  onOpenLightbox: (post: SocialPost) => void;
}> = ({ post, campaignId, isFirst, isLast, onOpenLightbox }) => {
  const { isEditMode, updatePost, deletePost } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgSrc = post.imageUrl || post.carouselImages?.[0];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      updatePost(campaignId, post.id, { imageUrl: compressed });
    } catch {
      // ignore invalid image
    }
    e.target.value = '';
  };

  return (
    <div className="flex flex-col group/mm">
      {/* Bare crisp square image matching reference */}
      <div
        onClick={() => !isEditMode && onOpenLightbox(post)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isEditMode) onOpenLightbox(post);
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

        {isEditMode && (
          <div
            className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-full bg-black/85 hover:bg-[#8A1526] text-white text-[11px] border border-white/25 flex items-center gap-1 shadow-lg cursor-pointer"
              title="تغيير أو رفع صورة | Upload/Replace Image"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              <span>تغيير الصورة</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => deletePost(campaignId, post.id)}
              className="p-1.5 rounded-full bg-black/85 hover:bg-red-700 text-red-200 hover:text-white border border-white/25 shadow-lg cursor-pointer"
              title="حذف المنشور | Delete post"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal continuous timeline track + centered white dot */}
      <div className="flex items-center justify-center relative my-4">
        <div
          className={`absolute h-[1px] bg-white/30 group-hover/mm:bg-[#8A1526]/70 group-active/mm:bg-[#8A1526]/70 transition-colors duration-300 ease-out ${
            isFirst && isLast
              ? 'left-0 right-0'
              : isFirst
              ? 'left-0 -right-2.5'
              : isLast
              ? '-left-2.5 right-0'
              : '-left-2.5 -right-2.5'
          }`}
        />
        <span className="w-2.5 h-2.5 rounded-full bg-white group-hover/mm:bg-[#dc2626] group-active/mm:bg-[#dc2626] transition-colors duration-300 ease-out relative z-10 shadow-[0_0_8px_rgba(255,255,255,0.65)]" />
      </div>

      {/* Date heading in Bebas Neue */}
      <EditableText
        as="h4"
        value={post.dateBadge}
        onChange={(val) => updatePost(campaignId, post.id, { dateBadge: val })}
        className="font-displayEn font-normal text-[30px] leading-none text-white group-hover/mm:text-[#fca5a5] transition-colors duration-300 ease-out tracking-wide text-left"
      />

      {/* Arabic quoted caption underneath */}
      <div
        onClick={() => !isEditMode && onOpenLightbox(post)}
        className={!isEditMode ? 'cursor-pointer' : undefined}
        title={!isEditMode ? 'اضغط لعرض الكابشن كاملًا' : undefined}
      >
        <EditableText
          as="p"
          multiline
          dir="rtl"
          value={post.hookAr}
          onChange={(val) => updatePost(campaignId, post.id, { hookAr: val })}
          className={`font-body-plex font-normal text-[13px] xl:text-[13.5px] text-[#E9DEDE]/90 group-hover/mm:text-white transition-colors duration-300 ease-out leading-[1.58] text-right mt-2 ${
            !isEditMode ? 'line-clamp-3' : ''
          }`}
        />
      </div>
    </div>
  );
};

// Stacked physical deck carousel card for Medianesta (matches image_89271cf9.png)
const MedianestaDeckCard: React.FC<{
  post: SocialPost;
  campaignId: string;
  onOpenLightbox: (post: SocialPost) => void;
}> = ({ post, campaignId, onOpenLightbox }) => {
  const { isEditMode, updatePost, deletePost } = usePortfolio();
  const images = post.carouselImages || (post.imageUrl ? [post.imageUrl] : []);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSlides = images.length || post.slidesCount || 1;

  const goNext = () => setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  const goPrev = () => setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const swipe = useHorizontalSwipe(goPrev, goNext);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      if (post.carouselImages && post.carouselImages.length > 0) {
        const updated = [...post.carouselImages];
        updated[currentSlideIndex] = compressed;
        updatePost(campaignId, post.id, { carouselImages: updated });
      } else {
        updatePost(campaignId, post.id, { imageUrl: compressed });
      }
    } catch {
      // ignore invalid image
    }
    e.target.value = '';
  };

  // Up to 2 peeking slides layered behind the active square slide (lightweight opacity dimming, zero CSS filter overhead)
  const peekOffsets = [
    { offsetIdx: 1, leftPct: '7.5%', insetPct: '1.6%', z: 'z-20', opacityClass: 'opacity-[0.6]' },
    { offsetIdx: 2, leftPct: '14.5%', insetPct: '3.2%', z: 'z-10', opacityClass: 'opacity-[0.38]' },
  ];

  return (
    <div className="flex flex-col group/deck">
      {/* Stacked Deck Visual Container */}
      <div
        onClick={() => {
          if (isEditMode || swipe.shouldSuppressClick()) return;
          onOpenLightbox(post);
        }}
        onTouchStart={totalSlides > 1 ? swipe.onTouchStart : undefined}
        onTouchEnd={totalSlides > 1 ? swipe.onTouchEnd : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isEditMode) onOpenLightbox(post);
        }}
        aria-label={`View carousel ${post.titleEn}`}
        className="swipe-deck touch-card relative w-full group cursor-pointer select-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/deck:-translate-y-1.5 group-active/deck:-translate-y-1.5"
      >
        {/* Front cover takes ~82% width, leaving ~18% on the right for layered peeking slides */}
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

            {/* Edit Mode controls */}
            {isEditMode && (
              <div
                className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-full bg-black/85 hover:bg-[#8A1526] text-white text-[11px] border border-white/25 flex items-center gap-1 shadow-lg cursor-pointer"
                  title="تغيير أو رفع صورة | Upload/Replace Image"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  <span>تغيير الصورة</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => deletePost(campaignId, post.id)}
                  className="p-1.5 rounded-full bg-black/85 hover:bg-red-700 text-red-200 hover:text-white border border-white/25 shadow-lg cursor-pointer"
                  title="حذف المنشور | Delete post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text below stacked deck matching image_89271cf9.png (Short EN | AR title, X slides count, Arabic caption) */}
      <div className="mt-4">
        {isEditMode ? (
          <EditableText
            as="h4"
            value={post.dateBadge}
            onChange={(val) => updatePost(campaignId, post.id, { dateBadge: val })}
            className="font-body-plex font-bold text-[18px] text-white leading-snug"
          />
        ) : (
          (() => {
            const parts = (post.dateBadge || `${post.titleEn} | ${post.titleAr}`).split('|').map((s) => s.trim());
            const enPart = parts[0] || post.titleEn;
            const arPart = parts[1] || post.titleAr;
            return (
              <div className="flex flex-wrap items-baseline gap-x-2">
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
        )}

        <span className="block font-body-plex text-[13px] text-white/45 mt-1">
          {totalSlides} {totalSlides === 1 ? 'slide' : 'slides'}
        </span>

        <div
          onClick={() => !isEditMode && onOpenLightbox(post)}
          className={!isEditMode ? 'cursor-pointer' : undefined}
          title={!isEditMode ? 'اضغط لعرض الكابشن كاملًا' : undefined}
        >
          <EditableText
            as="p"
            multiline
            dir="rtl"
            value={post.hookAr}
            onChange={(val) => updatePost(campaignId, post.id, { hookAr: val })}
            className={`font-body-plex font-normal text-[13.5px] sm:text-[14px] text-[#E9DEDE]/85 group-hover/deck:text-white transition-colors duration-300 ease-out leading-[1.6] text-right mt-2.5 ${
              !isEditMode ? 'line-clamp-3' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};

// Clean 4:5 Portrait / Stacked-Deck card for World Hunter, Zel Eldar, Film Rent, and Creative Mark
const BrandShowcaseCard: React.FC<{
  post: SocialPost;
  campaignId: string;
  isWorldHunter: boolean;
  onOpenLightbox: (post: SocialPost) => void;
}> = ({ post, campaignId, isWorldHunter, onOpenLightbox }) => {
  const { isEditMode, updatePost, deletePost } = usePortfolio();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const carouselSlides = post.carouselImages && post.carouselImages.length > 0 ? post.carouselImages : [];
  const totalSlides = carouselSlides.length || post.slidesCount || 1;
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      if (carouselSlides.length > 0) {
        const updated = [...carouselSlides];
        updated[currentSlideIndex] = compressed;
        updatePost(campaignId, post.id, {
          carouselImages: updated,
          ...(currentSlideIndex === 0 ? { imageUrl: compressed } : {}),
        });
      } else {
        updatePost(campaignId, post.id, { imageUrl: compressed });
      }
    } catch {
      // ignore invalid image
    }
    e.target.value = '';
  };

  // Detect Hindi / Devanagari caption (e.g. Creative Mark cm-2) for LTR alignment
  const isHindiScript = /[\u0900-\u097F]/.test(post.hookAr || '');

  const peekOffsets = [
    { offsetIdx: 1, leftPct: '7.5%', insetPct: '1.6%', z: 'z-20', opacityClass: 'opacity-[0.62]' },
    { offsetIdx: 2, leftPct: '14.5%', insetPct: '3.2%', z: 'z-10', opacityClass: 'opacity-[0.4]' },
  ];

  return (
    <div className="flex flex-col group/showcase">
      {/* Visual Artwork Container — uniform 82% width & 4:5 portrait height matching reference decks & single posts */}
      <div
        onClick={() => {
          if (isEditMode || swipe.shouldSuppressClick()) return;
          onOpenLightbox(post);
        }}
        onTouchStart={hasRealDeck ? swipe.onTouchStart : undefined}
        onTouchEnd={hasRealDeck ? swipe.onTouchEnd : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isEditMode) onOpenLightbox(post);
        }}
        aria-label={`View post ${post.dateBadge}`}
        className="swipe-deck touch-card relative w-full group cursor-pointer select-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/showcase:-translate-y-1.5 group-active/showcase:-translate-y-1.5"
      >
        <div className="relative w-full">
          {/* Layered peeking slides: prefer real high-res carouselImages when available, else peekImages slivers */}
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

          {/* Front Card: 1:1 full-width when square single post, or 82% 4:5 portrait when carousel/portrait */}
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

            {isEditMode && (
              <div
                className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-full bg-black/85 hover:bg-[#8A1526] text-white text-[11px] border border-white/25 flex items-center gap-1 shadow-lg cursor-pointer"
                  title="تغيير أو رفع صورة | Upload/Replace Image"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  <span>تغيير الصورة</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => deletePost(campaignId, post.id)}
                  className="p-1.5 rounded-full bg-black/85 hover:bg-red-700 text-red-200 hover:text-white border border-white/25 shadow-lg cursor-pointer"
                  title="حذف المنشور | Delete post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text below artwork */}
      <div className="mt-4">
        {isEditMode ? (
          <EditableText
            as="h4"
            value={post.dateBadge}
            onChange={(val) => updatePost(campaignId, post.id, { dateBadge: val })}
            className="font-body-plex font-bold text-[18px] text-white leading-snug"
          />
        ) : post.dateBadge.includes('|') ? (
          (() => {
            const parts = post.dateBadge.split('|').map((s) => s.trim());
            const enPart = parts[0];
            const arPart = parts[1];
            return (
              <div className="flex flex-wrap items-baseline gap-x-2">
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
          <h4 className="font-displayEn font-normal text-[26px] sm:text-[28px] leading-none text-white tracking-wide uppercase">
            {post.dateBadge}
          </h4>
        )}

        {/* Meta line (e.g. "31 Mar, 3 slides", "1 Apr, single post", "Carousel") — omitted on World Hunter per reference */}
        {!isWorldHunter && post.metaInfoEn && (
          <EditableText
            as="span"
            value={post.metaInfoEn}
            onChange={(val) => updatePost(campaignId, post.id, { metaInfoEn: val })}
            className="block font-body-plex text-[13px] text-white/45 mt-1"
          />
        )}

        {/* Post Caption Quote */}
        <div
          onClick={() => !isEditMode && onOpenLightbox(post)}
          className={!isEditMode ? 'cursor-pointer' : undefined}
          title={!isEditMode ? 'اضغط لعرض الكابشن كاملًا' : undefined}
        >
          <EditableText
            as="p"
            multiline
            dir={isHindiScript ? 'ltr' : 'rtl'}
            value={post.hookAr}
            onChange={(val) => updatePost(campaignId, post.id, { hookAr: val })}
            className={`font-body-plex font-normal text-[13.5px] sm:text-[14px] text-[#E9DEDE]/85 group-hover/showcase:text-white transition-colors duration-300 ease-out leading-[1.6] mt-2.5 ${
              isHindiScript ? 'text-left' : 'text-right'
            } ${!isEditMode ? 'line-clamp-3' : ''}`}
          />
        </div>

        {/* World Hunter Engagement Line (e.g. "462 reactions, 41 comments" on 4 APR) */}
        {isWorldHunter && post.engagement && (
          <EditableText
            as="span"
            value={post.engagement}
            onChange={(val) => updatePost(campaignId, post.id, { engagement: val })}
            className="block font-body-plex text-[13px] text-white/45 mt-1.5"
          />
        )}
      </div>
    </div>
  );
};

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ onOpenLightbox, onOpenInquiry }) => {
  const { data, isEditMode, updateCampaign, addPost, deleteCampaign } = usePortfolio();
  const campaignsList = Object.values(data.socialCampaigns);

  const handleAddPost = (campId: string) => {
    const postNum = (data.socialCampaigns[campId]?.posts.length || 0) + 1;
    addPost(campId, {
      id: `${campId}-${Date.now()}`,
      brandId: campId,
      dateBadge: `POST 0${postNum}`,
      titleEn: 'New Post Title',
      titleAr: 'عنوان المنشور الجديد',
      hookEn: 'Post caption hook in English.',
      hookAr: 'اضغط هنا لكتابة نص البوست بالعربية.',
      gradientBg: 'from-[#68101C] via-[#380610] to-[#090708]',
      emojiIcon: '✨',
      metaInfoEn: 'Social Media Post',
      metaInfoAr: 'منشور سوشيال ميديا',
    });
  };

  // Strip tatweel elongation on untouched default brand titles to match reference cleanly
  const formatBrandTitleAr = (campId: string, raw: string) => {
    if (isEditMode) return raw;
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
      {/* ======================================================== */}
      {/* Page 6 Divider: 01 SOCIAL MEDIA CONTENT (Centered)       */}
      {/* ======================================================== */}
      <section
        id="social-media-content"
        className="scroll-mt-20 py-14 px-10 relative overflow-x-clip flex flex-col justify-center items-center"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center select-none cursor-default interactive-lockup">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-16 h-[1px] bg-white/25 divider-line origin-right" />
            <span className="text-[48px] font-displayEn font-normal text-white tracking-[0.06em] leading-none block">
              01
            </span>
            <span className="w-16 h-[1px] bg-white/25 divider-line origin-left" />
          </div>

          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear whitespace-nowrap"
            style={{ fontSize: 'clamp(52px, calc(11 * var(--vw, 1vw)), 162px)' }}
          >
            SOCIAL MEDIA CONTENT
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white leading-none text-center"
            style={{
              fontSize: 'clamp(36px, calc(6.2 * var(--vw, 1vw)), 92px)',
              marginTop: '-0.36em',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            محتوى السوشيال ميديا
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* Pages 7 to 12+: Social Media Brands                      */}
      {/* ======================================================== */}
      {campaignsList.map((camp: SocialCampaign) => {
        const isMiMiOrMed = camp.id === 'mimimo' || camp.id === 'medianesta';
        const isShowcaseBrand = !isMiMiOrMed;

        if (isMiMiOrMed || isShowcaseBrand) {
          const isMiMiMo = camp.id === 'mimimo';
          const isMedianesta = camp.id === 'medianesta';
          const isMultiWordTitle = camp.id === 'worldhunter' || camp.id === 'creativemark';
          const isElHoofy = camp.id === 'elhoofy';

          return (
            <section
              key={camp.id}
              className="py-14 px-10 relative overflow-x-clip"
            >
              <div className="max-w-7xl mx-auto relative z-10">
                {/* Top Header Row: Left stacked brand title + Right 2 top-lined info columns */}
                <div className={`grid grid-cols-12 gap-10 items-start ${isMiMiMo ? 'mb-10' : isMedianesta ? 'mb-8' : 'mb-10'}`}>
                  {/* Brand Title Lockup */}
                  <div className="col-span-4 w-fit relative select-none text-left cursor-default interactive-lockup">
                    <EditableText
                      as="h3"
                      value={camp.brandNameEn}
                      onChange={(val) => updateCampaign(camp.id, { brandNameEn: val })}
                      style={{
                        fontSize: isElHoofy
                          ? 'clamp(48px, calc(6 * var(--vw, 1vw)), 84px)'
                          : isMultiWordTitle
                          ? 'clamp(44px, calc(5.2 * var(--vw, 1vw)), 74px)'
                          : 'clamp(52px, calc(6.8 * var(--vw, 1vw)), 94px)',
                      }}
                      className={`font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear ${
                        isElHoofy || isMultiWordTitle ? 'whitespace-nowrap' : ''
                      }`}
                    />
                    <EditableText
                      as="p"
                      dir="rtl"
                      value={formatBrandTitleAr(camp.id, camp.brandNameAr)}
                      onChange={(val) => updateCampaign(camp.id, { brandNameAr: val })}
                      style={{
                        fontSize: isElHoofy
                          ? 'clamp(30px, calc(3.1 * var(--vw, 1vw)), 44px)'
                          : isMultiWordTitle
                          ? 'clamp(34px, calc(3.6 * var(--vw, 1vw)), 50px)'
                          : 'clamp(38px, calc(4.2 * var(--vw, 1vw)), 58px)',
                        textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                      }}
                      className={`font-amiri font-bold text-white leading-none text-center ${
                        isElHoofy
                          ? '-mt-[0.42em]'
                          : isMultiWordTitle
                          ? '-mt-[0.46em]'
                          : isMiMiMo
                          ? '-mt-[0.52em]'
                          : '-mt-[0.42em]'
                      }`}
                    />
                  </div>

                  {/* Right 2 Top-Lined Columns: The campaign/client/platform + My role */}
                  <div className="col-span-8 grid grid-cols-2 gap-10">
                    {/* Column 1 */}
                    <div className="border-t border-white/20 pt-3.5 px-2.5 -mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                      <div className="flex items-baseline gap-1.5 text-[15px]">
                        <EditableText
                          as="span"
                          value={camp.campaignLabelEn}
                          onChange={(val) => updateCampaign(camp.id, { campaignLabelEn: val })}
                          className="font-body-plex font-bold text-white"
                        />
                        <span className="text-white/35">|</span>
                        <EditableText
                          as="span"
                          dir="rtl"
                          value={camp.campaignLabelAr}
                          onChange={(val) => updateCampaign(camp.id, { campaignLabelAr: val })}
                          className="font-body-plex font-normal text-[#9C9393]"
                        />
                      </div>
                      <EditableText
                        as="p"
                        multiline
                        value={camp.campaignEn}
                        onChange={(val) => updateCampaign(camp.id, { campaignEn: val })}
                        className="font-body-plex text-[14.5px] sm:text-[15.5px] text-white/90 leading-[1.45] text-left"
                      />
                      <EditableText
                        as="p"
                        multiline
                        dir="rtl"
                        value={camp.campaignAr}
                        onChange={(val) => updateCampaign(camp.id, { campaignAr: val })}
                        className="font-body-plex text-[14.5px] sm:text-[15.5px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                      />
                    </div>

                    {/* Column 2 */}
                    <div className="border-t border-white/20 pt-3.5 px-2.5 -mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                      <div className="flex items-baseline gap-1.5 text-[15px]">
                        <EditableText
                          as="span"
                          value={camp.roleLabelEn}
                          onChange={(val) => updateCampaign(camp.id, { roleLabelEn: val })}
                          className="font-body-plex font-bold text-white"
                        />
                        <span className="text-white/35">|</span>
                        <EditableText
                          as="span"
                          dir="rtl"
                          value={camp.roleLabelAr}
                          onChange={(val) => updateCampaign(camp.id, { roleLabelAr: val })}
                          className="font-body-plex font-normal text-[#9C9393]"
                        />
                      </div>
                      <EditableText
                        as="p"
                        multiline
                        value={camp.roleEn}
                        onChange={(val) => updateCampaign(camp.id, { roleEn: val })}
                        className="font-body-plex text-[14.5px] sm:text-[15.5px] text-white/90 leading-[1.45] text-left"
                      />
                      <EditableText
                        as="p"
                        multiline
                        dir="rtl"
                        value={camp.roleAr}
                        onChange={(val) => updateCampaign(camp.id, { roleAr: val })}
                        className="font-body-plex text-[14.5px] sm:text-[15.5px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Medianesta Carousel Explainer Subtitle Row above Decks */}
                {isMedianesta && (camp.subInfoEn || isEditMode) && (
                  <div className="mb-7">
                    <EditableText
                      as="p"
                      value={camp.subInfoEn ? `${camp.subInfoEn} | ${camp.subInfoAr || ''}` : ''}
                      onChange={(val) => {
                        const [en, ar] = val.split('|').map((s) => s.trim());
                        updateCampaign(camp.id, { subInfoEn: en, subInfoAr: ar || '' });
                      }}
                      placeholder="Add subtitle..."
                      className="font-body-plex text-[14.5px] sm:text-[15.5px] text-[#BDB5B5] text-left"
                    />
                  </div>
                )}

                {/* Posts Showcase Grid */}
                {isMiMiMo ? (
                  <div className="grid grid-cols-5 gap-5">
                    {camp.posts.map((post, idx) => (
                      <MiMiMoPostCard
                        key={post.id}
                        post={post}
                        campaignId={camp.id}
                        isFirst={idx === 0}
                        isLast={idx === camp.posts.length - 1}
                        onOpenLightbox={onOpenLightbox}
                      />
                    ))}

                    {isEditMode && (
                      <button
                        onClick={() => handleAddPost(camp.id)}
                        className="rounded-lg border-2 border-dashed border-[#8A1526]/60 hover:border-[#8A1526] bg-[#120306]/40 flex flex-col items-center justify-center gap-2 min-h-[220px] text-[#E9DEDE] hover:bg-[#8A1526]/10 transition-colors cursor-pointer p-4 text-center"
                      >
                        <Plus className="w-7 h-7 text-[#8A1526]" />
                        <span className="font-body-plex text-sm">إضافة بوست | Add Post</span>
                      </button>
                    )}
                  </div>
                ) : isMedianesta ? (
                  <div className="grid grid-cols-3 gap-10">
                    {camp.posts.map((post) => (
                      <MedianestaDeckCard
                        key={post.id}
                        post={post}
                        campaignId={camp.id}
                        onOpenLightbox={onOpenLightbox}
                      />
                    ))}

                    {isEditMode && (
                      <button
                        onClick={() => handleAddPost(camp.id)}
                        className="rounded-lg border-2 border-dashed border-[#8A1526]/60 hover:border-[#8A1526] bg-[#120306]/40 flex flex-col items-center justify-center gap-2 min-h-[260px] text-[#E9DEDE] hover:bg-[#8A1526]/10 transition-colors cursor-pointer p-4 text-center"
                      >
                        <Plus className="w-7 h-7 text-[#8A1526]" />
                        <span className="font-body-plex text-sm">إضافة بوست | Add Post</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-10">
                    {camp.posts.map((post) => (
                      <BrandShowcaseCard
                        key={post.id}
                        post={post}
                        campaignId={camp.id}
                        isWorldHunter={camp.id === 'worldhunter'}
                        onOpenLightbox={onOpenLightbox}
                      />
                    ))}

                    {isEditMode && (
                      <button
                        onClick={() => handleAddPost(camp.id)}
                        className="rounded-lg border-2 border-dashed border-[#8A1526]/60 hover:border-[#8A1526] bg-[#120306]/40 flex flex-col items-center justify-center gap-2 min-h-[260px] text-[#E9DEDE] hover:bg-[#8A1526]/10 transition-colors duration-300 ease-out cursor-pointer p-4 text-center"
                      >
                        <Plus className="w-7 h-7 text-[#8A1526]" />
                        <span className="font-body-plex text-sm">إضافة بوست | Add Post</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Bottom-Right Clean Pill Outline CTA Button matching Reference */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-10">
                  {isEditMode ? (
                    <button
                      onClick={() => deleteCampaign(camp.id)}
                      className="px-4 py-2 rounded-full bg-red-950/60 hover:bg-red-800 text-red-200 text-xs border border-red-500/40 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف هذا القسم | Delete Brand</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {camp.brandUrl ? (
                    <a
                      href={isEditMode ? undefined : camp.brandUrl}
                      onClick={(e) => isEditMode && e.preventDefault()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive-btn px-7 py-2.5 rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex items-center gap-2 font-body-plex text-[15px]"
                    >
                      <EditableText
                        as="span"
                        value={camp.pageButtonTextEn}
                        onChange={(val) => updateCampaign(camp.id, { pageButtonTextEn: val })}
                        className="text-[15px] text-white"
                      />
                      <span className="text-white/45">|</span>
                      <EditableText
                        as="span"
                        value={camp.pageButtonTextAr}
                        onChange={(val) => updateCampaign(camp.id, { pageButtonTextAr: val })}
                        className="text-[15px] text-[#E9DEDE]"
                      />
                    </a>
                  ) : (
                    <button
                      onClick={() => !isEditMode && onOpenInquiry?.(camp.brandNameEn)}
                      className="interactive-btn px-7 py-2.5 rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex items-center gap-2 font-body-plex text-[15px]"
                    >
                      <EditableText
                        as="span"
                        value={camp.pageButtonTextEn}
                        onChange={(val) => updateCampaign(camp.id, { pageButtonTextEn: val })}
                        className="text-[15px] text-white"
                      />
                      <span className="text-white/45">|</span>
                      <EditableText
                        as="span"
                        value={camp.pageButtonTextAr}
                        onChange={(val) => updateCampaign(camp.id, { pageButtonTextAr: val })}
                        className="text-[15px] text-[#E9DEDE]"
                      />
                    </button>
                  )}
                </div>
              </div>
            </section>
          );
        }

        return (
        <section
          key={camp.id}
          className="py-14 px-10 relative"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Top Brand Header matching PDF (Aligned Left) */}
            <div className="flex flex-row justify-between items-start gap-6 pb-6 text-left">
              
              {/* Brand Title: English on top, Arabic in Amiri underneath */}
              <div className="min-w-[220px]">
                <EditableText
                  as="h3"
                  value={camp.brandNameEn}
                  onChange={(val) => updateCampaign(camp.id, { brandNameEn: val })}
                  className="text-7xl leading-[0.9] font-displayEn font-normal uppercase tracking-wider text-heading-linear"
                />
                <EditableText
                  as="p"
                  dir="rtl"
                  value={camp.brandNameAr}
                  onChange={(val) => updateCampaign(camp.id, { brandNameAr: val })}
                  style={{ textShadow: '0 4px 10px rgba(0, 0, 0, 0.8)' }}
                  className="text-4xl font-amiri font-bold text-white mt-[-0.8rem] text-left"
                />
                {(camp.subInfoEn || isEditMode) && (
                  <EditableText
                    as="p"
                    value={camp.subInfoEn ? `${camp.subInfoEn} | ${camp.subInfoAr || ''}` : ''}
                    onChange={(val) => {
                      const [en, ar] = val.split('|').map((s) => s.trim());
                      updateCampaign(camp.id, { subInfoEn: en, subInfoAr: ar || '' });
                    }}
                    placeholder="Add subtitle..."
                    className="text-body-21 mt-2"
                  />
                )}
              </div>

              {/* Middle & Right Info Columns: English on top, Arabic underneath */}
              <div className="grid grid-cols-2 gap-8 max-w-2xl">
                
                {/* Column 1: Campaign / Brand / Platform */}
                <div className="border-l-2 border-[#8A1526] pl-4 space-y-2">
                  <span className="text-body-21 block opacity-90">
                    {camp.campaignLabelEn} <span className="text-[#8A1526]">|</span> {camp.campaignLabelAr}
                  </span>
                  <EditableText
                    as="p"
                    multiline
                    value={camp.campaignEn}
                    onChange={(val) => updateCampaign(camp.id, { campaignEn: val })}
                    className="text-body-21 leading-snug"
                  />
                  <EditableText
                    as="p"
                    multiline
                    dir="rtl"
                    value={camp.campaignAr}
                    onChange={(val) => updateCampaign(camp.id, { campaignAr: val })}
                    className="text-body-21 leading-relaxed"
                  />
                </div>

                {/* Column 2: Role */}
                <div className="border-l-2 border-[#8A1526] pl-4 space-y-2">
                  <span className="text-body-21 block opacity-90">
                    {camp.roleLabelEn} <span className="text-[#8A1526]">|</span> {camp.roleLabelAr}
                  </span>
                  <EditableText
                    as="p"
                    multiline
                    value={camp.roleEn}
                    onChange={(val) => updateCampaign(camp.id, { roleEn: val })}
                    className="text-body-21 leading-snug"
                  />
                  <EditableText
                    as="p"
                    multiline
                    dir="rtl"
                    value={camp.roleAr}
                    onChange={(val) => updateCampaign(camp.id, { roleAr: val })}
                    className="text-body-21 leading-relaxed"
                  />
                </div>

              </div>
            </div>

            {/* Posts Grid matching PDF with real images / carousels */}
            <div className={`grid ${camp.posts.length >= 5 ? 'grid-cols-5' : 'grid-cols-3'} gap-6`}>
              {camp.posts.map((post) => (
                <CarouselCard
                  key={post.id}
                  post={post}
                  campaignId={camp.id}
                  brandNameEn={camp.brandNameEn}
                  onOpenLightbox={onOpenLightbox}
                />
              ))}

              {isEditMode && (
                <button
                  onClick={() => handleAddPost(camp.id)}
                  className="rounded-2xl border-2 border-dashed border-[#8A1526]/60 hover:border-[#8A1526] bg-[#120306]/40 flex flex-col items-center justify-center gap-2 min-h-[280px] text-[#E9DEDE] hover:bg-[#8A1526]/10 transition-colors duration-300 ease-out cursor-pointer p-4 text-center"
                >
                  <Plus className="w-8 h-8 text-[#8A1526]" />
                  <span className="text-body-21">إضافة بوست | Add Post</span>
                </button>
              )}
            </div>

            {/* Bottom Button: View the brand page / Direct Social Link */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              {isEditMode ? (
                <button
                  onClick={() => deleteCampaign(camp.id)}
                  className="px-4 py-2 rounded-full bg-red-950/60 hover:bg-red-800 text-red-200 text-xs border border-red-500/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف هذا القسم | Delete Brand</span>
                </button>
              ) : (
                <div />
              )}

              {camp.brandUrl ? (
                <a
                  href={isEditMode ? undefined : camp.brandUrl}
                  onClick={(e) => isEditMode && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-[#140306] hover:bg-[#68101C] text-body-21 border border-[#8A1526]/60 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out shadow-md hover:shadow-[0_0_20px_rgba(138,21,38,0.5)] cursor-pointer inline-flex items-center gap-2 group"
                >
                  <EditableText
                    as="span"
                    value={camp.pageButtonTextEn}
                    onChange={(val) => updateCampaign(camp.id, { pageButtonTextEn: val })}
                    className="text-body-21"
                  />
                  <span className="text-[#8A1526]">|</span>
                  <EditableText
                    as="span"
                    value={camp.pageButtonTextAr}
                    onChange={(val) => updateCampaign(camp.id, { pageButtonTextAr: val })}
                    className="text-body-21"
                  />
                  <ExternalLink className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out shrink-0" />
                </a>
              ) : (
                <button
                  onClick={() => !isEditMode && onOpenInquiry?.(camp.brandNameEn)}
                  className="px-6 py-2.5 rounded-full bg-[#140306] hover:bg-[#68101C] text-body-21 border border-[#8A1526]/60 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out shadow-md hover:shadow-[0_0_20px_rgba(138,21,38,0.5)] cursor-pointer flex items-center gap-2"
                >
                  <EditableText
                    as="span"
                    value={camp.pageButtonTextEn}
                    onChange={(val) => updateCampaign(camp.id, { pageButtonTextEn: val })}
                    className="text-body-21"
                  />
                  <span className="text-[#8A1526]">|</span>
                  <EditableText
                    as="span"
                    value={camp.pageButtonTextAr}
                    onChange={(val) => updateCampaign(camp.id, { pageButtonTextAr: val })}
                    className="text-body-21"
                  />
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
