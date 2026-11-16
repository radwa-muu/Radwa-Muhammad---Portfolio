import { useEffect, RefObject } from 'react';

/**
 * Uniform, GPU-composited IntersectionObserver scroll-reveal choreography across EVERY section
 * on desktop, tablet, and mobile viewports.
 *
 * Key architecture:
 * - Reveals individual content blocks & grid cards as they enter the viewport (never pre-triggers
 *   tall sections offscreen, ensuring every section below Hero glides smoothly into view).
 * - Adds `is-revealing` only during the 0.78s entrance and strips it ~1.25s later so native
 *   hover / tap-lift transitions stay snappy with zero stagger delay.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>, scale = 1) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const allSections = Array.from(
      container.querySelectorAll<HTMLElement>('section:not(#hero)')
    );
    const dividerSections = allSections.filter((sec) => Boolean(sec.querySelector('.divider-line')));

    const itemDelays = new Map<HTMLElement, number>();
    const addCandidate = (el: Element | null, delayMs: number) => {
      if (!(el instanceof HTMLElement)) return;
      if (el.closest('#hero')) return;
      const existing = itemDelays.get(el);
      if (existing === undefined || delayMs < existing) {
        itemDelays.set(el, delayMs);
      }
    };

    // 1. Section & client title lockups
    container
      .querySelectorAll<HTMLElement>('section:not(#hero) .interactive-lockup, footer .interactive-lockup')
      .forEach((el) => addCandidate(el, 0));

    // 2. Bilingual role/brand info panels (staggered pair)
    allSections.forEach((sec) => {
      const panels = Array.from(sec.querySelectorAll<HTMLElement>('.interactive-panel'));
      panels.forEach((panel, idx) => addCandidate(panel, 70 + idx * 75));
    });

    // 3. About section divider rule & silhouette portrait frame
    const aboutSec = container.querySelector<HTMLElement>('#about');
    if (aboutSec) {
      const aboutRule = aboutSec.querySelector<HTMLElement>('[data-about-divider]');
      addCandidate(aboutRule || null, 110);
      const aboutPortrait = aboutSec.querySelector<HTMLElement>('[data-about-portrait]');
      addCandidate(aboutPortrait, 120);
    }

    const viewportW = window.innerWidth || 1280;
    const isMobileViewport = scale === 1 && viewportW < 768;

    // 4. All showcase grids (Services, Clients, SelectedWork links, Social posts, Video scripts, Decks, Highlights, Contact cards)
    container
      .querySelectorAll<HTMLElement>('section:not(#hero) .grid, footer .grid')
      .forEach((grid) => {
        // Skip structural outer header layout grids & info panel wrappers (handled via inner lockup/panels/portrait)
        if (
          grid.hasAttribute('data-layout-grid') ||
          grid.classList.contains('grid-cols-12') ||
          grid.classList.contains('lg:grid-cols-12') ||
          grid.classList.contains('col-span-7') ||
          grid.classList.contains('col-span-8') ||
          grid.classList.contains('lg:col-span-7') ||
          grid.classList.contains('lg:col-span-8')
        ) {
          return;
        }

        // SelectedWorkIndex has 2 columns of 3 clickable touch-card rows each
        if (grid.closest('#selected-work')) {
          Array.from(grid.children).forEach((col) => {
            const links = Array.from(col.querySelectorAll<HTMLElement>('a.touch-card'));
            links.forEach((link, idx) => addCandidate(link, isMobileViewport ? Math.min(idx, 2) * 55 : idx * 75));
          });
          return;
        }

        const desktopColMatch = grid.className.match(/\b(?:lg:|md:)?grid-cols-(\d+)\b/);
        const cols = isMobileViewport
          ? 2
          : desktopColMatch
          ? Math.max(1, parseInt(desktopColMatch[1], 10))
          : 3;
        const stepMs = isMobileViewport ? 50 : cols >= 8 ? 55 : 70;

        Array.from(grid.children).forEach((child, idx) => {
          const delay = isMobileViewport
            ? (idx % 2) * stepMs
            : cols >= 8
            ? Math.min(idx, 7) * stepMs
            : (idx % cols) * stepMs;
          addCandidate(child, delay);
        });
      });

    // 5. Single-video showcase, deck previewers, stepper bars, captions, pill selectors, and CTAs
    const extraBlocksSelectors = [
      'section:not(#hero) > div > p',
      'section:not(#hero) > div > div.flex',
      'section:not(#hero) > div > div.max-w-5xl > .flex',
      'section:not(#hero) > div > div.max-w-5xl > .group\\/deck',
      'section:not(#hero) > div > div.max-w-5xl > .mt-4',
      'section:not(#hero) > div > div.max-w-5xl > .mt-6',
      'section:not(#hero) > div > div.max-w-5xl > .mt-8',
      'section:not(#hero) > div > div.max-w-3xl > .group\\/vid',
      'footer [data-social-header]',
      'footer [data-footer-cta]',
      'footer [data-footer-bar]',
    ];
    container
      .querySelectorAll<HTMLElement>(extraBlocksSelectors.join(', '))
      .forEach((el) => addCandidate(el, 60));

    // De-duplicate so no reveal item is nested inside another reveal item
    const revealItems: Array<{ el: HTMLElement; delay: number }> = [];
    itemDelays.forEach((delay, el) => {
      let ancestor = el.parentElement;
      let isNested = false;
      while (ancestor && ancestor !== container) {
        if (itemDelays.has(ancestor)) {
          isNested = true;
          break;
        }
        ancestor = ancestor.parentElement;
      }
      if (!isNested) {
        revealItems.push({ el, delay });
      }
    });

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      dividerSections.forEach((sec) => sec.classList.add('is-revealed'));
      revealItems.forEach(({ el }) => el.classList.add('is-revealed'));
      return;
    }

    container.classList.add('scroll-anim-enabled');

    revealItems.forEach(({ el, delay }) => {
      el.setAttribute('data-reveal-item', '');
      el.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    const settleTimers = new Set<number>();
    const unrevealedSet = new Set<HTMLElement>(revealItems.map((i) => i.el));

    const revealElement = (target: HTMLElement, animate = true) => {
      if (target.classList.contains('is-revealed')) {
        unrevealedSet.delete(target);
        return;
      }
      unrevealedSet.delete(target);
      if (animate) {
        target.classList.add('is-revealing');
        target.classList.add('is-revealed');
        const delayMs = parseInt(target.style.getPropertyValue('--reveal-delay') || '0', 10) || 0;
        const timerId = window.setTimeout(() => {
          target.classList.remove('is-revealing');
          settleTimers.delete(timerId);
        }, 900 + delayMs);
        settleTimers.add(timerId);
      } else {
        target.classList.add('is-revealed');
      }
    };

    const viewportH = window.innerHeight || 900;

    const itemObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            revealElement(target, true);
            itemObserver.unobserve(target);
          } else if (entry.boundingClientRect.bottom <= 0) {
            revealElement(target, false);
            itemObserver.unobserve(target);
          }
        }
      },
      {
        threshold: 0.02,
        rootMargin: isMobileViewport ? '0px 0px -10px 0px' : '0px 0px -28px 0px',
      }
    );

    const dividerObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
            (entry.target as HTMLElement).classList.add('is-revealed');
            dividerObserver.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.04,
        rootMargin: isMobileViewport ? '0px 0px -10px 0px' : '0px 0px -24px 0px',
      }
    );

    // Lightweight safety sweep for fast touch flings or instant navbar anchor jumps
    let scrollSweepTimer = 0;
    const runScrollSweep = () => {
      scrollSweepTimer = 0;
      if (unrevealedSet.size === 0) return;
      const vh = window.innerHeight || 900;
      const triggerLine = isMobileViewport ? vh - 8 : vh - 24;
      unrevealedSet.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0) {
          revealElement(el, false);
          itemObserver.unobserve(el);
        } else if (rect.top <= triggerLine) {
          revealElement(el, true);
          itemObserver.unobserve(el);
        }
      });
    };

    const onFastScrollSweep = () => {
      if (unrevealedSet.size === 0 || scrollSweepTimer) return;
      scrollSweepTimer = window.setTimeout(runScrollSweep, 100);
    };

    window.addEventListener('scroll', onFastScrollSweep, { passive: true });

    const aboveFoldQueue: HTMLElement[] = [];

    dividerSections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < viewportH * 0.96 && rect.bottom > 0) {
        aboveFoldQueue.push(sec);
      } else if (rect.bottom <= 0) {
        sec.classList.add('is-revealed');
      } else {
        dividerObserver.observe(sec);
      }
    });

    revealItems.forEach(({ el }) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportH * 0.96 && rect.bottom > 0) {
        aboveFoldQueue.push(el);
      } else if (rect.bottom <= 0) {
        revealElement(el, false);
      } else {
        itemObserver.observe(el);
      }
    });

    // Smoothly trigger initially visible elements below Hero on the next paint frame
    let initialRaf = 0;
    if (aboveFoldQueue.length > 0) {
      initialRaf = window.requestAnimationFrame(() => {
        aboveFoldQueue.forEach((el) => {
          if (el.hasAttribute('data-reveal-item')) {
            revealElement(el, true);
          } else {
            el.classList.add('is-revealed');
          }
        });
      });
    }

    return () => {
      if (initialRaf) window.cancelAnimationFrame(initialRaf);
      if (scrollSweepTimer) window.clearTimeout(scrollSweepTimer);
      window.removeEventListener('scroll', onFastScrollSweep);
      settleTimers.forEach((id) => window.clearTimeout(id));
      settleTimers.clear();
      unrevealedSet.clear();
      itemObserver.disconnect();
      dividerObserver.disconnect();
    };
  }, [containerRef, scale]);
}

/**
 * Zero-React-re-render scroll progress & active nav tracker.
 * Updates progressBarRef CSS transform and nav link `data-active` DOM attributes directly
 * inside requestAnimationFrame so scrolling never triggers a React re-render on mobile or desktop.
 */
export function useScrollProgressAndActiveSection(
  sectionIds: string[],
  scale = 1,
  progressBarRef?: RefObject<HTMLDivElement | null>,
  navContainerRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    let rafId = 0;
    let lastActiveCheck = 0;
    let currentActiveId = sectionIds[0] || '';
    let cachedMaxScroll = 1;
    let cachedAnchors: Array<{ id: string; top: number }> = [];

    const applyActiveNav = (nextId: string) => {
      currentActiveId = nextId;
      const navEl = navContainerRef?.current;
      if (!navEl) return;
      const links = navEl.querySelectorAll<HTMLElement>('[data-nav-id]');
      links.forEach((link) => {
        const isMatch = link.getAttribute('data-nav-id') === nextId;
        link.setAttribute('data-active', isMatch ? 'true' : 'false');
      });
    };

    const recalcOffsets = () => {
      const doc = document.documentElement;
      cachedMaxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const scrollY = window.scrollY;
      cachedAnchors = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: el.getBoundingClientRect().top + scrollY };
        })
        .filter((x): x is { id: string; top: number } => x !== null);
    };

    const updateProgressAndActive = (forceActiveCheck = false) => {
      rafId = 0;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / cachedMaxScroll));

      if (progressBarRef?.current) {
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const now = performance.now();
      if (forceActiveCheck || now - lastActiveCheck > 200) {
        lastActiveCheck = now;

        const thresholdOffset = scale < 1 ? Math.round(140 * scale) + 12 : 140;
        const atBottom = scrollY + window.innerHeight >= cachedMaxScroll + window.innerHeight - 40;
        let nextActive = cachedAnchors[0]?.id || '';

        if (atBottom && sectionIds.length > 0) {
          nextActive = sectionIds[sectionIds.length - 1];
        } else {
          const probeY = scrollY + thresholdOffset;
          for (const anchor of cachedAnchors) {
            if (anchor.top <= probeY) {
              nextActive = anchor.id;
            }
          }
        }

        if (nextActive && nextActive !== currentActiveId) {
          applyActiveNav(nextActive);
        }
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => updateProgressAndActive(false));
      }
    };

    const onResize = () => {
      recalcOffsets();
      updateProgressAndActive(true);
    };

    recalcOffsets();
    applyActiveNav(currentActiveId);
    updateProgressAndActive(true);

    const settleId = window.setTimeout(() => {
      recalcOffsets();
      updateProgressAndActive(true);
    }, 600);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [sectionIds, scale, progressBarRef, navContainerRef]);
}
