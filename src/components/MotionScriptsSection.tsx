import React from 'react';
import { VideoScript } from '../utils/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { LazyVideoPlayer } from './LazyVideoPlayer';

interface MotionScriptsSectionProps {
  onOpenVideo: (script: VideoScript) => void;
}

interface MotionClientConfig {
  id: 'medianesta-1' | 'medianesta-2' | 'worldhunter-motion' | 'asas-al-sharq' | 'wavesart' | 'bitweave';
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
  aspect: 'landscape' | 'portrait';
}

const MOTION_CLIENTS: MotionClientConfig[] = [
  {
    id: 'medianesta-1',
    brandNameEn: 'MEDIANESTA',
    brandNameAr: 'ميـــديانيستا',
    clientLabelEn: 'The platform',
    clientLabelAr: 'المنصة',
    clientDescEn: 'A Saudi freelancing marketplace connecting business owners with top creative & tech professionals.',
    clientDescAr: 'منصة سعودية للعمل الحر تربط أصحاب المشاريع بأفضل المحترفين في مختلف التخصصات.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Writing the motion graphics scripts, voiceover narration, and visual flow for platform onboarding videos.',
    roleDescAr: 'كتابة سكربتات الموشن جرافيك، ونص التعليق الصوتي، وتسلسل المشاهد التوضيحية للمنصة.',
    buttonEn: 'Watch the rest of the videos here',
    buttonAr: 'شاهد باقي الفيديوهات من هنا',
    socialUrl: 'https://medianesta.sa/help-center/how-it-works/professionals',
    aspect: 'landscape',
  },
  {
    id: 'medianesta-2',
    brandNameEn: 'MEDIANESTA',
    brandNameAr: 'ميـــديانيستا',
    clientLabelEn: 'The series',
    clientLabelAr: 'السلسلة',
    clientDescEn: 'Help Center walkthrough videos covering profit withdrawals, dual security, and dispute protection.',
    clientDescAr: 'فيديوهات إرشادية لمركز المساعدة تشرح سحب الأرباح، وأمان الحساب، وحفظ الحقوق وحل الخلافات.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Scriptwriting and clear instructional narration translating UI flows into reassuring motion stories.',
    roleDescAr: 'كتابة السكربتات وصياغة الشرح التفاعلي لخطوات المنصة بأسلوب واضح ومطمئن للمستخدم.',
    buttonEn: 'Watch the rest of the videos here',
    buttonAr: 'شاهد باقي الفيديوهات من هنا',
    socialUrl: 'https://medianesta.sa/help-center/how-it-works/professionals',
    aspect: 'landscape',
  },
  {
    id: 'worldhunter-motion',
    brandNameEn: 'WORLD HUNTER',
    brandNameAr: 'الصياد العالمي',
    clientLabelEn: 'The client',
    clientLabelAr: 'العميل',
    clientDescEn: 'A seafood restaurant chain in Saudi Arabia with three branches, run by Egyptian owners.',
    clientDescAr: 'سلسلة مطاعم متخصصة في الأسماك والمأكولات البحرية في السعودية، بثلاثة فروع، يملكها مصريون.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Writing promotional motion scripts, pricing hooks, and visual cues for high-converting offer reels.',
    roleDescAr: 'كتابة سكربتات الموشن الإعلانية، وصياغة العروض والخطافات البيعية، وتوجيه تسلسل المشاهد.',
    buttonEn: 'View the brand page',
    buttonAr: 'صفحة البراند',
    socialUrl: 'https://www.facebook.com/share/1EdwpD1Tt3/?mibextid=wwXIfr',
    aspect: 'portrait',
  },
  {
    id: 'asas-al-sharq',
    brandNameEn: 'ASAS AL-SHARQ',
    brandNameAr: 'أساس الشرق',
    clientLabelEn: 'The company',
    clientLabelAr: 'الشركة',
    clientDescEn: 'A senior management consultancy specializing in commercial and professional company formation in Saudi Arabia.',
    clientDescAr: 'شركة أساس الشرق للاستشارات الإدارية العليا المتخصصة في تأسيس الشركات التجارية والمهنية في السعودية.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Writing promotional and educational motion graphics scripts covering setup bundles, regulatory steps, and offers.',
    roleDescAr: 'كتابة سكربتات الموشن الإعلانية والتوعوية لباقات التأسيس التجاري والاقتصادي وإجراءات تأسيس الشركات المهنية.',
    buttonEn: 'View the company page',
    buttonAr: 'صفحة الشركة',
    socialUrl: 'https://www.facebook.com/share/1KWC4kdiij/?mibextid=wwXIfr',
    aspect: 'portrait',
  },
  {
    id: 'wavesart',
    brandNameEn: 'WAVES ART',
    brandNameAr: 'ويفز آرت',
    clientLabelEn: 'The gallery',
    clientLabelAr: 'المعرض',
    clientDescEn: 'A Saudi art gallery specializing in contemporary canvas wall art and interior decor pieces across the Kingdom.',
    clientDescAr: 'معرض سعودي متخصص في اللوحات الجدارية الفنية والديكورات العصرية في جميع أنحاء المملكة.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Writing seasonal promotional motion graphics and AI-assisted vertical video scripts focused on free shipping offers.',
    roleDescAr: 'كتابة سكربتات الموشن الترويجية وفيديو العروض بالذكاء الاصطناعي لتسويق حملات التوصيل المجاني.',
    buttonEn: 'View the gallery page',
    buttonAr: 'صفحة المعرض',
    socialUrl: 'https://www.instagram.com/wavesart.ksa?obrf=enY1dnlsbWc0bWQ3',
    aspect: 'portrait',
  },
  {
    id: 'bitweave',
    brandNameEn: 'BITWEAVE',
    brandNameAr: 'بـت ويـــف',
    clientLabelEn: 'The company',
    clientLabelAr: 'الشركة',
    clientDescEn: 'A digital marketing and software solutions agency operating since 2020 with headquarters in Egypt.',
    clientDescAr: 'شركة متخصصة في التسويق الرقمي والحلول البرمجية منذ 2020 ولها مقر رئيسي في مصر.',
    roleLabelEn: 'My role',
    roleLabelAr: 'دوري',
    roleDescEn: 'Wrote the complete corporate motion script from founding journey to core services and client trust.',
    roleDescAr: 'كتابة سكربت الفيديو التعريفي للشركة بالكامل من قصة التأسيس وحتى الخدمات ودعوة التواصل.',
    buttonEn: 'Visit website',
    buttonAr: 'زيارة الموقع',
    socialUrl: 'https://bitweave.io',
    aspect: 'landscape',
  },
];

export const MotionScriptsSection: React.FC<MotionScriptsSectionProps> = () => {
  const { data } = usePortfolio();

  const formatBrandTitleAr = (clientId: string, raw: string) => {
    if (clientId.startsWith('medianesta')) return 'ميديانيستا';
    if (clientId === 'bitweave') return 'بت ويف';
    return raw;
  };

  return (
    <>
      {/* ======================================================== */}
      {/* Section 03 Divider: MOTION SCRIPTS                       */}
      {/* ======================================================== */}
      <section
        id="motion-scripts"
        className="scroll-mt-20 py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip flex flex-col justify-center items-center"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center select-none cursor-default interactive-lockup">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-right" />
            <span className="text-[38px] sm:text-[48px] font-displayEn font-normal text-white tracking-[0.06em] leading-none block">
              03
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-white/25 divider-line origin-left" />
          </div>

          <h2
            className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear sm:whitespace-nowrap"
            style={{ fontSize: 'clamp(40px, calc(8.6 * var(--vw, 1vw)), 128px)' }}
          >
            MOTION SCRIPTS
          </h2>
          <p
            dir="rtl"
            className="font-amiri font-bold text-white leading-none text-center -mt-[0.26em] sm:-mt-[0.36em]"
            style={{
              fontSize: 'clamp(26px, calc(5.2 * var(--vw, 1vw)), 78px)',
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            سكربتات فيديوهات الموشن
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* Motion Script Showcases: Medianesta (x2), World Hunter, Asas Al-Sharq, Waves Art, Bitweave */}
      {/* ======================================================== */}
      {MOTION_CLIENTS.map((client) => {
        const clientScripts = data.videoScripts.filter((s) => s.clientId === client.id);
        const isSingleVideo = clientScripts.length === 1;
        const isMultiWordTitle =
          client.id === 'worldhunter-motion' ||
          client.id === 'asas-al-sharq' ||
          client.id === 'wavesart';

        return (
          <section
            key={client.id}
            className="py-10 sm:py-14 px-4 sm:px-8 lg:px-10 relative overflow-x-clip"
          >
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Top Header Row: Left stacked title + Right 2 top-lined info columns */}
              <div data-layout-grid className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-8 lg:mb-9">
                <div className="lg:col-span-4 w-fit max-w-full relative select-none text-left cursor-default interactive-lockup">
                  <h3
                    style={{
                      fontSize: isMultiWordTitle
                        ? 'clamp(36px, calc(5.2 * var(--vw, 1vw)), 74px)'
                        : 'clamp(44px, calc(6.8 * var(--vw, 1vw)), 94px)',
                    }}
                    className={`font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear ${
                      isMultiWordTitle ? 'sm:whitespace-nowrap' : ''
                    }`}
                  >
                    {client.brandNameEn}
                  </h3>
                  <p
                    dir="rtl"
                    style={{
                      fontSize: isMultiWordTitle
                        ? 'clamp(26px, calc(3.6 * var(--vw, 1vw)), 50px)'
                        : 'clamp(30px, calc(4.2 * var(--vw, 1vw)), 58px)',
                      textShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
                    }}
                    className={`font-amiri font-bold text-white leading-none text-center ${
                      isMultiWordTitle ? '-mt-[0.36em] sm:-mt-[0.46em]' : '-mt-[0.34em] sm:-mt-[0.42em]'
                    }`}
                  >
                    {formatBrandTitleAr(client.id, client.brandNameAr)}
                  </p>
                </div>

                {/* Right 2 Top-Lined Columns */}
                <div data-layout-grid className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                  <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                    <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                      <span className="font-body-plex font-bold text-white">{client.clientLabelEn}</span>
                      <span className="text-white/35">|</span>
                      <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                        {client.clientLabelAr}
                      </span>
                    </div>
                    <p className="font-body-plex text-[14.5px] sm:text-[15.5px] text-white/90 leading-[1.45] text-left">
                      {client.clientDescEn}
                    </p>
                    <p
                      dir="rtl"
                      className="font-body-plex text-[14.5px] sm:text-[15.5px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                    >
                      {client.clientDescAr}
                    </p>
                  </div>

                  <div className="border-t border-white/20 pt-3.5 px-2 sm:px-2.5 sm:-mx-2.5 pb-2.5 rounded-b-lg space-y-2 interactive-panel">
                    <div className="flex flex-wrap items-baseline gap-1.5 text-[15px]">
                      <span className="font-body-plex font-bold text-white">{client.roleLabelEn}</span>
                      <span className="text-white/35">|</span>
                      <span dir="rtl" className="font-body-plex font-normal text-[#9C9393]">
                        {client.roleLabelAr}
                      </span>
                    </div>
                    <p className="font-body-plex text-[14.5px] sm:text-[15.5px] text-white/90 leading-[1.45] text-left">
                      {client.roleDescEn}
                    </p>
                    <p
                      dir="rtl"
                      className="font-body-plex text-[14.5px] sm:text-[15.5px] text-[#E9DEDE]/85 leading-[1.6] text-right"
                    >
                      {client.roleDescAr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instruction line above videos */}
              <p className="font-body-plex text-[14.5px] sm:text-[15.5px] text-white/85 mb-6 text-left">
                Press play on any video <span className="text-white/40">|</span>{' '}
                <span className="text-[#E9DEDE]/85">اضغط للتشغيل</span>
              </p>

              {/* Video Players Grid: responsive 1 -> 2 -> 3 columns or centered large 16:9 showcase */}
              <div
                className={
                  isSingleVideo
                    ? 'max-w-3xl mx-auto w-full'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9'
                }
              >
                {clientScripts.map((script) => (
                  <div
                    key={script.id}
                    className={`flex flex-col group/vid ${
                      client.aspect === 'portrait' ? 'max-w-[330px] sm:max-w-none mx-auto sm:mx-0 w-full' : 'w-full'
                    }`}
                  >
                    <div
                      className={`touch-card relative ${
                        client.aspect === 'landscape' ? 'aspect-video' : 'aspect-[9/16]'
                      } rounded-[4px] overflow-hidden bg-black shadow-lg ring-1 ring-white/10 group-hover/vid:ring-[#b81d33]/80 group-active/vid:ring-[#dc2626] group-hover/vid:-translate-y-1.5 group-active/vid:-translate-y-1.5 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                    >
                      {script.videoSrc ? (
                        <LazyVideoPlayer
                          src={script.videoSrc}
                          poster={script.posterImg}
                          ariaLabel={script.titleAr}
                          objectFit="contain"
                        />
                      ) : null}
                    </div>

                    {/* Centered index & duration */}
                    <div className="mt-3.5 flex items-center justify-center gap-2.5">
                      <span className="font-displayEn font-normal text-[23px] sm:text-[25px] leading-none text-white tracking-wide">
                        {script.videoNum}
                      </span>
                      <span className="font-body-plex text-[14px] text-white/60 leading-none">
                        {script.duration}
                      </span>
                    </div>

                    {script.aiGenerated && (
                      <p className="mt-1.5 text-center font-body-plex text-[12px] sm:text-[12.5px] text-white/55 tracking-wide">
                        <span>Made with AI</span>
                        <span className="text-white/30 mx-1.5">|</span>
                        <span dir="rtl">تم عمله بالـ AI</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom-Right Clean Pill Outline CTA Button */}
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
