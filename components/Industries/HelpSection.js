import { useEffect, useLayoutEffect, useRef, useState } from "react";
import urlFor from "../../utils/urlFor";

// Scroll distance (in vh) travelled per item while the section is stuck.
const STEP_VH = 70;

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

  // Derive the active item from how far the track has scrolled. Geometry is
  // cached so each scroll event is pure arithmetic — no layout reads, and no
  // requestAnimationFrame, which browsers throttle on unfocused/low-power tabs.
  useEffect(() => {
    if (!count) return;

    let trackTop = 0;
    let distance = 0;

    const apply = () => {
      if (distance <= 0) return;
      const progress = Math.min(
        Math.max((window.scrollY - trackTop) / distance, 0),
        1,
      );
      const next = Math.min(count - 1, Math.floor(progress * count));
      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    const measure = () => {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;
      trackTop = track.getBoundingClientRect().top + window.scrollY;
      distance = track.offsetHeight - sticky.offsetHeight;
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
  }, [count]);

  if (!count) return null;

  return (
    <section className="help-section tw-relative tw-bg-noct-dark tw-text-white">
      <div
        ref={trackRef}
        className="help-section__track tw-relative"
        style={{ height: `calc(100vh + ${count * STEP_VH}vh)` }}
      >
        <div
          ref={stickyRef}
          className="help-section__sticky tw-sticky tw-top-0 tw-flex tw-min-h-screen tw-items-center tw-overflow-hidden"
        >
          <div className="container tw-flex tw-w-full tw-flex-col tw-py-[80px] md:tw-py-[100px]">
            {heading && (
              <h2 className="tw-text-[24px] tw-mb-8 md:tw-mb-[10vh] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
                {heading}
              </h2>
            )}

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8 lg:tw-gap-16 tw-items-center">
              {/* Image crossfades with the active item */}
              <div className="help-section__image tw-flex tw-justify-center lg:tw-order-2">
                <div className="tw-relative tw-w-[200px] tw-h-[184px] md:tw-w-[75vw] md:tw-h-[498px]">
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
                className="help-section__window lg:tw-order-1 tw-overflow-hidden"
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
      </div>

      <style jsx>{`
        /* Small viewport units keep the stuck panel stable while mobile
           browsers show and hide their toolbars. */
        @supports (min-height: 100svh) {
          .help-section__sticky {
            min-height: 100svh;
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
