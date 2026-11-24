import React, { useEffect, useRef } from 'react';

/**
 * Interactive GPU spotlight layer:
 * - On desktop (mouse/pen): tracks cursor smoothly with 0% idle CPU.
 * - On mobile/touch: becomes visible and smoothly follows the finger across
 *   touchstart/touchmove and touch pointer events without blocking scroll,
 *   then fades out gently when lifted.
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
    let isTouching = false;
    let hasTouchEvents = false;

    const clearTouchHideTimer = () => {
      if (touchHideTimer) {
        window.clearTimeout(touchHideTimer);
        touchHideTimer = 0;
      }
    };

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

    const ensureTickRunning = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const followTouchAt = (x: number, y: number, snapIfHidden: boolean) => {
      clearTouchHideTimer();
      targetX = x;
      targetY = y;
      if (snapIfHidden) {
        currentX = x;
        currentY = y;
        updateTransform();
      }
      spotlight.style.opacity = '1';
      ensureTickRunning();
    };

    const scheduleTouchFadeOut = () => {
      isTouching = false;
      clearTouchHideTimer();
      touchHideTimer = window.setTimeout(() => {
        spotlight.style.opacity = '0';
        touchHideTimer = 0;
      }, 160);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        clearTouchHideTimer();
        targetX = e.clientX;
        targetY = e.clientY;
        spotlight.style.opacity = '1';
        ensureTickRunning();
      } else if (e.pointerType === 'touch') {
        const wasHidden = !isTouching && spotlight.style.opacity === '0';
        isTouching = true;
        followTouchAt(e.clientX, e.clientY, wasHidden);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        const wasHidden = !isTouching && spotlight.style.opacity === '0';
        isTouching = true;
        followTouchAt(e.clientX, e.clientY, wasHidden);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        scheduleTouchFadeOut();
      }
    };

    const handlePointerCancel = (e: PointerEvent) => {
      // During native touch scrolling, browsers fire pointercancel while touchmove keeps firing;
      // only fade here if touch events are unavailable (otherwise touchend/touchcancel handles lift).
      if (e.pointerType === 'touch' && !hasTouchEvents) {
        scheduleTouchFadeOut();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      hasTouchEvents = true;
      const touch = e.touches[0];
      if (!touch) return;
      const wasHidden = !isTouching && spotlight.style.opacity === '0';
      isTouching = true;
      followTouchAt(touch.clientX, touch.clientY, wasHidden);
    };

    const handleTouchMove = (e: TouchEvent) => {
      hasTouchEvents = true;
      const touch = e.touches[0];
      if (!touch) return;
      const wasHidden = !isTouching && spotlight.style.opacity === '0';
      isTouching = true;
      followTouchAt(touch.clientX, touch.clientY, wasHidden);
    };

    const handleTouchEndOrCancel = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const activeTouch = e.touches[0];
        isTouching = true;
        followTouchAt(activeTouch.clientX, activeTouch.clientY, false);
      } else {
        scheduleTouchFadeOut();
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
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerCancel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEndOrCancel, { passive: true });
    window.addEventListener('touchcancel', handleTouchEndOrCancel, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      clearTouchHideTimer();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEndOrCancel);
      window.removeEventListener('touchcancel', handleTouchEndOrCancel);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Interactive crimson spotlight (tracks cursor on desktop and follows touch/drag on mobile) */}
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
