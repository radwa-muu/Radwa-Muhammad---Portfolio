import React from 'react';
import { ClientItem } from '../utils/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

import logoGamal from '../assets/images/clients/logo_gamal.png';
import logoMedianesta from '../assets/images/clients/logo_medianesta.png';
import logoSylvan from '../assets/images/clients/logo_sylvan.png';
import logoAlsawah from '../assets/images/clients/logo_alsawah.png';
import logoWorldhunter from '../assets/images/clients/logo_worldhunter.png';
import logoDoctor from '../assets/images/clients/logo_doctor.png';
import logoZeldar from '../assets/images/clients/logo_zeldar.png';
import logoMimimo from '../assets/images/clients/logo_mimimo.png';
import logoBitweave from '../assets/images/clients/logo_bitweave.png';

const CLIENT_LOGOS: Record<
  ClientItem['iconType'],
  { src: string; sizeClass: string }
> = {
  scales: { src: logoGamal, sizeClass: 'max-h-[68px] sm:max-h-[88px] lg:max-h-[96px]' },
  medianesta: { src: logoMedianesta, sizeClass: 'max-h-[44px] sm:max-h-[54px] lg:max-h-[60px]' },
  sylvan: { src: logoSylvan, sizeClass: 'max-h-[44px] sm:max-h-[54px] lg:max-h-[60px]' },
  alsawah: { src: logoAlsawah, sizeClass: 'max-h-[64px] sm:max-h-[82px] lg:max-h-[90px]' },
  worldhunter: { src: logoWorldhunter, sizeClass: 'max-h-[70px] sm:max-h-[88px] lg:max-h-[98px]' },
  doctor: { src: logoDoctor, sizeClass: 'max-h-[52px] sm:max-h-[64px] lg:max-h-[72px]' },
  zeldar: { src: logoZeldar, sizeClass: 'max-h-[62px] sm:max-h-[78px] lg:max-h-[88px]' },
  mimimo: { src: logoMimimo, sizeClass: 'max-h-[72px] sm:max-h-[90px] lg:max-h-[100px]' },
  bitweave: { src: logoBitweave, sizeClass: 'max-h-[34px] sm:max-h-[40px] lg:max-h-[44px]' },
};

export const Clients: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="clients" className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header: huge CLIENTS + white Amiri عمــــــلائي */}
        <div className="mb-10 sm:mb-16 text-left relative inline-block w-fit max-w-full select-none cursor-default interactive-lockup">
          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear"
            style={{ fontSize: 'clamp(56px, calc(14 * var(--vw, 1vw)), 204px)' }}
          >
            CLIENTS
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white absolute left-1/2 -translate-x-1/2 -bottom-4 sm:-bottom-6 whitespace-nowrap leading-none"
            style={{
              fontSize: 'clamp(38px, calc(8.6 * var(--vw, 1vw)), 124px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            عمــــــلائي
          </p>
        </div>

        {/* Clean Borderless Responsive Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 sm:gap-y-12 lg:gap-y-16 gap-x-6 sm:gap-x-10 lg:gap-x-12 items-center">
          {data.clients.map((client, idx) => {
            const logoAsset = CLIENT_LOGOS[client.iconType];
            const isLastOdd = idx === data.clients.length - 1 && data.clients.length % 2 === 1;

            return (
              <div
                key={client.id}
                className={`relative flex flex-col items-center justify-center text-center min-h-[82px] sm:min-h-[108px] touch-card transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer hover:-translate-y-1.5 active:-translate-y-1.5 active:scale-95 opacity-90 hover:opacity-100 active:opacity-100 ${
                  isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                {logoAsset && (
                  <img
                    src={logoAsset.src}
                    alt={`${client.nameEn} | ${client.nameAr}`}
                    className={`relative z-10 w-auto max-w-[140px] sm:max-w-[200px] lg:max-w-[240px] object-contain select-none ${logoAsset.sizeClass}`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
