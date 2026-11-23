import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Menu, MessageCircle, X } from 'lucide-react';
import { scrollToSectionId } from '../hooks/useDesktopScale';
import { useScrollProgressAndActiveSection } from '../hooks/useScrollAnimations';

interface NavbarProps {
  onOpenInquiry?: (defaultService?: string) => void;
  showBackToTop?: boolean;
}

const NAV_SECTION_IDS = [
  'hero',
  'about',
  'services',
  'clients',
  'selected-work',
  'social-media-content',
  'scripts',
  'motion-scripts',
  'company-profile',
  'content-strategy',
  'marketing-plan',
  'contact',
];

export const Navbar: React.FC<NavbarProps> = ({ showBackToTop = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const navScopeRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useScrollProgressAndActiveSection(NAV_SECTION_IDS, 1, progressBarRef, navScopeRef);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      if (navScopeRef.current && !navScopeRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#about', id: 'about', en: 'ABOUT', ar: 'عنّـي' },
    { href: '#services', id: 'services', en: 'SERVICES', ar: 'الخدمات' },
    { href: '#clients', id: 'clients', en: 'CLIENTS', ar: 'عملائي' },
    { href: '#selected-work', id: 'selected-work', en: 'WORK', ar: 'نماذج أعمالي' },
    { href: '#social-media-content', id: 'social-media-content', en: 'SOCIAL', ar: 'سوشيال ميديا' },
    { href: '#scripts', id: 'scripts', en: 'SCRIPTS', ar: 'السكربتات' },
    { href: '#motion-scripts', id: 'motion-scripts', en: 'MOTION SCRIPTS', ar: 'سكربتات الموشن' },
    { href: '#company-profile', id: 'company-profile', en: 'COMPANY PROFILE', ar: 'الملف التعريفي' },
    { href: '#content-strategy', id: 'content-strategy', en: 'STRATEGY', ar: 'استراتيجية' },
    { href: '#marketing-plan', id: 'marketing-plan', en: 'PLANS', ar: 'خطط تسويقية' },
    { href: '#contact', id: 'contact', en: 'CONTACT', ar: 'تواصل' },
  ];

  // Compact uncrowded quick-jump links on mobile (safe at 320px)
  const mobileQuickLinks = [
    { href: '#services', id: 'services', en: 'SERVICES', ar: 'الخدمات' },
    { href: '#selected-work', id: 'selected-work', en: 'WORK', ar: 'أعمالي' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSectionId(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none"
      id="navbar"
    >
      <div ref={navScopeRef} className="pointer-events-auto w-full px-1.5 sm:px-6 py-1.5 sm:py-3">
        {/* Main Floating Glass Pill */}
        <div className="relative overflow-hidden max-w-7xl mx-auto flex xl:grid xl:grid-cols-[auto_1fr_auto] items-center justify-between gap-1 sm:gap-3 glass-nav px-1.5 sm:px-5 py-1.5 lg:py-2 rounded-full shadow-lg">
          {/* Mobile/Tablet Left: Drawer Toggle */}
          <div className="flex xl:hidden items-center shrink-0">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu | إغلاق القائمة' : 'Open navigation menu | فتح القائمة'}
              className="min-w-[38px] min-h-[38px] px-2 sm:px-3 rounded-full inline-flex items-center justify-center gap-1 text-[#F5F2F1] hover:text-white hover:bg-white/[0.08] active:scale-95 transition-[background-color,color,transform] duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span className="text-[10.5px] sm:text-[11px] font-body-plex font-semibold tracking-wider uppercase">
                MENU
              </span>
            </button>
          </div>

          {/* Mobile/Tablet Center Quick-Jump Links: Services + Work (clean & uncrowded at 320px) */}
          <nav
            aria-label="Quick section links"
            className="flex xl:hidden items-center justify-center gap-0.5 sm:gap-3 min-w-0"
          >
            {mobileQuickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-nav-id={link.id}
                data-active="false"
                onClick={(e) => handleNavClick(e, link.href)}
                className="min-h-[38px] px-1.5 sm:px-3 rounded-full inline-flex items-center justify-center text-[10.5px] sm:text-xs font-body-plex font-semibold tracking-[0.04em] text-[#E9DEDE] hover:text-white hover:bg-white/[0.06] data-[active=true]:text-white data-[active=true]:bg-[#68101C]/55 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white"
              >
                {link.en}
              </a>
            ))}
          </nav>

          {/* Desktop Left Spacer */}
          <div className="hidden xl:block w-8" aria-hidden="true" />

          {/* Desktop Navigation Links - Centered Inline */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center justify-center gap-3.5 text-[#E9DEDE] justify-self-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-nav-id={link.id}
                data-active="false"
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative flex items-center group py-1.5 text-center whitespace-nowrap shrink-0 active:scale-95 transition-transform duration-300 ease-out focus-visible:outline-2 focus-visible:outline-white rounded"
              >
                <span className="text-[11px] font-body-plex font-semibold tracking-[0.05em] transition-colors duration-300 whitespace-nowrap text-[#E9DEDE]/90 group-hover:text-white group-active:text-white group-data-[active=true]:text-white">
                  {link.en}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 inset-x-0.5 h-[1.5px] bg-[#dc2626] rounded-full transition-[transform,opacity] duration-300 ease-out origin-center opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 group-data-[active=true]:opacity-100 group-data-[active=true]:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Right Action: Mobile Docked Back-to-Top (non-overlapping) + Direct Contact CTA */}
          <div className="flex items-center gap-1 sm:gap-2 justify-self-end shrink-0">
            {showBackToTop && (
              <button
                id="mobile-back-to-top"
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top | العودة للأعلى"
                title="Back to top | العودة للأعلى"
                className="xl:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#160409]/95 hover:bg-[#68101C] text-[#F5F2F1] hover:text-white border border-[#8A1526]/70 inline-flex items-center justify-center transition-colors duration-200 active:scale-95 cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-white"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
            <a
              href="#contact"
              data-nav-id="contact"
              data-active="false"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="interactive-btn inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 min-h-[38px] sm:min-h-[36px] py-1.5 rounded-full text-[10.5px] sm:text-xs font-bold bg-[#dc2626] hover:bg-[#b91c1c] text-white border border-[#ef4444]/60 shadow-md cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white"
            >
              <MessageCircle className="hidden min-[360px]:inline-block w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">CONTACT</span>
              <span className="hidden sm:inline">GET IN TOUCH</span>
            </a>
          </div>

          {/* Scroll Progress Indicator Bar */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-4 sm:inset-x-5 h-[2px] bg-white/[0.05] rounded-full overflow-hidden pointer-events-none"
          >
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-[#8A1526] via-[#dc2626] to-[#f87171] origin-left transition-transform duration-100 ease-out"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        {/* Mobile/Tablet Slide-Down Navigation Drawer (All 11 Sections Preserved in EN & AR, incl. Motion Scripts & Company Profile) */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="xl:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-nav border border-[#8A1526]/45 shadow-2xl p-2.5 modal-panel-enter max-h-[72dvh] overflow-y-auto"
          >
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-nav-id={link.id}
                  data-active="false"
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group min-h-[46px] px-4 py-2.5 rounded-xl flex items-center justify-between gap-3 bg-white/[0.03] hover:bg-[#8A1526]/25 active:bg-[#8A1526]/35 border border-white/[0.08] data-[active=true]:border-[#dc2626]/70 data-[active=true]:bg-[#68101C]/45 transition-[background-color,border-color] duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span className="font-body-plex text-xs font-bold tracking-[0.06em] text-white uppercase">
                    {link.en}
                  </span>
                  <span dir="rtl" className="font-body-plex text-[15px] text-[#E9DEDE] group-data-[active=true]:text-white">
                    {link.ar}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
