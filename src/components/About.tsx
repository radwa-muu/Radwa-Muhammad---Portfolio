import React from 'react';
import referenceSilhouette from '../assets/images/radwa_about_silhouette.jpg';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();

  const aboutBodyClass =
    'font-body-plex font-medium text-[16px] lg:text-[17px] leading-[1.7] text-[#F5F2F1]';

  return (
    <section id="about" className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto">
        {/* Centered Header: Huge ABOUT ME + prominent overlapping عني */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="relative inline-block w-fit max-w-full mx-auto select-none pb-10 sm:pb-14 cursor-default interactive-lockup text-center">
            <h2
              className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear"
              style={{ fontSize: 'clamp(56px, calc(14 * var(--vw, 1vw)), 204px)' }}
            >
              ABOUT ME
            </h2>
            <p
              className="text-[64px] sm:text-[88px] lg:text-[106px] font-amiri font-bold text-white absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-5 whitespace-nowrap leading-none"
              style={{ textShadow: '0 10px 26px rgba(0, 0, 0, 0.9)' }}
            >
              عني
            </p>
          </div>
        </div>

        <div
          data-layout-grid
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center"
        >
          {/* Left Column: EN above AR Bio */}
          <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-7 text-left z-10">

          <div className="space-y-3.5 sm:space-y-4 max-w-[620px] pt-1 rounded-xl px-3 sm:-mx-3 py-2 interactive-panel">
            <p className={aboutBodyClass}>{data.about.introEn}</p>
            <p className={aboutBodyClass}>{data.about.descEn}</p>
          </div>

          <div data-about-divider className="max-w-[620px] w-full flex justify-center py-0.5">
            <div className="w-44 sm:w-72 h-[1px] bg-white/15" />
          </div>

          <div
            className="space-y-3.5 sm:space-y-4 max-w-[620px] text-right rounded-xl px-3 sm:-mx-3 py-2 interactive-panel"
            dir="rtl"
          >
            <p dir="rtl" className={aboutBodyClass}>
              {data.about.introAr}
            </p>
            <p dir="rtl" className={aboutBodyClass}>
              {data.about.descAr}
            </p>
          </div>
        </div>

        {/* Right Column: Blended Artistic Silhouette */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
          <div
            data-about-portrait
            className="relative w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[540px] aspect-[5/6] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 active:-translate-y-1"
          >
            <div
              className="relative w-full h-full"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 48% 48% at 50% 50%, #000000 32%, rgba(0, 0, 0, 0.78) 54%, rgba(0, 0, 0, 0.34) 74%, rgba(0, 0, 0, 0.08) 88%, transparent 98%)',
                maskImage:
                  'radial-gradient(ellipse 48% 48% at 50% 50%, #000000 32%, rgba(0, 0, 0, 0.78) 54%, rgba(0, 0, 0, 0.34) 74%, rgba(0, 0, 0, 0.08) 88%, transparent 98%)',
              }}
            >
              <img
                src={referenceSilhouette}
                alt="Radwa Muhammad — Artistic Silhouette | رضوى محمد"
                decoding="async"
                className="w-full h-full object-cover select-none"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
