import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowDownRight, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { scrollToSectionId } from '../hooks/useDesktopScale';

interface SelectedWorkIndexProps {
  onRequestSample: (sampleName: string) => void;
  scale?: number;
}

interface OverviewProjectLink {
  id: string;
  targetId: string;
  titleEn: string;
  titleAr: string;
  thumbnail: string;
}

const OVERVIEW_PROJECTS_BY_CATEGORY: Record<string, OverviewProjectLink[]> = {
  'social-media-content': [
    {
      id: 'social-mimimo',
      targetId: 'project-social-mimimo',
      titleEn: 'MIMI MO',
      titleAr: 'ميمي مو',
      thumbnail: '/assets/aistudio/7cbcbfef-04bd-4390-aa23-05d07971c793_4809510e.jpg',
    },
    {
      id: 'social-medianesta',
      targetId: 'project-social-medianesta',
      titleEn: 'MEDIANESTA',
      titleAr: 'ميديانيستا',
      thumbnail: '/assets/cropped/med_08.webp',
    },
    {
      id: 'social-worldhunter',
      targetId: 'project-social-worldhunter',
      titleEn: 'WORLD HUNTER',
      titleAr: 'الصياد العالمي',
      thumbnail: '/assets/aistudio/1915590e-ed41-4da8-b79a-4c6672bfe413_2717de62.jpg',
    },
    {
      id: 'social-zeldar',
      targetId: 'project-social-zeldar',
      titleEn: 'ZEL ELDAR',
      titleAr: 'ظل الدار',
      thumbnail: '/assets/aistudio/image_2308e5c6.webp',
    },
    {
      id: 'social-filmrent',
      targetId: 'project-social-filmrent',
      titleEn: 'FILM RENT',
      titleAr: 'فيلمرنت',
      thumbnail: '/assets/aistudio/f4d31248-dd5b-4466-a5ad-cb8150a91c6d_326f2431.jpg',
    },
    {
      id: 'social-creativemark',
      targetId: 'project-social-creativemark',
      titleEn: 'CREATIVE MARK',
      titleAr: 'كريتيف مارك',
      thumbnail: '/assets/aistudio/3cdac1f6-7f50-4e1b-bf83-aa836ebcb95f_77186b26.jpg',
    },
    {
      id: 'social-elhoofy',
      targetId: 'project-social-elhoofy',
      titleEn: 'DR. Ahmed',
      titleAr: 'د. أحمد نبيل الحوفي',
      thumbnail: '/assets/aistudio/61f83079-cdcb-4b04-a18f-385cb212ef44_e59ec856.jpg',
    },
  ],
  scripts: [
    {
      id: 'script-gamal',
      targetId: 'project-script-gamal',
      titleEn: 'GAMAL ABDEL NASSER',
      titleAr: 'المحامي جمال عبد الناصر',
      thumbnail: '/assets/aistudio/script_g1_poster.jpg',
    },
    {
      id: 'script-shahin',
      targetId: 'project-script-shahin',
      titleEn: 'MAHMOUD SHAHIN',
      titleAr: 'المحامي محمود شاهين',
      thumbnail: '/assets/aistudio/script_m1_poster.jpg',
    },
    {
      id: 'script-sylvan',
      targetId: 'project-script-sylvan',
      titleEn: 'SYLVAN',
      titleAr: 'سيلفان',
      thumbnail: '/assets/aistudio/script_s1_poster.jpg',
    },
    {
      id: 'script-webbo',
      targetId: 'project-script-webbo',
      titleEn: 'WEBBO TECHNOLOGY',
      titleAr: 'ويبو للتكنولوجيا',
      thumbnail: '/assets/aistudio/script_w1_poster.jpg',
    },
    {
      id: 'script-medianesta',
      targetId: 'project-script-medianesta-scripts',
      titleEn: 'MEDIANESTA',
      titleAr: 'ميديانيستا',
      thumbnail: '/assets/aistudio/script_med_01_poster.jpg',
    },
  ],
  'motion-scripts': [
    {
      id: 'motion-medianesta-1',
      targetId: 'project-motion-medianesta-1',
      titleEn: 'MEDIANESTA (1)',
      titleAr: 'ميديانيستا — المنصة',
      thumbnail: '/assets/aistudio/motion_med_01_poster.jpg',
    },
    {
      id: 'motion-medianesta-2',
      targetId: 'project-motion-medianesta-2',
      titleEn: 'MEDIANESTA (2)',
      titleAr: 'ميديانيستا — السلسلة',
      thumbnail: '/assets/aistudio/motion_med_04_poster.jpg',
    },
    {
      id: 'motion-worldhunter',
      targetId: 'project-motion-worldhunter-motion',
      titleEn: 'WORLD HUNTER',
      titleAr: 'الصياد العالمي',
      thumbnail: '/assets/aistudio/motion_wh_01_poster.jpg',
    },
    {
      id: 'motion-asas-al-sharq',
      targetId: 'project-motion-asas-al-sharq',
      titleEn: 'ASAS AL-SHARQ',
      titleAr: 'أساس الشرق',
      thumbnail: '/assets/aistudio/motion_asas_01_poster.jpg',
    },
    {
      id: 'motion-wavesart',
      targetId: 'project-motion-wavesart',
      titleEn: 'WAVES ART',
      titleAr: 'ويفز آرت',
      thumbnail: '/assets/aistudio/motion_waves_01_poster.jpg',
    },
    {
      id: 'motion-bitweave',
      targetId: 'project-motion-bitweave',
      titleEn: 'BITWEAVE',
      titleAr: 'بت ويف',
      thumbnail: '/assets/aistudio/motion_bw_01_poster.jpg',
    },
  ],
  'company-profile': [
    {
      id: 'profile-caravaggio',
      targetId: 'project-profile-caravaggio',
      titleEn: 'CARAVAGGIO STUDIO',
      titleAr: 'ستوديو كارافاجيو',
      thumbnail: '/assets/aistudio/caravaggio_en-01.jpg',
    },
    {
      id: 'profile-droob',
      targetId: 'project-profile-droob',
      titleEn: 'DROOB TRADING',
      titleAr: 'شركة الدروب الذهبية للتجارة',
      thumbnail: '/assets/aistudio/prof_droob_en_1.jpg',
    },
    {
      id: 'profile-romarin',
      targetId: 'project-profile-romarin',
      titleEn: 'ROMARIN RESTAURANT',
      titleAr: 'مطعم رومارين للشيف ربيعة',
      thumbnail: '/assets/aistudio/prof_romarin_1.jpg',
    },
    {
      id: 'profile-hayam',
      targetId: 'project-profile-hayam',
      titleEn: 'HAYAM AL-BARIR',
      titleAr: 'بودكاست مع هيام البرير',
      thumbnail: '/assets/aistudio/prof_hayam_1.jpg',
    },
  ],
  'content-strategy': [
    {
      id: 'strategy-dar-al-ashab',
      targetId: 'project-strategy-dar-al-ashab',
      titleEn: 'DAR AL-ASHAB',
      titleAr: 'براند دار العشب',
      thumbnail: '/assets/aistudio/strat_ashab_1.jpg',
    },
    {
      id: 'strategy-dr-loay',
      targetId: 'project-strategy-dr-loay-clinics',
      titleEn: 'DR. LOAY CLINICS',
      titleAr: 'عيادات د. لؤي للأسنان',
      thumbnail: '/assets/aistudio/strat_loay_1.jpg',
    },
    {
      id: 'strategy-dr-shimaa',
      targetId: 'project-strategy-dr-shimaa-clinic',
      titleEn: 'DR. SHIMAA CLINIC',
      titleAr: 'عيادة د. شيماء الشافعي',
      thumbnail: '/assets/aistudio/strat_shimaa_1.jpg',
    },
  ],
  'marketing-plan': [
    {
      id: 'plan-niesta',
      targetId: 'project-plan-niesta-strategy',
      titleEn: 'NIESTA DESIGN',
      titleAr: 'شركة نييستا للتشطيبات والديكور',
      thumbnail: '/assets/aistudio/mplan_niesta_1.jpg',
    },
    {
      id: 'plan-april',
      targetId: 'project-plan-april-arabia-plan',
      titleEn: 'APRIL ARABIA',
      titleAr: 'أبريل أرابيا للأزياء المحتشمة',
      thumbnail: '/assets/aistudio/mplan_april_1.jpg',
    },
    {
      id: 'plan-ghazali',
      targetId: 'project-plan-ghazali-real-estate',
      titleEn: 'AL-GHAZALI',
      titleAr: 'شركة الغزالي العقارية',
      thumbnail: '/assets/aistudio/mplan_ghazali_1.jpg',
    },
    {
      id: 'plan-muallimi',
      targetId: 'project-plan-muallimi-restaurants',
      titleEn: 'AL-MUALLIMI',
      titleAr: 'مطاعم كبدة المعلمي',
      thumbnail: '/assets/aistudio/mplan_muallimi_1.jpg',
    },
    {
      id: 'plan-unitax',
      targetId: 'project-plan-unitax-elevators',
      titleEn: 'UNITAX ELEVATORS',
      titleAr: 'شركة مصاعد يوني تاكس',
      thumbnail: '/assets/aistudio/mplan_unitax_1.jpg',
    },
  ],
};

export const SelectedWorkIndex: React.FC<SelectedWorkIndexProps> = ({
  onRequestSample,
}) => {
  const { data } = usePortfolio();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isDesktopGrid, setIsDesktopGrid] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktopGrid(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const selectedCategoryMeta = selectedCategoryId
    ? data.selectedWork.find((item) => item.targetId === selectedCategoryId) || null
    : null;
  const selectedProjects = selectedCategoryId
    ? OVERVIEW_PROJECTS_BY_CATEGORY[selectedCategoryId] || []
    : [];

  const handleToggleCategory = (targetId: string) => {
    setSelectedCategoryId((prev) => (prev === targetId ? null : targetId));
  };

  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, fallbackLabel?: string) => {
    e.preventDefault();
    if (targetId === 'contact' && fallbackLabel) {
      onRequestSample(fallbackLabel);
      return;
    }
    scrollToSectionId(targetId);
  };

  return (
    <section id="selected-work" className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header: giant SELECTED WORK + crisp white نماذج من أعمالي */}
        <div className="mb-10 sm:mb-14 text-center">
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

          <p className="mt-9 sm:mt-11 font-body-plex text-[16px] text-[#E9DEDE] leading-[1.6] text-center max-w-2xl mx-auto">
            Select a category to jump directly to any project, or browse the complete archive below.{' '}
            <span dir="rtl" className="inline-block text-[#BDB5B5]">
              اختر قسمًا لاستعراض مشاريعه بروابط مباشرة، أو تصفح الأرشيف الكامل بالأسفل.
            </span>
          </p>
        </div>

        {/* 6 Compact Category Overview Cards (No projects expanded by default) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {data.selectedWork.map((item) => {
            const categoryProjects = OVERVIEW_PROJECTS_BY_CATEGORY[item.targetId] || [];
            const coverThumb = categoryProjects[0]?.thumbnail;
            const isSelected = selectedCategoryId === item.targetId;

            return (
              <div
                key={item.number}
                className={`rounded-2xl border transition-[border-color,background-color,transform] duration-200 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1a050b] border-[#b81d33] shadow-[0_0_24px_rgba(184,29,51,0.22)]'
                    : 'bg-[#120306]/85 border-white/15 hover:border-[#8A1526]/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggleCategory(item.targetId)}
                  aria-expanded={isSelected}
                  aria-controls="selected-work-projects-panel"
                  className="w-full text-left p-4 flex items-center gap-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white"
                >
                  {/* Existing verified thumbnail preview */}
                  <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-xl overflow-hidden bg-black/80 border border-white/12 shrink-0 flex items-center justify-center">
                    {coverThumb ? (
                      <img
                        src={coverThumb}
                        alt={item.titleEn}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="font-displayEn text-2xl text-white/70">{item.number}</span>
                    )}
                  </div>

                  {/* Category Number & Exact Titles */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-displayEn text-xl leading-none text-[#fca5a5] tracking-wider">
                        {item.number}
                      </span>
                      <span className="font-body-plex text-xs font-semibold text-[#BDB5B5] tabular-nums">
                        {categoryProjects.length} projects
                      </span>
                    </div>
                    <h3 className="font-body-plex font-bold text-[16px] sm:text-[17px] text-white leading-snug mt-1">
                      {item.titleEn}
                    </h3>
                    <p
                      dir="rtl"
                      className="font-body-plex text-[15px] text-[#E9DEDE] leading-snug mt-0.5 text-right"
                    >
                      {item.titleAr}
                    </p>
                  </div>
                </button>

                {/* Bottom Action Strip: Toggle Projects + Preserved Direct Section Deep Link */}
                <div className="px-4 py-2.5 border-t border-white/10 bg-black/25 flex items-center justify-between gap-2 font-body-plex text-xs">
                  <button
                    type="button"
                    onClick={() => handleToggleCategory(item.targetId)}
                    className="min-h-[36px] inline-flex items-center gap-1 font-semibold text-[#F5F2F1] hover:text-[#fca5a5] cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded px-1"
                  >
                    <span>{isSelected ? 'Hide projects' : 'Show projects'}</span>
                    {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <a
                    href={`#${item.targetId}`}
                    onClick={(e) => handleJump(e, item.targetId, `${item.titleEn} | ${item.titleAr}`)}
                    className="min-h-[36px] inline-flex items-center gap-1 font-semibold text-[#E9DEDE] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded px-1.5"
                  >
                    <span>View section</span>
                    <ArrowDownRight className="w-3.5 h-3.5 text-[#ef4444]" />
                  </a>
                </div>

                {/* Mobile/Tablet Inline Progressive Disclosure directly inside the selected category */}
                {!isDesktopGrid && isSelected && categoryProjects.length > 0 && (
                  <div
                    id="selected-work-projects-panel"
                    className="border-t border-[#8A1526]/55 bg-[#0d0205]/95 p-3 space-y-2 slide-fade-enter"
                  >
                    {categoryProjects.map((project, idx) => (
                      <a
                        key={project.id}
                        href={`#${project.targetId}`}
                        onClick={(e) => handleJump(e, project.targetId)}
                        className="group min-h-[60px] p-2 rounded-xl bg-white/[0.03] hover:bg-[#68101C]/35 border border-white/12 hover:border-[#b81d33] flex items-center gap-2.5 transition-[background-color,border-color] duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-black border border-white/10 shrink-0 flex items-center justify-center">
                          <img
                            src={project.thumbnail}
                            alt={project.titleEn}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-body-plex font-bold text-[#fca5a5] tabular-nums">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="font-body-plex font-bold text-[14.5px] text-white group-hover:text-[#fca5a5] truncate transition-colors">
                              {project.titleEn}
                            </span>
                          </div>
                          <p
                            dir="rtl"
                            className="font-body-plex text-[14px] text-[#E9DEDE] truncate text-right mt-0.5"
                          >
                            {project.titleAr}
                          </p>
                        </div>
                        <ArrowDownRight className="w-4 h-4 text-[#BDB5B5] group-hover:text-white shrink-0 transition-colors" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Progressive-Disclosure Panel: Shown ONLY when a category card is selected */}
        {isDesktopGrid && selectedCategoryMeta && selectedProjects.length > 0 && (
          <div
            id="selected-work-projects-panel"
            className="mt-6 rounded-2xl border border-[#8A1526]/65 bg-[#120306]/95 p-4 sm:p-6 shadow-2xl slide-fade-enter"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/12">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-displayEn text-2xl text-[#ef4444] leading-none">
                    {selectedCategoryMeta.number}
                  </span>
                  <h3 className="font-body-plex font-bold text-[17px] sm:text-[19px] text-white leading-snug">
                    {selectedCategoryMeta.titleEn}
                  </h3>
                  <span className="text-white/35">|</span>
                  <span dir="rtl" className="font-body-plex font-bold text-[16px] sm:text-[18px] text-[#E9DEDE]">
                    {selectedCategoryMeta.titleAr}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`#${selectedCategoryMeta.targetId}`}
                  onClick={(e) => handleJump(e, selectedCategoryMeta.targetId)}
                  className="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#68101C]/65 hover:bg-[#8A1526] border border-[#b81d33]/70 text-xs font-body-plex font-semibold text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span>Full section</span>
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedCategoryId(null)}
                  aria-label="Close category projects | إغلاق قائمة المشاريع"
                  className="min-w-[40px] min-h-[40px] rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-[#F5F2F1] border border-white/15 inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Direct Project Links Grid (Exact Current Order, Zero Repeated Long Copy) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedProjects.map((project, idx) => (
                <a
                  key={project.id}
                  href={`#${project.targetId}`}
                  onClick={(e) => handleJump(e, project.targetId)}
                  className="group min-h-[68px] p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#68101C]/35 border border-white/12 hover:border-[#b81d33] flex items-center gap-3 transition-[background-color,border-color,transform] duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-black border border-white/10 shrink-0 flex items-center justify-center">
                    <img
                      src={project.thumbnail}
                      alt={project.titleEn}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-body-plex font-bold text-[#fca5a5] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body-plex font-bold text-[15px] text-white group-hover:text-[#fca5a5] truncate transition-colors">
                        {project.titleEn}
                      </span>
                    </div>
                    <p
                      dir="rtl"
                      className="font-body-plex text-[14.5px] text-[#E9DEDE] truncate text-right mt-0.5"
                    >
                      {project.titleAr}
                    </p>
                  </div>
                  <ArrowDownRight className="w-4 h-4 text-[#BDB5B5] group-hover:text-white shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
