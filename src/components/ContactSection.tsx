import React from 'react';
import {
  Mail,
  ArrowUp,
  ExternalLink,
  MessageCircle,
  Send,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SocialLinkItem } from '../utils/portfolioData';

interface ContactSectionProps {
  onOpenInquiry?: (serviceName?: string) => void;
}

const SocialIcon: React.FC<{ platform: SocialLinkItem['platform'] }> = ({ platform }) => {
  switch (platform) {
    case 'whatsapp':
      return <MessageCircle className="w-4 h-4 text-[#E86677]" />;
    case 'x':
      return (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          className="w-4 h-4 text-[#E86677]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-4 h-4 text-[#E86677]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
        </svg>
      );
    default:
      return <ExternalLink className="w-4 h-4 text-[#E86677]" />;
  }
};

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiry }) => {
  const { data } = usePortfolio();

  const whatsappItem = data.contact.socialLinks.find((s) => s.platform === 'whatsapp');
  const otherSocialLinks = data.contact.socialLinks.filter((s) => s.platform !== 'whatsapp');
  const whatsappNumber = whatsappItem?.handle || '01207845340';
  const whatsappHref = whatsappItem?.url || 'https://wa.me/201207845340';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const normalizeExternalUrl = (rawUrl: string): string => {
    const trimmed = rawUrl.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  return (
    <footer id="contact" className="pt-12 sm:pt-16 pb-24 lg:pb-10 px-4 sm:px-6 relative overflow-x-clip">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Stacked Editorial Bilingual Closing Lockup */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex flex-col items-center cursor-default select-none interactive-lockup max-w-full">
            <h2 className="font-displayEn font-normal uppercase tracking-[0.03em] leading-[0.94] text-heading-linear text-[42px] sm:text-[58px] lg:text-[70px]">
              Thank you for being here
            </h2>
            <p className="font-body-plex text-[16px] sm:text-[17px] text-[#E9DEDE] mt-2 tracking-[0.02em] leading-[1.6]">
              Let&apos;s turn this ending into the beginning of a new collaboration.
            </p>
            <div dir="rtl" className="mt-4 space-y-1">
              <p className="font-amiri font-bold text-[28px] sm:text-[34px] lg:text-[38px] text-white leading-tight">
                شكرًا لوجودكم هنا،
              </p>
              <p className="font-body-plex text-[16px] text-[#E9DEDE] leading-[1.65]">
                لنجعل من هذه النهاية بداية لتعاون جديد.
              </p>
            </div>
          </div>
        </div>

        {/* Social & Direct Channels Header Row */}
        <div className="mb-10">
          <div data-social-header className="flex flex-wrap items-center justify-between gap-2 mb-4 px-1">
            <span className="font-body-plex text-[11px] uppercase tracking-[0.18em] text-[#BDB5B5]">
              SOCIAL &amp; DIRECT CHANNELS
            </span>
            <span dir="rtl" className="font-body-plex text-[13px] font-semibold text-[#E9DEDE]">
              حسابات التواصل والبريد
            </span>
          </div>

          {/* Uniform Card Row: 2-col on mobile (with full-width Email card), 3-col sm, 5-col lg */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Card 1: WhatsApp */}
            <div className="touch-card group bg-[#110407]/90 border border-[#8A1526]/35 hover:border-[#b81d33]/80 active:border-[#dc2626] hover:-translate-y-1.5 active:-translate-y-1.5 rounded-2xl p-4 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between min-h-[126px] sm:min-h-[148px]">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between h-full gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#27070f] border border-[#8A1526]/45 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#E86677]" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#BDB5B5] group-hover:text-white transition-colors duration-300 ease-out" />
                </div>

                <div className="text-center space-y-2 pb-1">
                  <p className="font-body-plex text-[14px] font-bold text-white leading-tight">
                    WhatsApp
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-body-plex text-[#BDB5B5] tabular-nums">
                      <MessageCircle className="w-3.5 h-3.5 text-[#E86677] shrink-0" />
                      <span>{whatsappNumber}</span>
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Cards 2, 3, 4: X, Instagram, Facebook */}
            {otherSocialLinks.map((soc) => {
              const safeHref = normalizeExternalUrl(soc.url);
              const cardInner = (
                <div className="flex flex-col justify-between h-full gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#27070f] border border-[#8A1526]/45 flex items-center justify-center shrink-0">
                      <SocialIcon platform={soc.platform} />
                    </div>
                    <ExternalLink
                      className={`w-3.5 h-3.5 transition-colors duration-300 ease-out ${
                        safeHref
                          ? 'text-[#BDB5B5] group-hover:text-white'
                          : 'text-white/25 group-hover:text-[#E86677]'
                      }`}
                    />
                  </div>

                  <div className="text-center space-y-1.5 pb-1">
                    <p className="font-body-plex text-[14px] font-bold text-white leading-tight">
                      {soc.labelEn}
                    </p>
                    <p
                      dir="ltr"
                      className="font-body-plex text-[11.5px] text-[#BDB5B5] truncate tabular-nums text-center"
                    >
                      {soc.handle}
                    </p>
                  </div>
                </div>
              );

              return (
                <div
                  key={soc.id}
                  className="touch-card group bg-[#110407]/90 border border-[#8A1526]/35 hover:border-[#b81d33]/80 active:border-[#dc2626] hover:-translate-y-1.5 active:-translate-y-1.5 rounded-2xl p-4 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between min-h-[126px] sm:min-h-[148px]"
                >
                  {safeHref ? (
                    <a
                      href={safeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {cardInner}
                    </a>
                  ) : (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onOpenInquiry?.(`${soc.labelAr} — ${soc.labelEn}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenInquiry?.(`${soc.labelAr} — ${soc.labelEn}`);
                        }
                      }}
                      className="cursor-pointer h-full"
                    >
                      {cardInner}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Card 5: Email */}
            <div className="col-span-2 sm:col-span-1 touch-card group bg-[#110407]/90 border border-[#8A1526]/35 hover:border-[#b81d33]/80 active:border-[#dc2626] hover:-translate-y-1.5 active:-translate-y-1.5 rounded-2xl p-4 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between min-h-[120px] sm:min-h-[148px]">
              <a
                href={`mailto:${data.contact.email}`}
                className="flex flex-col justify-between h-full gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#27070f] border border-[#8A1526]/45 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#E86677]" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#BDB5B5] group-hover:text-white transition-colors duration-300 ease-out" />
                </div>

                <div className="text-center space-y-1.5 pb-1">
                  <p className="font-body-plex text-[14px] font-bold text-white leading-tight">
                    Email
                  </p>
                  <p
                    dir="ltr"
                    className="font-body-plex text-[12px] sm:text-[11.5px] text-[#BDB5B5] truncate text-center"
                  >
                    {data.contact.email}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Centered Crimson Pill Service Request CTA */}
          {onOpenInquiry && (
            <div data-footer-cta className="mt-9 flex justify-center">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="interactive-btn inline-flex items-center justify-center gap-2.5 px-8 py-3 min-h-[44px] rounded-full bg-[#8A1526] hover:bg-[#a61b30] text-white text-xs sm:text-xs font-body-plex font-semibold shadow-[0_8px_24px_-4px_rgba(184,29,51,0.5)] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span dir="rtl">طلب خدمة</span>
              </button>
            </div>
          )}
        </div>

        {/* Clean Borderless Sign-Off & Footer Bar */}
        <div data-footer-bar className="pt-10 sm:pt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <span className="font-displayEn text-[22px] text-white tracking-wider sm:whitespace-nowrap">
              {data.contact.signOffEn}
            </span>
            <span className="text-white/25" aria-hidden="true">
              •
            </span>
            <span
              dir="rtl"
              className="font-amiri text-[20px] text-[#E9DEDE] sm:whitespace-nowrap"
            >
              {data.contact.signOffAr}
            </span>
          </div>

          <p className="font-body-plex text-[11px] uppercase tracking-[0.18em] text-[#BDB5B5]/80 text-center sm:whitespace-nowrap">
            {data.contact.signOffRole}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="min-h-[44px] px-4 py-2 rounded-full inline-flex items-center justify-center gap-1.5 text-[12px] sm:text-[11.5px] font-body-plex font-medium text-[#BDB5B5] hover:text-white transition-colors duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#E86677]" />
            <span>Back to Top • للأعلى</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
