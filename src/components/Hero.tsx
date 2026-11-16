import React from 'react';
import { ChevronDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { scrollToSectionId } from '../hooks/useDesktopScale';

interface HeroProps {
  onOpenInquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { data } = usePortfolio();

  const displayTitleAr =
    data.hero.titleAr === 'ملـف أعمــالي' ? 'ملــــــف أعمالي' : data.hero.titleAr;

  const subtitleParts = data.hero.subtitle.split('|');
  const hasPipe = subtitleParts.length >= 2;
  const primarySubtitle = subtitleParts[0]?.trim() || '';
  const secondarySubtitle = subtitleParts.slice(1).join('|').trim();

  return (
    <section
      id="hero"
      className="min-h-[430px] sm:min-h-[480px] relative flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 sm:pt-32 pb-10 sm:pb-12 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto w-full z-10 flex flex-col items-center justify-center">
        {/* Reference Lockup: Monumental PORTFOLIO + stretched Amiri Regular ملفــــــف أعمالي */}
        <div className="relative select-none flex flex-col items-center cursor-default interactive-lockup max-w-full">
          <h1
            style={{
              fontSize: 'clamp(64px, calc(18.5 * var(--vw, 1vw)), 275px)',
            }}
            className="hero-enter-1 font-displayEn font-normal uppercase text-heading-linear tracking-[0.02em] leading-[0.84]"
          >
            {data.hero.titleEn}
          </h1>
          <h2
            dir="rtl"
            style={{
              fontSize: 'clamp(34px, calc(9.2 * var(--vw, 1vw)), 134px)',
              textShadow: '0 10px 26px rgba(0, 0, 0, 0.85)',
            }}
            className="hero-enter-2 font-amiri font-normal text-white tracking-normal leading-[1.02] -mt-[0.38em] sm:-mt-[0.42em] relative z-10 sm:whitespace-nowrap"
          >
            {displayTitleAr}
          </h2>
        </div>

        {/* Identity Subtitle */}
        <p className="hero-enter-3 font-bodyEn font-normal text-[13px] sm:text-[16px] lg:text-[18px] tracking-[0.06em] uppercase mt-4 text-center leading-normal flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 cursor-default px-2">
          {hasPipe ? (
            <>
              <span className="text-[#F5F2F1]">{primarySubtitle}</span>
              <span className="text-white/50">|</span>
              <span className="text-white/50">{secondarySubtitle}</span>
            </>
          ) : (
            <span className="text-[#F5F2F1]">{data.hero.subtitle}</span>
          )}
        </p>

        {/* Lightweight interactive scroll prompt */}
        <button
          type="button"
          onClick={() => scrollToSectionId('#about')}
          aria-label="Scroll to About Me"
          className="hero-enter-3 interactive-btn mt-8 sm:mt-10 px-5 py-2.5 min-h-[44px] rounded-full inline-flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white cursor-pointer group"
        >
          <span className="text-[10px] font-body-plex tracking-[0.22em] uppercase">
            Explore Portfolio
          </span>
          <ChevronDown className="w-4 h-4 text-[#dc2626] group-hover:translate-y-0.5 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </section>
  );
};
