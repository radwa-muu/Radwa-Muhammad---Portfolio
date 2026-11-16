import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { ViewMode } from '../hooks/useDesktopScale';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onChangeMode: (mode: ViewMode) => void;
  hidden?: boolean;
}

/**
 * Floating mobile-only view-mode switcher allowing instant, smooth 1-tap switching
 * between Responsive Mobile View (default) and full Desktop View (zoom-out viewport scale).
 * Rendered outside #portfolio-desktop-scope so touch ergonomics remain crisp 1:1 regardless of view mode.
 */
export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onChangeMode,
  hidden = false,
}) => {
  return (
    <div
      id="view-mode-toggle"
      dir="rtl"
      role="group"
      aria-label="تبديل وضع العرض بين الموبايل وسطح المكتب"
      className={`fixed bottom-3.5 left-1/2 -translate-x-1/2 z-40 lg:hidden transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="flex items-center gap-1 p-1 rounded-full bg-[#0d0306]/95 border border-[#8A1526]/70 shadow-[0_12px_32px_rgba(0,0,0,0.88),0_0_20px_rgba(138,21,38,0.28)]">
        <button
          type="button"
          onClick={() => onChangeMode('mobile')}
          aria-pressed={viewMode === 'mobile'}
          className={`min-h-[36px] px-3 sm:px-3.5 rounded-full inline-flex items-center justify-center gap-1.5 text-[11.5px] sm:text-xs font-body-plex font-semibold whitespace-nowrap shrink-0 transition-[background-color,color,transform,box-shadow] duration-250 ease-out cursor-pointer active:scale-95 ${
            viewMode === 'mobile'
              ? 'bg-[#8A1526] text-white border border-[#ef4444]/45 shadow-[0_2px_12px_rgba(220,38,38,0.35)]'
              : 'text-[#BDB5B5] hover:text-white border border-transparent'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>عرض الموبايل</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeMode('desktop')}
          aria-pressed={viewMode === 'desktop'}
          className={`min-h-[36px] px-3 sm:px-3.5 rounded-full inline-flex items-center justify-center gap-1.5 text-[11.5px] sm:text-xs font-body-plex font-semibold whitespace-nowrap shrink-0 transition-[background-color,color,transform,box-shadow] duration-250 ease-out cursor-pointer active:scale-95 ${
            viewMode === 'desktop'
              ? 'bg-[#8A1526] text-white border border-[#ef4444]/45 shadow-[0_2px_12px_rgba(220,38,38,0.35)]'
              : 'text-[#BDB5B5] hover:text-white border border-transparent'
          }`}
        >
          <Monitor className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>عرض سطح المكتب</span>
        </button>
      </div>
    </div>
  );
};
