import { useLayoutEffect, useRef, useState } from "react";
import urlFor from "../../utils/urlFor";

// Scroll distance (as a fraction of the visual viewport) per item while stuck.
// Mobile uses a shorter step + small end buffer so the last item doesn't leave
// a near-full-screen empty scroll before the next section.
const STEP_VH_MOBILE = 42;
const STEP_VH_DESKTOP = 70;
const END_VH_MOBILE = 8;
const END_VH_DESKTOP = 18;

function getScrollMetrics(count) {
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const stepVh = mobile ? STEP_VH_MOBILE : STEP_VH_DESKTOP;
  const endVh = mobile ? END_VH_MOBILE : END_VH_DESKTOP;
  const unit = window.innerHeight;
  const stepPx = (stepVh / 100) * unit;
  const endPx = (endVh / 100) * unit;
  // Advance through items on (count - 1) steps, then a short release buffer.
  const distance = Math.max(0, (count - 1) * stepPx + endPx);
  return { stepPx, distance };
}

export default function HelpSection({ heading, items = [] }) {
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const listRef = useRef(null);
  const measuredRef = useRef({ width: 0, height: 0 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [listHeight, setListHeight] = useState(null);

  const count = items?.length || 0;

  // Lock the window to the tallest list state (first item expanded). Only
  // measured while the first item is active; the largest value seen at the
  // current width wins, so a reading taken mid-transition can't shrink it.
  useLayoutEffect(() => {
    if (!count || activeIndex !== 0) return;

    const measureList = () => {
      if (!listRef.current) return;
      const measured = measuredRef.current;
      const width = window.innerWidth;
      const height = listRef.current.scrollHeight;
      const next =
        measured.width === width ? Math.max(measured.height, height) : height;

      measuredRef.current = { width, height: next };
      setListHeight((prev) => (prev === next ? prev : next));
    };

    measureList();
    window.addEventListener("resize", measureList);
    window.addEventListener("load", measureList);
    if (document.fonts?.ready) document.fonts.ready.then(measureList);

    return () => {
      window.removeEventListener("resize", measureList);
      window.removeEventListener("load", measureList);
    };
  }, [count, activeIndex]);

  // Derive the active item from how far the track has scrolled. Track height is
  // set from the measured sticky panel so it matches content (mobile) or the
  // full pin panel (desktop) — no leftover void after the last item.
  useLayoutEffect(() => {
    if (!count) return;

    let trackTop = 0;
    let distance = 0;
    let stepPx = 1;

    const apply = () => {
      if (distance <= 0) return;
      const scrolled = Math.min(
        Math.max(window.scrollY - trackTop, 0),
        distance,
      );
      const next = Math.min(count - 1, Math.floor(scrolled / stepPx));
      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    const measure = () => {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;

      const metrics = getScrollMetrics(count);
      stepPx = Math.max(metrics.stepPx, 1);
      distance = metrics.distance;
      track.style.height = `${sticky.offsetHeight + distance}px`;
      trackTop = track.getBoundingClientRect().top + window.scrollY;
      apply();
    };

    measure();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("load", measure);

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("load", measure);
    };
  }, [count, listHeight]);

  if (!count) return null;

  return (
    <section className="help-section tw-relative tw-bg-noct-dark tw-text-white">
      <div ref={trackRef} className="help-section__track tw-relative">
        <div
          ref={stickyRef}
          className="help-section__sticky tw-sticky tw-top-0 tw-flex tw-items-start tw-overflow-hidden md:tw-min-h-screen md:tw-items-center"
        >
          {/* Mobile: pin content near the top (nav hides on scroll-down).
              Desktop: keep the centered full-viewport pin. */}
          <div className="container tw-grid tw-w-full tw-grid-cols-1 tw-items-start lg:tw-grid-cols-2 lg:tw-gap-x-16">
            {heading && (
              <h2 className="tw-text-balance tw-text-[24px] tw-mb-6 md:tw-mb-[10vh] md:tw-text-[40px] lg:tw-col-start-1 lg:tw-row-start-1 lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
                {heading}
              </h2>
            )}

            {/* Desktop: top-align with the heading (spans both rows) and sit 20% larger. */}
            <div className="help-section__image tw-mb-6 tw-flex tw-items-start tw-justify-center lg:tw-col-start-2 lg:tw-row-span-2 lg:tw-row-start-1 lg:tw-mb-0 lg:tw-self-start">
              <div className="tw-relative tw-w-[200px] tw-h-[184px] md:tw-w-[75vw] md:tw-h-[498px] lg:tw-h-[calc(498px*1.2)] lg:tw-w-[calc(75vw*1.2)]">
                  {items.map((item, index) => {
                    const src = item?.image ? urlFor(item.image).url() : null;
                    if (!src) return null;
                    const isActive = index === activeIndex;
                    return (
                      <img
                        key={item._key || `help-img-${index}`}
                        src={src}
                        alt={item.image?.alt || item.title || ""}
                        className={`tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-center tw-transition-opacity tw-duration-500 tw-ease-out ${
                          isActive
                            ? "tw-opacity-100 tw-z-[1]"
                            : "tw-opacity-0 tw-z-0"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Fixed-height window: collapsing items can't shift the page */}
              <div
                className="help-section__window tw-overflow-hidden lg:tw-col-start-1 lg:tw-row-start-2"
                style={listHeight ? { height: listHeight } : undefined}
              >
                <div
                  ref={listRef}
                  className="help-section__list tw-flex tw-flex-col"
                >
                  {items.map((item, index) => {
                    const isPast = index < activeIndex;
                    const isActive = index === activeIndex;
                    const distance = Math.abs(index - activeIndex);
                    const inactiveOpacity = Math.max(1 - distance * 0.28, 0.25);

                    return (
                      <div
                        key={item._key || `help-${index}`}
                        className={`help-section__item tw-overflow-hidden ${
                          isPast
                            ? "tw-max-h-0 tw-opacity-0 tw-mb-0"
                            : "tw-max-h-[320px] tw-opacity-100 tw-mb-[28px] md:tw-mb-[30px] last:tw-mb-0"
                        }`}
                      >
                        <h3
                          className={`tw-mb-0 tw-text-[18px] md:tw-text-[24px] lg:tw-text-[32px] tw-font-bold tw-leading-[1.3] tw-transition-colors tw-duration-300 ${
                            isActive ? "tw-text-white" : "tw-text-noct-muted"
                          }`}
                          style={
                            isActive ? undefined : { opacity: inactiveOpacity }
                          }
                        >
                          {item.title}
                        </h3>

                        <div
                          className={`help-section__desc tw-overflow-hidden ${
                            isActive
                              ? "tw-max-h-[240px] tw-opacity-100 tw-mt-2"
                              : "tw-max-h-0 tw-opacity-0 tw-mt-0"
                          }`}
                        >
                          <p
                            className={`tw-mb-0 tw-max-w-[540px] tw-text-[13px] md:tw-text-[18px] tw-font-light tw-leading-[1.5] tw-tracking-[0.02em] tw-text-noct-muted tw-transition-transform tw-duration-500 tw-ease-out ${
                              isActive ? "tw-translate-y-0" : "tw-translate-y-2"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Full-viewport pin only on desktop — on mobile the sticky panel
           sizes to its content and aligns to the top. */
        @media (min-width: 768px) {
          @supports (min-height: 100svh) {
            .help-section__sticky {
              min-height: 100svh;
            }
          }
        }

        /* Scope the collapse reflow to this subtree so it can't cost layout
           on the rest of a long page. */
        .help-section__window {
          contain: layout paint;
        }

        .help-section__item,
        .help-section__desc {
          transition-property: max-height, opacity, margin;
          transition-duration: 500ms;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .help-section__item,
          .help-section__desc {
            transition-duration: 1ms;
          }
        }
      `}</style>
    </section>
  );
}
