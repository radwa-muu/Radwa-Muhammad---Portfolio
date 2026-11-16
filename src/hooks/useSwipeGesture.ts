import React, { useRef } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  shouldSuppressClick: () => boolean;
}

/**
 * Lightweight horizontal swipe detector for mobile carousels and slide decks.
 * Preserves vertical page scroll (pan-y) and prevents accidental click/lightbox opens after a swipe.
 */
export function useHorizontalSwipe(
  onPrev: () => void,
  onNext: () => void,
  thresholdPx = 38
): SwipeHandlers {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const lastSwipeTimeRef = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    startRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = startRef.current;
    startRef.current = null;
    const touch = e.changedTouches[0];
    if (!start || !touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) >= thresholdPx && Math.abs(dx) > Math.abs(dy) * 1.2) {
      lastSwipeTimeRef.current = Date.now();
      if (dx < 0) {
        onNext();
      } else {
        onPrev();
      }
    }
  };

  const shouldSuppressClick = () => Date.now() - lastSwipeTimeRef.current < 320;

  return { onTouchStart, onTouchEnd, shouldSuppressClick };
}
