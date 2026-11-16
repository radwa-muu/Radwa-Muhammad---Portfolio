import React from 'react';
import { ClientItem } from '../utils/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { Plus, Trash2 } from 'lucide-react';

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
  scales: { src: logoGamal, sizeClass: 'max-h-[96px]' },
  medianesta: { src: logoMedianesta, sizeClass: 'max-h-[60px]' },
  sylvan: { src: logoSylvan, sizeClass: 'max-h-[60px]' },
  alsawah: { src: logoAlsawah, sizeClass: 'max-h-[90px]' },
  worldhunter: { src: logoWorldhunter, sizeClass: 'max-h-[98px]' },
  doctor: { src: logoDoctor, sizeClass: 'max-h-[72px]' },
  zeldar: { src: logoZeldar, sizeClass: 'max-h-[88px]' },
  mimimo: { src: logoMimimo, sizeClass: 'max-h-[100px]' },
  bitweave: { src: logoBitweave, sizeClass: 'max-h-[44px]' },
};

export const Clients: React.FC = () => {
  const { data, isEditMode, updateClient, addClient, deleteClient } = usePortfolio();

  const handleAddClient = () => {
    const id = `client-${Date.now()}`;
    addClient({
      id,
      nameEn: 'NEW CLIENT',
      nameAr: 'عميل جديد',
      subEn: 'Brand / Industry',
      subAr: 'وصف العميل',
      iconType: 'sylvan',
    });
  };

  return (
    <section id="clients" className="scroll-mt-20 py-14 px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header: huge CLIENTS + white Amiri عمــــــلائي */}
        <div className="mb-16 text-left relative inline-block w-fit select-none cursor-default interactive-lockup">
          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear"
            style={{ fontSize: 'clamp(72px, calc(14.5 * var(--vw, 1vw)), 204px)' }}
          >
            CLIENTS
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap leading-none"
            style={{
              fontSize: 'clamp(54px, calc(8.6 * var(--vw, 1vw)), 124px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            عمــــــلائي
          </p>
        </div>

        {/* Clean Borderless 3x3 Real Client Logos Grid */}
        <div className="grid grid-cols-3 gap-y-16 gap-x-12 items-center">
          {data.clients.map((client) => {
            const logoAsset = CLIENT_LOGOS[client.iconType];
            const isCustomAdded = client.id.startsWith('client-');

            return (
              <div
                key={client.id}
                className={`relative flex flex-col items-center justify-center text-center min-h-[108px] touch-card transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isEditMode
                    ? 'p-4 rounded-xl border border-dashed border-white/20 hover:border-[#8A1526]'
                    : 'cursor-pointer hover:-translate-y-1.5 active:-translate-y-1.5 active:scale-95 opacity-90 hover:opacity-100 active:opacity-100'
                }`}
              >
                {isEditMode && (
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/70 hover:bg-red-700 text-stone-300 hover:text-white transition-colors z-20 cursor-pointer"
                    title="حذف العميل | Remove client"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {!isCustomAdded && logoAsset ? (
                  <img
                    src={logoAsset.src}
                    alt={`${client.nameEn} | ${client.nameAr}`}
                    className={`relative z-10 w-auto max-w-[240px] object-contain select-none ${logoAsset.sizeClass}`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <EditableText
                      as="span"
                      value={client.nameEn}
                      onChange={(val) => updateClient(client.id, { nameEn: val })}
                      className="font-body-plex font-bold text-[19px] text-white leading-tight"
                    />
                    <EditableText
                      as="span"
                      dir="rtl"
                      value={client.nameAr}
                      onChange={(val) => updateClient(client.id, { nameAr: val })}
                      className="font-body-plex text-[17px] text-[#E9DEDE] mt-1 leading-tight"
                    />
                  </div>
                )}

                {isEditMode && !isCustomAdded && (
                  <div className="mt-2 flex flex-col items-center text-xs text-[#BDB5B5] gap-0.5">
                    <EditableText
                      as="span"
                      value={client.nameEn}
                      onChange={(val) => updateClient(client.id, { nameEn: val })}
                      className="text-xs text-white/80"
                    />
                    <EditableText
                      as="span"
                      dir="rtl"
                      value={client.nameAr}
                      onChange={(val) => updateClient(client.id, { nameAr: val })}
                      className="text-xs text-[#E9DEDE]/75"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {isEditMode && (
            <button
              onClick={handleAddClient}
              className="p-6 rounded-xl border-2 border-dashed border-[#8A1526]/60 hover:border-[#8A1526] bg-[#120306]/40 flex flex-col items-center justify-center gap-2 min-h-[112px] text-[#E9DEDE] hover:bg-[#8A1526]/10 transition-colors cursor-pointer"
            >
              <Plus className="w-6 h-6 text-[#8A1526]" />
              <span className="font-body-plex text-sm">إضافة عميل | Add Client</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
