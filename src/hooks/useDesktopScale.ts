import { useState, useEffect } from 'react';

export const DESKTOP_STAGE_WIDTH = 1280;

export function useDesktopScale(): number {
  const [scale, setScale] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth || document.documentElement.clientWidth || DESKTOP_STAGE_WIDTH;
    return w > 0 && w < DESKTOP_STAGE_WIDTH ? w / DESKTOP_STAGE_WIDTH : 1;
  });

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth || document.documentElement.clientWidth || DESKTOP_STAGE_WIDTH;
      const next = w > 0 && w < DESKTOP_STAGE_WIDTH ? w / DESKTOP_STAGE_WIDTH : 1;
      setScale((prev) => (Math.abs(prev - next) > 0.0005 ? next : prev));
    };

    updateScale();
    window.addEventListener('resize', updateScale, { passive: true });
    window.addEventListener('orientationchange', updateScale, { passive: true });
    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
    };
  }, []);

  return scale;
}

export function scrollToSectionId(targetId: string, scale = 1) {
  const cleanId = targetId.replace(/^#/, '');
  const el = document.getElementById(cleanId);
  if (!el) return;
  const offset = Math.round(78 * scale);
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
