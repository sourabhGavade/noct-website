import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap/dist/gsap";

/**
 * Three-row expertise marquee (GSAP).
 * Rows alternate LTR / RTL / LTR. Items are repeated until they fill the
 * viewport edge-to-edge, then duplicated for a seamless pixel loop.
 */
export default function ExpertiseSection({ heading, items = [] }) {
  const rowRefs = useRef([]);
  const measureRef = useRef(null);
  // Even number of item-set copies (two identical halves for the loop)
  const [sets, setSets] = useState(4);

  const track = useMemo(() => {
    if (!items?.length) return [];
    return Array.from({ length: sets }, () => items).flat();
  }, [items, sets]);

  // Grow copies until one half is wider than the viewport
  useLayoutEffect(() => {
    if (!items?.length) return;

    const measure = () => {
      const el = measureRef.current || rowRefs.current[0];
      if (!el) return;

      const oneSetWidth = el.scrollWidth / sets;
      if (oneSetWidth <= 0) return;

      const setsPerHalf = Math.max(
        1,
        Math.ceil(window.innerWidth / oneSetWidth) + 1,
      );
      const next = setsPerHalf * 2;
      setSets((prev) => (prev === next ? prev : next));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items, sets]);

  useEffect(() => {
    if (!items?.length) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const tweens = [];
    const configs = [
      { reverse: true, duration: 200 },
      { reverse: false, duration: 200 },
      { reverse: true, duration: 200 },
    ];

    const setupRow = (trackEl, { reverse, duration }) => {
      if (!trackEl) return null;

      const setWidth = trackEl.scrollWidth / 2;
      if (setWidth <= 0) return null;

      gsap.set(trackEl, { x: reverse ? -setWidth : 0 });

      return gsap.to(trackEl, {
        x: reverse ? 0 : -setWidth,
        duration,
        ease: "none",
        repeat: -1,
      });
    };

    const rebuild = () => {
      tweens.splice(0).forEach((t) => t?.kill());
      configs.forEach((config, i) => {
        const tween = setupRow(rowRefs.current[i], config);
        if (tween) tweens.push(tween);
      });
    };

    const raf = requestAnimationFrame(rebuild);
    window.addEventListener("resize", rebuild);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", rebuild);
      tweens.forEach((t) => t?.kill());
    };
  }, [items, sets]);

  if (!items?.length) return null;

  return (
    <section className="expertise-section tw-relative tw-w-full tw-overflow-hidden tw-bg-noct-dark tw-pt-[50px]">
      {heading && (
        <h2 className="tw-mb-10 md:tw-mb-14 lg:tw-mb-16 tw-text-center tw-text-[22px] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[130%] tw-tracking-[0.27%] tw-text-white">
          {heading}
        </h2>
      )}

      <div className="expertise-section__fade tw-relative tw-w-full tw-flex tw-flex-col tw-gap-4 md:tw-gap-5 lg:tw-gap-[32px]">
        {[0, 1, 2].map((rowIndex) => (
          <div
            key={`expertise-row-${rowIndex}`}
            className="expertise-section__viewport tw-w-full tw-overflow-hidden"
          >
            <div
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
                if (rowIndex === 0) measureRef.current = el;
              }}
              className="expertise-section__track tw-flex tw-w-max tw-items-center tw-will-change-transform"
            >
              {track.map((label, index) => (
                <span
                  key={`expertise-${rowIndex}-${index}`}
                  className="expertise-section__item tw-inline-flex tw-shrink-0 tw-items-center"
                >
                  <h4 className="tw-whitespace-nowrap tw-px-4 md:tw-px-6 lg:tw-px-8 tw-text-[14px] md:tw-text-[20px] lg:tw-text-[24px] tw-font-normal tw-leading-none tw-tracking-[0.01em] tw-text-noct-muted">
                    {label}
                  </h4>
                  <span
                    aria-hidden="true"
                    className="tw-block tw-h-[5px] tw-w-[5px] md:tw-h-[8px] md:tw-w-[8px] tw-shrink-0 tw-rounded-full tw-bg-noct-muted/30"
                  />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .expertise-section__fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 48px,
            #000 calc(100% - 48px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 48px,
            #000 calc(100% - 48px),
            transparent 100%
          );
        }

        @media (min-width: 768px) {
          .expertise-section__fade {
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 64px,
              #000 calc(100% - 64px),
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 64px,
              #000 calc(100% - 64px),
              transparent 100%
            );
          }
        }
      `}</style>
    </section>
  );
}
