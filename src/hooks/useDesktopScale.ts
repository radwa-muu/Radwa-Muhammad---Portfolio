import { useEffect, useState } from 'react';

export const DESKTOP_STAGE_WIDTH = 1280;
export const MOBILE_VIEW_BREAKPOINT = 1024;

export type ViewMode = 'mobile' | 'desktop';

export interface ViewportScaleState {
  scale: number;
  viewportWidth: number;
  isMobileScreen: boolean;
  isDesktopView: boolean;
}

/**
 * Computes responsive viewport mode & zoom scale dynamically on resize/orientation changes.
 * - Default `'mobile'` renders native responsive layout (`scale = 1`).
 * - `'desktop'` on screens narrower than 1024px scales the full 1280px horizontal desktop layout
 *   proportionally to fit the screen cleanly (`scale = viewportWidth / 1280`) with zero page reload.
 */
export function useDesktopScale(viewMode: ViewMode = 'mobile'): ViewportScaleState {
  const getViewportWidth = () =>
    typeof window !== 'undefined' ? document.documentElement.clientWidth || window.innerWidth : 1280;

  const [viewportWidth, setViewportWidth] = useState<number>(getViewportWidth);

  useEffect(() => {
    const syncWidth = () => {
      setViewportWidth(getViewportWidth());
    };

    syncWidth();
    window.addEventListener('resize', syncWidth, { passive: true });
    window.addEventListener('orientationchange', syncWidth, { passive: true });

    return () => {
      window.removeEventListener('resize', syncWidth);
      window.removeEventListener('orientationchange', syncWidth);
    };
  }, []);

  const isMobileScreen = viewportWidth < MOBILE_VIEW_BREAKPOINT;
  const isDesktopView = isMobileScreen && viewMode === 'desktop';
  const scale = isDesktopView ? Math.min(1, viewportWidth / DESKTOP_STAGE_WIDTH) : 1;

  return {
    scale,
    viewportWidth,
    isMobileScreen,
    isDesktopView,
  };
}

export function scrollToSectionId(targetId: string, scale = 1) {
  const cleanId = targetId.replace(/^#/, '');
  const el = document.getElementById(cleanId);
  if (!el) return;

  const navbarEl = document.getElementById('navbar');
  const navHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 74 * scale;
  const minOffset = scale < 1 ? Math.round(64 * scale) : 64;
  const buffer = scale < 1 ? 4 : 8;
  const offset = Math.max(minOffset, Math.round(navHeight + buffer));
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
