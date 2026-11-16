import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ServiceItem } from '../utils/portfolioData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { data } = usePortfolio();
  const topServices = data.services.filter((s) => s.position === 'top');
  const bottomServices = data.services.filter((s) => s.position === 'bottom');

  const staggeredNodes: Array<{ item: ServiceItem; position: 'top' | 'bottom' }> = [];
  const maxPairs = Math.max(topServices.length, bottomServices.length);
  for (let i = 0; i < maxPairs; i++) {
    if (topServices[i]) staggeredNodes.push({ item: topServices[i], position: 'top' });
    if (bottomServices[i]) staggeredNodes.push({ item: bottomServices[i], position: 'bottom' });
  }

  return (
    <section id="services" className="scroll-mt-20 py-10 sm:py-14 relative overflow-x-clip">
      {/* Header: huge SERVICES + crisp white Amiri الخدمات */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 mb-10 sm:mb-14">
        <div className="relative inline-block w-fit max-w-full select-none text-left cursor-default interactive-lockup">
          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear"
            style={{ fontSize: 'clamp(56px, calc(14 * var(--vw, 1vw)), 204px)' }}
          >
            SERVICES
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white absolute left-1/2 -translate-x-1/2 -bottom-1 sm:-bottom-2 whitespace-nowrap leading-none"
            style={{
              fontSize: 'clamp(42px, calc(9.2 * var(--vw, 1vw)), 138px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.88)',
            }}
          >
            الخدمات
          </p>
        </div>
      </div>

      {/* Desktop 8-Node Interleaved Horizontal Zigzag Timeline */}
      <div className="hidden lg:block relative py-4">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/30 pointer-events-none"
        />

        <div className="max-w-[1380px] mx-auto px-10">
          <div className="grid grid-cols-8 items-stretch">
            {staggeredNodes.map(({ item: srv, position }) => {
              const isTop = position === 'top';
              return (
                <div
                  key={srv.id}
                  onClick={() =>
                    onSelectService(`${srv.titleEn.replace('\n', ' ')} | ${srv.titleAr.replace('\n', ' ')}`)
                  }
                  className="relative flex flex-col items-center group cursor-pointer"
                >
                  {/* Upper Half */}
                  <div className="h-[195px] w-full flex flex-col items-center justify-end pb-[5px]">
                    {isTop && (
                      <>
                        <div className="w-[240px] text-center mb-3 relative z-10 px-2 py-1.5 rounded-lg touch-card group-hover:bg-white/[0.03] group-active:bg-[#8A1526]/15 group-hover:-translate-y-1 group-active:-translate-y-1 group-active:scale-95 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                          <h3 className="font-body-plex font-bold text-[15.5px] leading-[1.3] text-white group-hover:text-[#fca5a5] group-active:text-[#fca5a5] transition-colors duration-300 ease-out whitespace-pre-line tracking-normal">
                            {srv.titleEn}
                          </h3>
                          <p
                            dir="rtl"
                            className="font-body-plex font-normal text-[14.5px] leading-[1.4] text-[#E9DEDE] group-hover:text-white group-active:text-white transition-colors duration-300 ease-out whitespace-pre-line mt-1"
                          >
                            {srv.titleAr}
                          </p>
                        </div>

                        <svg
                          width="12"
                          height="54"
                          viewBox="0 0 12 54"
                          fill="none"
                          aria-hidden="true"
                          className="text-white/45 group-hover:text-[#ef4444] group-active:text-[#ef4444] transition-colors duration-300 ease-out shrink-0"
                        >
                          <line x1="6" y1="54" x2="6" y2="2" stroke="currentColor" strokeWidth="1.2" />
                          <polyline
                            points="2,6 6,1.5 10,6"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </div>

                  {/* Center Axis Dot */}
                  <div
                    aria-hidden="true"
                    className="w-[10px] h-[10px] rounded-full bg-[#D9D9D9] group-hover:bg-[#dc2626] group-active:bg-[#dc2626] group-hover:scale-125 group-active:scale-150 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative z-10 shadow-[0_0_8px_rgba(255,255,255,0.28)]"
                  />

                  {/* Lower Half */}
                  <div className="h-[195px] w-full flex flex-col items-center justify-start pt-[5px]">
                    {!isTop && (
                      <>
                        <svg
                          width="12"
                          height="54"
                          viewBox="0 0 12 54"
                          fill="none"
                          aria-hidden="true"
                          className="text-white/45 group-hover:text-[#ef4444] group-active:text-[#ef4444] transition-colors duration-300 ease-out shrink-0"
                        >
                          <line x1="6" y1="0" x2="6" y2="52" stroke="currentColor" strokeWidth="1.2" />
                          <polyline
                            points="2,48 6,52.5 10,48"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <div className="w-[240px] text-center mt-3 relative z-10 px-2 py-1.5 rounded-lg touch-card group-hover:bg-white/[0.03] group-active:bg-[#8A1526]/15 group-hover:-translate-y-1 group-active:-translate-y-1 group-active:scale-95 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                          <h3 className="font-body-plex font-bold text-[15.5px] leading-[1.3] text-white group-hover:text-[#fca5a5] group-active:text-[#fca5a5] transition-colors duration-300 ease-out whitespace-pre-line tracking-normal">
                            {srv.titleEn}
                          </h3>
                          <p
                            dir="rtl"
                            className="font-body-plex font-normal text-[14.5px] leading-[1.4] text-[#E9DEDE] group-hover:text-white group-active:text-white transition-colors duration-300 ease-out whitespace-pre-line mt-1"
                          >
                            {srv.titleAr}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Vertical Interactive Axis Timeline (100% of 8 Services Preserved) */}
      <div className="block lg:hidden max-w-2xl mx-auto px-4 sm:px-8">
        <div className="relative pl-8 sm:pl-10">
          {/* Vertical Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] sm:left-[13px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-white/35 via-[#8A1526]/65 to-white/25 pointer-events-none"
          />

          <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
            {staggeredNodes.map(({ item: srv }) => {
              const cleanEn = srv.titleEn.replace(/\n/g, ' ');
              const cleanAr = srv.titleAr.replace(/\n/g, ' ');
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => onSelectService(`${cleanEn} | ${cleanAr}`)}
                  className="touch-card relative w-full text-left group flex items-center justify-between gap-3 sm:gap-4 p-4 rounded-xl border border-white/15 bg-[#120306]/75 hover:border-[#b81d33]/75 active:border-[#dc2626] active:bg-[#68101C]/25 min-h-[72px] transition-[transform,border-color,background-color] duration-300 ease-out cursor-pointer"
                >
                  {/* Vertical Axis Node Dot & Horizontal Stem */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[26px] sm:-left-[32px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#D9D9D9] group-hover:bg-[#dc2626] group-active:bg-[#dc2626] shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-colors duration-200"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -left-[16px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[1px] bg-white/30 group-hover:bg-[#ef4444]/80 transition-colors duration-200"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-body-plex font-bold text-[15px] sm:text-[16px] leading-snug text-white group-hover:text-[#fca5a5] transition-colors duration-200">
                      {cleanEn}
                    </h3>
                    <p
                      dir="rtl"
                      className="font-body-plex font-normal text-[14px] sm:text-[14.5px] leading-snug text-[#E9DEDE]/90 text-right"
                    >
                      {cleanAr}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
