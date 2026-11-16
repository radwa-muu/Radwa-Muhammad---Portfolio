import React, { useEffect, useRef } from 'react';

/**
 * Interactive GPU spotlight layer:
 * - On desktop (mouse/pen): tracks cursor smoothly with 0% idle CPU.
 * - On mobile/touch: stays opacity-0 during scrolling (zero scroll GPU cost!),
 *   and smoothly blooms a warm crimson glow right under the user's touch/tap.
 */
export const InteractiveBackground: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const spotlight = spotlightRef.current;
    if (!spotlight || prefersReduced) return;

    const hasFinePointer =
      window.matchMedia && window.matchMedia('(any-pointer: fine)').matches;

    let targetX = (window.innerWidth || 1280) * 0.5;
    let targetY = (window.innerHeight || 800) * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;
    let isRunning = false;
    let touchHideTimer = 0;

    const updateTransform = () => {
      const rx = Math.round((currentX - 280) * 10) / 10;
      const ry = Math.round((currentY - 280) * 10) / 10;
      spotlight.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    };

    const tick = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        currentX = targetX;
        currentY = targetY;
        updateTransform();
        isRunning = false;
        return;
      }
      currentX += dx * 0.075;
      currentY += dy * 0.075;
      updateTransform();
      rafId = window.requestAnimationFrame(tick);
    };

    const showTouchGlowAt = (x: number, y: number, durationMs = 420) => {
      targetX = x;
      targetY = y;
      currentX = x;
      currentY = y;
      updateTransform();
      spotlight.style.opacity = '0.9';
      if (touchHideTimer) window.clearTimeout(touchHideTimer);
      touchHideTimer = window.setTimeout(() => {
        spotlight.style.opacity = '0';
      }, durationMs);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        targetX = e.clientX;
        targetY = e.clientY;
        spotlight.style.opacity = '1';
        if (!isRunning) {
          isRunning = true;
          rafId = window.requestAnimationFrame(tick);
        }
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        showTouchGlowAt(e.clientX, e.clientY, 460);
      }
    };

    const handlePointerUpOrCancel = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        if (touchHideTimer) window.clearTimeout(touchHideTimer);
        touchHideTimer = window.setTimeout(() => {
          spotlight.style.opacity = '0';
        }, 260);
      }
    };

    const handleScroll = () => {
      // Immediately hide transient touch glow during scroll so zero GPU blending runs while scrolling
      if (!hasFinePointer && spotlight.style.opacity !== '0') {
        spotlight.style.opacity = '0';
      }
    };

    if (hasFinePointer) {
      updateTransform();
      spotlight.style.opacity = '1';
    } else {
      spotlight.style.opacity = '0';
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUpOrCancel, { passive: true });
    window.addEventListener('pointercancel', handlePointerUpOrCancel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (touchHideTimer) window.clearTimeout(touchHideTimer);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUpOrCancel);
      window.removeEventListener('pointercancel', handlePointerUpOrCancel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Interactive crimson spotlight (tracks mouse on desktop; illuminates taps on mobile, 0% cost while scrolling) */}
      <div
        ref={spotlightRef}
        className="spotlight-glow absolute top-0 left-0 w-[560px] h-[560px] transition-opacity duration-700 ease-out"
        style={{
          opacity: 0,
          background:
            'radial-gradient(circle, rgba(184, 24, 48, 0.22) 0%, rgba(104, 16, 28, 0.09) 42%, transparent 70%)',
          transform: 'translate3d(160px, 60px, 0)',
        }}
      />
    </div>
  );
};
