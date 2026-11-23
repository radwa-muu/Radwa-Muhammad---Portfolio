import React from 'react';
import { VideoScript } from '../utils/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { LazyVideoPlayer } from './LazyVideoPlayer';

interface ScriptsSectionProps {
  onOpenVideo: (script: VideoScript) => void;
  onOpenInquiry: (topic?: string) => void;
}

interface ScriptClientConfig {
  id: 'gamal' | 'shahin' | 'sylvan' | 'webbo' | 'medianesta-scripts';
  brandNameEn: string;
  brandNameAr: string;
  clientLabelEn: string;
  clientLabelAr: string;
  clientDescEn: string;
  clientDescAr: string;
  roleLabelEn: string;
  roleLabelAr: string;
  roleDescEn: string;
  roleDescAr: string;
  buttonEn: string;
  buttonAr: string;
  socialUrl: string;
  isShortTitle?: boolean;
}

const SCRIPT_CLIENTS: ScriptClientConfig[] = [
  {
    id: 'gamal',
    brandNameEn: 'GAMAL ABDEL NASSER',
    brandNameAr: 'المحامي جمال عبد الناصر',
    clientLabelEn: 'The client',
    clientLabelAr: 'العميل',
    clientDescEn: 'A lawyer. Short videos for his TikTok account.',
    clientDescAr: 'محامٍ، ومقاطع قصيرة لحسابه على تيك توك.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Researching the ideas and writing the scripts.',
    roleDescAr: 'البحث عن الأفكار وكتابة النصوص.',
    buttonEn: 'View on TikTok',
    buttonAr: 'حساب تيك توك',
    socialUrl: 'https://www.tiktok.com/@gamalabdelnassersadeq?_r=1&_t=ZS-9BA7lBAaasm',
  },
  {
    id: 'shahin',
    brandNameEn: 'MAHMOUD SHAHIN',
    brandNameAr: 'المحامي محمود شاهين',
    clientLabelEn: 'The client',
    clientLabelAr: 'العميل',
    clientDescEn: 'A lawyer. Short videos for his TikTok account.',
    clientDescAr: 'محامٍ، ومقاطع قصيرة لحسابه على تيك توك.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Researching the ideas and writing the scripts.',
    roleDescAr: 'البحث عن الأفكار وكتابة النصوص.',
    buttonEn: 'View on TikTok',
    buttonAr: 'حساب تيك توك',
    socialUrl: 'https://www.tiktok.com/@mahmoudshahin2025?_r=1&_t=ZS-9BMd4lQyVDo',
  },
  {
    id: 'sylvan',
    brandNameEn: 'SYLVAN',
    brandNameAr: 'سيلفان',
    clientLabelEn: 'The brand',
    clientLabelAr: 'العلامة',
    clientDescEn: 'A Saudi showroom specializing in parquet, doors, and curtains.',
    clientDescAr: 'معرض سعودي متخصص في الباركيه والأبواب والستائر.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn:
      'Fully responsible for the content and for following up with the client. Wrote the full script descriptions, including what the model does on screen, and the editing notes for the editor.',
    roleDescAr:
      'مسؤولة عن المحتوى بالكامل ومتابعة العميل، وكتابة وصف السكربتات كاملًا (ما يفعله الموديل أمام الكاميرا)، وكتابة توجيهات المونتاج للمونتير.',
    buttonEn: 'View on TikTok',
    buttonAr: 'حساب تيك توك',
    socialUrl: 'https://www.tiktok.com/@sylvan_ksa?_r=1&_t=ZS-9BC4GqnuTOW',
    isShortTitle: true,
  },
  {
    id: 'webbo',
    brandNameEn: 'WEBBO TECHNOLOGY',
    brandNameAr: 'ويبو للتكنولوجيا',
    clientLabelEn: 'The company',
    clientLabelAr: 'الشركة',
    clientDescEn: 'A company that provides ERP systems. The videos explain ERP to business owners.',
    clientDescAr: 'شركة متخصصة في أنظمة تخطيط موارد المؤسسات (ERP)، وتشرحها الفيديوهات لأصحاب الأعمال.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Responsible for all of the content.',
    roleDescAr: 'مسؤولة عن المحتوى بالكامل.',
    buttonEn: 'View the company page',
    buttonAr: 'صفحة الشركة',
    socialUrl: 'https://www.facebook.com/share/1KHQ7aNRyA/?mibextid=wwXIfr',
  },
  {
    id: 'medianesta-scripts',
    brandNameEn: 'MEDIANESTA',
    brandNameAr: 'ميديانيستا',
    clientLabelEn: 'The platform',
    clientLabelAr: 'المنصة',
    clientDescEn: 'A Saudi platform connecting clients with freelancers, and the other way around.',
    clientDescAr: 'منصة سعودية تربط العملاء بالمستقلين، والعكس.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Writing short-form live-actor Reel scripts highlighting business pain points and how Medianesta solves them.',
    roleDescAr: 'كتابة سكربتات الفيديوهات القصيرة (Reels) بأسلوب يسلّط الضوء على تحديات أصحاب المشاريع ودور ميديانيستا في حلها.',
    buttonEn: 'View on Instagram',
    buttonAr: 'صفحة البراند على إنستغرام',
    socialUrl: 'https://www.instagram.com/medianesta_ksa?psln=dnowZm9ncGxrZzVx',
    isShortTitle: true,
  },
];

export const ScriptsSection: React.FC<ScriptsSectionProps> = () => {
  const { data } = usePortfolio();

  return (
    <>
      {/* ======================================================== */}
      {/* Page 13 Divider: 02 SCRIPTS (Centered, Reference Match)  */}
      {/* ======================================================== */}
      <section
        id="scripts"
        className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip flex flex-col justify-center items-center"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center select-none cursor-default interactive-lockup">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-right" />
            <span className="text-[38px] sm:text-[48px] font-displayEn font-normal text-white tracking-[0.06em] leading-none block">
              02
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-left" />
          </div>
          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
            style={{ fontSize: 'clamp(46px, calc(11 * var(--vw, 1vw)), 162px)' }}
          >
            SCRIPTS
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white leading-none text-center -mt-[0.28em] sm:-mt-[0.36em]"
            style={{
              fontSize: 'clamp(30px, calc(6.2 * var(--vw, 1vw)), 92px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            السكربتات
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* Client Script Showcases: Gamal, Shahin, Sylvan, Webbo    */}
      {/* ======================================================== */}
      {SCRIPT_CLIENTS.map((client) => {
        const clientScripts = data.videoScripts.filter((s) => s.clientId === client.id);

        return (
          <section
            key={client.id}
            id={`project-script-${client.id}`}
            className="scroll-mt-24 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip"
          >
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Top Header Block: Centered brand title + 2 centered top-lined info columns */}
              <div className="mb-8 lg:mb-9">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="w-fit max-w-full mx-auto relative select-none text-center cursor-default interactive-lockup">
                    <h3
                      style={{
                        fontSize: client.isShortTitle
                          ? 'clamp(44px, calc(6.8 * var(--vw, 1vw)), 94px)'
                          : 'clamp(34px, calc(4.6 * var(--vw, 1vw)), 64px)',
                      }}
                      className={`font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear ${
                        client.isShortTitle ? '' : 'sm:whitespace-nowrap'
                      }`}
                    >
                      {client.brandNameEn}
                    </h3>
                    <p
                      dir="rtl"
                      style={{
                        fontSize: client.isShortTitle
                          ? 'clamp(30px, calc(4.2 * var(--vw, 1vw)), 58px)'
                          : 'clamp(24px, calc(3.1 * var(--vw, 1vw)), 44px)',
                        textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                      }}
                      className="font-amiri font-bold text-white leading-none text-center -mt-[0.34em] sm:-mt-[0.42em]"
                    >
                      {client.brandNameAr}
                    </p>
                  </div>
                </div>

                {/* 2 Top-Lined Columns */}
                <div
                  data-layout-grid
                  className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10"
                >
                  {/* Column 1 */}
                  <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                    <div className="flex flex-wrap items-baseline gap-1.5 text-[16px]">
                      <span className="font-body-plex font-bold text-white">{client.clientLabelEn}</span>
                      <span className="text-white/40">|</span>
                      <span dir="rtl" className="font-body-plex font-normal text-[#BDB5B5]">
                        {client.clientLabelAr}
                      </span>
                    </div>
                    <p className="font-body-plex text-[16px] text-[#F5F2F1] leading-[1.6] text-left">
                      {client.clientDescEn}
                    </p>
                    <p
                      dir="rtl"
                      className="font-body-plex text-[16px] text-[#E9DEDE] leading-[1.7] text-right"
                    >
                      {client.clientDescAr}
                    </p>
                  </div>

                  {/* Column 2 */}
                  <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                    <div className="flex flex-wrap items-baseline gap-1.5 text-[16px]">
                      <span className="font-body-plex font-bold text-white">{client.roleLabelEn}</span>
                      <span className="text-white/40">|</span>
                      <span dir="rtl" className="font-body-plex font-normal text-[#BDB5B5]">
                        {client.roleLabelAr}
                      </span>
                    </div>
                    <p className="font-body-plex text-[16px] text-[#F5F2F1] leading-[1.6] text-left">
                      {client.roleDescEn}
                    </p>
                    <p
                      dir="rtl"
                      className="font-body-plex text-[16px] text-[#E9DEDE] leading-[1.7] text-right"
                    >
                      {client.roleDescAr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instruction line above 3 videos */}
              <p className="font-body-plex text-[16px] text-[#F5F2F1] mb-6 text-center leading-[1.6]">
                Press play on any video <span className="text-white/45">|</span>{' '}
                <span className="text-[#E9DEDE]">اضغط للتشغيل</span>
              </p>

              {/* Real Vertical 9:16 Video Players (responsive 1 -> 2 -> 3 col grid) */}
              <div
                className={
                  clientScripts.length === 2
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 max-w-3xl mx-auto'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'
                }
              >
                {clientScripts.map((script) => (
                  <div key={script.id} className="flex flex-col group/vid max-w-[330px] sm:max-w-none mx-auto sm:mx-0 w-full">
                    <div className="touch-card relative aspect-[9/16] rounded-[4px] overflow-hidden bg-black shadow-lg ring-1 ring-white/10 group-hover/vid:ring-[#b81d33]/80 group-active/vid:ring-[#dc2626] group-hover/vid:-translate-y-1.5 group-active/vid:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      {script.videoSrc ? (
                        <LazyVideoPlayer
                          src={script.videoSrc}
                          poster={script.posterImg}
                          ariaLabel={script.titleAr}
                          objectFit="cover"
                        />
                      ) : null}
                    </div>

                    {/* Clean centered index & duration */}
                    <div className="mt-3.5 flex items-center justify-center gap-2.5">
                      <span className="font-displayEn font-normal text-[23px] sm:text-[25px] leading-none text-white tracking-wide">
                        {script.videoNum}
                      </span>
                      <span className="font-body-plex text-[14px] text-white/60 leading-none">
                        {script.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom-Right Clean Pill Outline CTA Button linking directly to client social page */}
              <div className="flex justify-center sm:justify-end pt-8 sm:pt-10">
                <a
                  href={client.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-btn px-6 sm:px-7 py-2.5 min-h-[44px] rounded-full border border-white/55 hover:border-[#b81d33] hover:bg-[#68101C]/45 text-white/95 cursor-pointer inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-body-plex text-[14.5px] sm:text-[15px] text-center"
                >
                  <span className="text-white">{client.buttonEn}</span>
                  <span className="text-white/45">|</span>
                  <span className="text-[#E9DEDE]">{client.buttonAr}</span>
                </a>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};
