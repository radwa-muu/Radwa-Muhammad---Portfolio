import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { scrollToSectionId } from '../hooks/useDesktopScale';

interface SelectedWorkIndexProps {
  onRequestSample: (sampleName: string) => void;
  scale?: number;
}

export const SelectedWorkIndex: React.FC<SelectedWorkIndexProps> = ({
  onRequestSample,
}) => {
  const { data } = usePortfolio();
  const leftCol = data.selectedWork.slice(0, 3);
  const rightCol = data.selectedWork.slice(3, 6);

  return (
    <section id="selected-work" className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header: giant SELECTED WORK + crisp white نماذج من أعمالي */}
        <div className="mb-12 sm:mb-16 text-center">
          <div className="text-center relative inline-block w-fit max-w-full mx-auto select-none cursor-default interactive-lockup">
            <h2
              className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear"
              style={{ fontSize: 'clamp(44px, calc(13 * var(--vw, 1vw)), 194px)' }}
            >
              SELECTED WORK
            </h2>
            <p
              dir="rtl"
              className="font-amiri font-bold text-white absolute left-1/2 -translate-x-1/2 -bottom-4 sm:-bottom-6 whitespace-nowrap leading-none"
              style={{
                fontSize: 'clamp(30px, calc(7.4 * var(--vw, 1vw)), 112px)',
                textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
              }}
            >
              نماذج من أعمالي
            </p>
          </div>
        </div>

        {/* 1-col mobile / 2-col tablet+desktop numbered list */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-20 gap-y-0 md:gap-y-2">
          <div>
            {leftCol.map((item) => (
              <a
                key={item.number}
                href={`#${item.targetId}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.targetId === 'contact') {
                    onRequestSample(`${item.titleEn} | ${item.titleAr}`);
                  } else {
                    scrollToSectionId(item.targetId);
                  }
                }}
                className="touch-card pt-4 pb-5 sm:pt-5 sm:pb-7 px-3 sm:-mx-3 rounded-lg border-t border-white/15 flex items-center justify-between min-h-[68px] group hover:border-[#8A1526]/80 active:border-[#dc2626] hover:bg-white/[0.03] active:bg-[#8A1526]/12 hover:-translate-y-0.5 active:-translate-y-0.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="text-[36px] sm:text-[46px] font-displayEn font-normal leading-none text-white/45 group-hover:text-[#dc2626] group-active:text-[#dc2626] transition-colors duration-300 ease-out w-9 sm:w-11 shrink-0">
                    {item.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-body-plex font-bold text-[17px] sm:text-[20px] text-white leading-snug">
                      {item.titleEn}
                    </h3>
                    <p
                      dir="rtl"
                      className="font-body-plex font-normal text-[15px] sm:text-[17px] text-[#E9DEDE]/85 group-hover:text-white transition-colors duration-300 ease-out leading-snug mt-0.5 text-left"
                    >
                      {item.titleAr}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#8A1526] group-hover:text-amber-300 font-body-plex font-medium transition-colors duration-300 ease-out shrink-0 ml-3">
                  View →
                </span>
              </a>
            ))}
          </div>

          <div>
            {rightCol.map((item) => (
              <a
                key={item.number}
                href={`#${item.targetId}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.targetId === 'contact') {
                    onRequestSample(`${item.titleEn} | ${item.titleAr}`);
                  } else {
                    scrollToSectionId(item.targetId);
                  }
                }}
                className="touch-card pt-4 pb-5 sm:pt-5 sm:pb-7 px-3 sm:-mx-3 rounded-lg border-t border-white/15 flex items-center justify-between min-h-[68px] group hover:border-[#8A1526]/80 active:border-[#dc2626] hover:bg-white/[0.03] active:bg-[#8A1526]/12 hover:-translate-y-0.5 active:-translate-y-0.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="text-[36px] sm:text-[46px] font-displayEn font-normal leading-none text-white/45 group-hover:text-[#dc2626] group-active:text-[#dc2626] transition-colors duration-300 ease-out w-9 sm:w-11 shrink-0">
                    {item.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-body-plex font-bold text-[17px] sm:text-[20px] text-white leading-snug">
                      {item.titleEn}
                    </h3>
                    <p
                      dir="rtl"
                      className="font-body-plex font-normal text-[15px] sm:text-[17px] text-[#E9DEDE]/85 group-hover:text-white transition-colors duration-300 ease-out leading-snug mt-0.5 text-left"
                    >
                      {item.titleAr}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#8A1526] group-hover:text-amber-300 font-body-plex font-medium transition-colors duration-300 ease-out shrink-0 ml-3">
                  View →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
