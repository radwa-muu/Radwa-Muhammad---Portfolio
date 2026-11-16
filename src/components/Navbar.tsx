import React, { useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { DESKTOP_STAGE_WIDTH, scrollToSectionId } from '../hooks/useDesktopScale';
import { useScrollProgressAndActiveSection } from '../hooks/useScrollAnimations';

interface NavbarProps {
  onOpenInquiry?: (defaultService?: string) => void;
  scale?: number;
  isDesktopView?: boolean;
}

const NAV_SECTION_IDS = [
  'hero',
  'about',
  'services',
  'clients',
  'selected-work',
  'social-media-content',
  'scripts',
  'content-strategy',
  'marketing-plan',
  'contact',
];

export const Navbar: React.FC<NavbarProps> = ({ scale = 1, isDesktopView = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const navScopeRef = useRef<HTMLDivElement>(null);

  useScrollProgressAndActiveSection(NAV_SECTION_IDS, scale, progressBarRef, navScopeRef);

  useEffect(() => {
    if (isDesktopView && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isDesktopView, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#about', id: 'about', en: 'ABOUT', ar: 'عنّـي' },
    { href: '#services', id: 'services', en: 'SERVICES', ar: 'الخدمات' },
    { href: '#clients', id: 'clients', en: 'CLIENTS', ar: 'عملائي' },
    { href: '#selected-work', id: 'selected-work', en: 'WORK', ar: 'نماذج أعمالي' },
    { href: '#social-media-content', id: 'social-media-content', en: 'SOCIAL', ar: 'سوشيال ميديا' },
    { href: '#scripts', id: 'scripts', en: 'SCRIPTS', ar: 'السكربتات' },
    { href: '#content-strategy', id: 'content-strategy', en: 'STRATEGY', ar: 'استراتيجية' },
    { href: '#marketing-plan', id: 'marketing-plan', en: 'PLANS', ar: 'خطط تسويقية' },
    { href: '#contact', id: 'contact', en: 'CONTACT', ar: 'تواصل' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSectionId(href, scale);
  };

  return (
    <header
      className="fixed top-0 left-0 z-50 pointer-events-none origin-top-left transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      id="navbar"
      style={
        isDesktopView
          ? {
              width: `${DESKTOP_STAGE_WIDTH}px`,
              transform: `scale(${scale})`,
            }
          : {
              width: '100%',
              transform: 'scale(1)',
            }
      }
    >
      <div ref={navScopeRef} className="pointer-events-auto w-full px-3 sm:px-6 py-1.5 sm:py-3">
        {/* Main Floating Glass Pill */}
        <div className="relative overflow-hidden max-w-7xl mx-auto flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-between gap-2 sm:gap-4 glass-nav px-3 sm:px-6 py-1.5 lg:py-2.5 rounded-full shadow-lg">
          {/* Mobile Left: Drawer Toggle + Brand Initials */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu | إغلاق القائمة' : 'Open navigation menu | فتح القائمة'}
              className="min-w-[40px] min-h-[40px] px-2.5 rounded-full inline-flex items-center justify-center gap-1.5 text-stone-200 hover:text-white hover:bg-white/[0.06] active:scale-95 transition-[background-color,color,transform] duration-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-[11px] font-body-plex font-semibold tracking-wider uppercase">
                MENU
              </span>
            </button>
          </div>

          {/* Desktop Left Spacer (preserves centered nav balance on >= lg) */}
          <div className="hidden lg:block" aria-hidden="true" />

          {/* Desktop Navigation Links - Centered Inline */}
          <nav className="hidden lg:flex items-center justify-center gap-4 text-[#BDB5B5] justify-self-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-nav-id={link.id}
                data-active="false"
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative flex items-center group py-1.5 text-center whitespace-nowrap shrink-0 active:scale-95 transition-transform duration-300 ease-out"
              >
                <span className="text-[11px] font-body-plex font-semibold tracking-[0.06em] transition-colors duration-300 whitespace-nowrap text-stone-300 group-hover:text-white group-active:text-white group-data-[active=true]:text-white">
                  {link.en}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 inset-x-1 h-[1.5px] bg-[#dc2626] rounded-full transition-[transform,opacity] duration-300 ease-out origin-center opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 group-data-[active=true]:opacity-100 group-data-[active=true]:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Right Action: Direct Contact CTA */}
          <div className="flex items-center gap-2 justify-self-end shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="interactive-btn inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 min-h-[38px] sm:min-h-[36px] py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#dc2626] hover:bg-[#b91c1c] text-white border border-[#ef4444]/60 shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>GET IN TOUCH</span>
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

        {/* Mobile/Tablet Slide-Down Navigation Drawer (All 9 Sections Preserved in EN & AR) */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-nav border border-[#8A1526]/45 shadow-2xl p-2.5 modal-panel-enter max-h-[75dvh] overflow-y-auto"
          >
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-nav-id={link.id}
                  data-active="false"
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group min-h-[46px] px-4 py-2.5 rounded-xl flex items-center justify-between gap-3 bg-white/[0.02] hover:bg-[#8A1526]/20 active:bg-[#8A1526]/30 border border-white/[0.05] data-[active=true]:border-[#dc2626]/70 data-[active=true]:bg-[#68101C]/45 transition-[background-color,border-color] duration-200 cursor-pointer"
                >
                  <span className="font-body-plex text-xs font-bold tracking-[0.08em] text-white uppercase">
                    {link.en}
                  </span>
                  <span dir="rtl" className="font-body-plex text-sm text-[#E9DEDE]/90 group-data-[active=true]:text-white">
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
