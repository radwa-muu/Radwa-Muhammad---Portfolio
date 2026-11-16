import React, { useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { DESKTOP_STAGE_WIDTH, scrollToSectionId } from '../hooks/useDesktopScale';
import { useScrollProgressAndActiveSection } from '../hooks/useScrollAnimations';

interface NavbarProps {
  onOpenInquiry?: (defaultService?: string) => void;
  scale?: number;
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

export const Navbar: React.FC<NavbarProps> = ({ scale = 1 }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);

  useScrollProgressAndActiveSection(NAV_SECTION_IDS, scale, progressBarRef, navContainerRef);

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

  const isScaled = scale < 1;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSectionId(href, scale);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 pointer-events-none"
      id="navbar"
    >
      <div
        className="pointer-events-auto px-6 py-3"
        style={
          isScaled
            ? {
                width: `${DESKTOP_STAGE_WIDTH}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }
            : { width: '100%' }
        }
      >
        <div className="relative overflow-hidden max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-4 glass-nav px-6 py-2.5 rounded-full shadow-lg">
          <div aria-hidden="true" />

          {/* Desktop Navigation Links - Centered & Single-Line across all devices */}
          <nav
            ref={navContainerRef}
            className="flex items-center justify-center gap-4 text-[#BDB5B5] justify-self-center"
          >
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
              className="interactive-btn inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#dc2626] hover:bg-[#b91c1c] text-white border border-[#ef4444]/60 shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>GET IN TOUCH</span>
            </a>
          </div>

          {/* Scroll Progress Indicator Bar */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-5 h-[2px] bg-white/[0.05] rounded-full overflow-hidden pointer-events-none"
          >
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-[#8A1526] via-[#dc2626] to-[#f87171] origin-left transition-transform duration-100 ease-out"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
