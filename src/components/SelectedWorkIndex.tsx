import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { scrollToSectionId } from '../hooks/useDesktopScale';

interface SelectedWorkIndexProps {
  onRequestSample: (sampleName: string) => void;
  scale?: number;
}

export const SelectedWorkIndex: React.FC<SelectedWorkIndexProps> = ({
  onRequestSample,
  scale = 1,
}) => {
  const { data, updateSelectedWork, isEditMode } = usePortfolio();
  const leftCol = data.selectedWork.slice(0, 3);
  const rightCol = data.selectedWork.slice(3, 6);

  return (
    <section id="selected-work" className="scroll-mt-20 py-14 px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header: giant SELECTED WORK + crisp white نماذج من أعمالي */}
        <div className="mb-16 text-left relative inline-block w-fit select-none cursor-default interactive-lockup">
          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear"
            style={{ fontSize: 'clamp(66px, calc(13.5 * var(--vw, 1vw)), 194px)' }}
          >
            SELECTED WORK
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap leading-none"
            style={{
              fontSize: 'clamp(48px, calc(7.6 * var(--vw, 1vw)), 112px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            نماذج من أعمالي
          </p>
        </div>

        {/* 2-column numbered list */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-2">
          <div>
            {leftCol.map((item, idx) => (
              <a
                key={item.number}
                href={isEditMode ? undefined : `#${item.targetId}`}
                onClick={(e) => {
                  if (isEditMode) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  if (item.targetId === 'contact') {
                    onRequestSample(`${item.titleEn} | ${item.titleAr}`);
                  } else {
                    scrollToSectionId(item.targetId, scale);
                  }
                }}
                className="touch-card pt-5 pb-7 px-3 -mx-3 rounded-lg border-t border-white/15 flex items-center justify-between group hover:border-[#8A1526]/80 active:border-[#dc2626] hover:bg-white/[0.03] active:bg-[#8A1526]/12 hover:-translate-y-0.5 active:-translate-y-0.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[46px] font-displayEn font-normal leading-none text-white/45 group-hover:text-[#dc2626] group-active:text-[#dc2626] transition-colors duration-300 ease-out w-11 shrink-0">
                    {item.number}
                  </span>
                  <div>
                    <EditableText
                      as="h3"
                      value={item.titleEn}
                      onChange={(val) => updateSelectedWork(idx, { titleEn: val })}
                      className="font-body-plex font-bold text-[20px] text-white leading-snug"
                    />
                    <EditableText
                      as="p"
                      dir="rtl"
                      value={item.titleAr}
                      onChange={(val) => updateSelectedWork(idx, { titleAr: val })}
                      className="font-body-plex font-normal text-[17px] text-[#E9DEDE]/85 group-hover:text-white transition-colors duration-300 ease-out leading-snug mt-0.5 text-left"
                    />
                  </div>
                </div>
                <span className="text-xs text-[#8A1526] group-hover:text-amber-300 font-body-plex font-medium transition-colors duration-300 ease-out shrink-0 ml-3">
                  View →
                </span>
              </a>
            ))}
          </div>

          <div>
            {rightCol.map((item, idx) => (
              <a
                key={item.number}
                href={isEditMode ? undefined : `#${item.targetId}`}
                onClick={(e) => {
                  if (isEditMode) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  if (item.targetId === 'contact') {
                    onRequestSample(`${item.titleEn} | ${item.titleAr}`);
                  } else {
                    scrollToSectionId(item.targetId, scale);
                  }
                }}
                className="touch-card pt-5 pb-7 px-3 -mx-3 rounded-lg border-t border-white/15 flex items-center justify-between group hover:border-[#8A1526]/80 active:border-[#dc2626] hover:bg-white/[0.03] active:bg-[#8A1526]/12 hover:-translate-y-0.5 active:-translate-y-0.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[46px] font-displayEn font-normal leading-none text-white/45 group-hover:text-[#dc2626] group-active:text-[#dc2626] transition-colors duration-300 ease-out w-11 shrink-0">
                    {item.number}
                  </span>
                  <div>
                    <EditableText
                      as="h3"
                      value={item.titleEn}
                      onChange={(val) => updateSelectedWork(idx + 3, { titleEn: val })}
                      className="font-body-plex font-bold text-[20px] text-white leading-snug"
                    />
                    <EditableText
                      as="p"
                      dir="rtl"
                      value={item.titleAr}
                      onChange={(val) => updateSelectedWork(idx + 3, { titleAr: val })}
                      className="font-body-plex font-normal text-[17px] text-[#E9DEDE]/85 group-hover:text-white transition-colors duration-300 ease-out leading-snug mt-0.5 text-left"
                    />
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
