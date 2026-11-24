import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ServiceItem } from '../utils/portfolioData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = () => {
  const { data } = usePortfolio();
  const [openServiceIds, setOpenServiceIds] = useState<Record<string, boolean>>({});
  const topServices = data.services.filter((s) => s.position === 'top');
  const bottomServices = data.services.filter((s) => s.position === 'bottom');

  const toggleService = (id: string) => {
    setOpenServiceIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const staggeredNodes: Array<{ item: ServiceItem; position: 'top' | 'bottom' }> = [];
  const maxPairs = Math.max(topServices.length, bottomServices.length);
  for (let i = 0; i < maxPairs; i++) {
    if (topServices[i]) staggeredNodes.push({ item: topServices[i], position: 'top' });
    if (bottomServices[i]) staggeredNodes.push({ item: bottomServices[i], position: 'bottom' });
  }

  return (
    <section id="services" className="scroll-mt-20 py-10 sm:py-14 relative overflow-x-clip">
      {/* Header: huge SERVICES + crisp white Amiri الخدمات */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 mb-10 sm:mb-14 text-center">
        <div className="relative inline-block w-fit max-w-full mx-auto select-none text-center cursor-default interactive-lockup">
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

        <div className="max-w-[1380px] mx-auto px-14">
          <div className="grid grid-cols-8 items-stretch">
            {staggeredNodes.map(({ item: srv, position }) => {
              const isTop = position === 'top';
              const isOpen = Boolean(openServiceIds[srv.id]);
              const desktopDescId = `desktop-service-desc-${srv.id}`;

              const renderDesktopCard = (marginClass: string) => (
                <div
                  className={`w-[206px] xl:w-[244px] text-center ${marginClass} relative z-10 rounded-lg border border-transparent touch-card group-hover:bg-white/[0.03] group-data-[open=true]:bg-[#170409]/75 group-data-[open=true]:border-[#8A1526]/55 transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={desktopDescId}
                    onClick={() => toggleService(srv.id)}
                    className="w-full px-1.5 xl:px-2 py-1.5 rounded-lg flex items-center justify-between gap-1 text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="w-2.5 xl:w-3.5 shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-body-plex font-bold text-[15.5px] leading-[1.3] text-white group-hover:text-[#fca5a5] group-data-[open=true]:text-[#fca5a5] transition-colors duration-300 ease-out whitespace-pre-line tracking-normal">
                        {srv.titleEn}
                      </h3>
                      <p
                        dir="rtl"
                        className="font-body-plex font-normal text-[14.5px] leading-[1.4] text-[#E9DEDE] group-hover:text-white group-data-[open=true]:text-white transition-colors duration-300 ease-out whitespace-pre-line mt-1"
                      >
                        {srv.titleAr}
                      </p>
                    </div>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 transition-[transform,color] duration-200 ease-out ${
                        isOpen
                          ? 'rotate-180 text-[#fca5a5]'
                          : 'text-[#BDB5B5]/80 group-hover:text-[#fca5a5]'
                      }`}
                    />
                  </button>

                  <div
                    id={desktopDescId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-2 pb-2 pt-1.5 border-t border-white/10">
                        <p
                          dir="rtl"
                          className="font-body-plex font-normal text-[11.5px] leading-[1.5] text-[#BDB5B5]"
                        >
                          {srv.descAr}
                        </p>
                        <p
                          dir="ltr"
                          className="font-body-plex font-normal text-[11px] leading-[1.45] text-[#BDB5B5]/85 mt-1"
                        >
                          {srv.descEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={srv.id}
                  data-open={isOpen ? 'true' : 'false'}
                  className="relative flex flex-col items-center group"
                >
                  {/* Upper Half */}
                  <div className="h-[296px] xl:h-[268px] w-full flex flex-col items-center justify-end pb-[5px]">
                    {isTop && (
                      <>
                        {renderDesktopCard('mb-3')}

                        <svg
                          width="12"
                          height="54"
                          viewBox="0 0 12 54"
                          fill="none"
                          aria-hidden="true"
                          className="text-white/45 group-hover:text-[#ef4444] group-data-[open=true]:text-[#ef4444] transition-colors duration-300 ease-out shrink-0"
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
                    className="w-[10px] h-[10px] rounded-full bg-[#D9D9D9] group-hover:bg-[#dc2626] group-data-[open=true]:bg-[#dc2626] group-hover:scale-125 group-data-[open=true]:scale-125 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative z-10 shadow-[0_0_8px_rgba(255,255,255,0.28)]"
                  />

                  {/* Lower Half */}
                  <div className="h-[296px] xl:h-[268px] w-full flex flex-col items-center justify-start pt-[5px]">
                    {!isTop && (
                      <>
                        <svg
                          width="12"
                          height="54"
                          viewBox="0 0 12 54"
                          fill="none"
                          aria-hidden="true"
                          className="text-white/45 group-hover:text-[#ef4444] group-data-[open=true]:text-[#ef4444] transition-colors duration-300 ease-out shrink-0"
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

                        {renderDesktopCard('mt-3')}
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
              const isOpen = Boolean(openServiceIds[srv.id]);
              const descId = `mobile-service-desc-${srv.id}`;
              return (
                <div
                  key={srv.id}
                  data-open={isOpen ? 'true' : 'false'}
                  className="touch-card relative w-full group rounded-xl border border-white/15 bg-[#120306]/75 hover:border-[#b81d33]/75 data-[open=true]:border-[#b81d33]/75 data-[open=true]:bg-[#170409]/85 transition-[transform,border-color,background-color] duration-300 ease-out"
                >
                  {/* Vertical Axis Node Dot & Horizontal Stem */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[26px] sm:-left-[32px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#D9D9D9] group-hover:bg-[#dc2626] group-data-[open=true]:bg-[#dc2626] shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-colors duration-200"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -left-[16px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[1px] bg-white/30 group-hover:bg-[#ef4444]/80 group-data-[open=true]:bg-[#ef4444]/80 transition-colors duration-200"
                  />

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={descId}
                    onClick={() => toggleService(srv.id)}
                    className="w-full text-left flex items-center justify-between gap-2 sm:gap-3 p-4 min-h-[72px] rounded-xl active:bg-[#68101C]/20 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                  >
                    <span className="w-5 shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0 space-y-1 text-center">
                      <h3
                        className={`font-body-plex font-bold text-[16px] leading-snug transition-colors duration-200 ${
                          isOpen ? 'text-[#fca5a5]' : 'text-white group-hover:text-[#fca5a5]'
                        }`}
                      >
                        {cleanEn}
                      </h3>
                      <p
                        dir="rtl"
                        className="font-body-plex font-normal text-[16px] leading-[1.55] text-[#E9DEDE] text-center"
                      >
                        {cleanAr}
                      </p>
                    </div>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-5 h-5 shrink-0 transition-[transform,color] duration-200 ease-out ${
                        isOpen
                          ? 'rotate-180 text-[#fca5a5]'
                          : 'text-[#BDB5B5] group-hover:text-[#fca5a5]'
                      }`}
                    />
                  </button>

                  <div
                    id={descId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 pt-2.5 border-t border-white/10 space-y-1.5 text-center">
                        <p
                          dir="rtl"
                          className="font-body-plex font-normal text-[13px] leading-[1.55] text-[#BDB5B5] text-center"
                        >
                          {srv.descAr}
                        </p>
                        <p
                          dir="ltr"
                          className="font-body-plex font-normal text-[12px] leading-[1.5] text-[#BDB5B5]/85 text-center"
                        >
                          {srv.descEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
