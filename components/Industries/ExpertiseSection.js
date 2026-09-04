import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap/dist/gsap";

const ROW_COUNT = 3;

/** Sequential chunks: 15 items → 5 / 5 / 5 across the three marquees. */
function chunkItems(items, rowCount = ROW_COUNT) {
  if (!items?.length) return [];
  const size = Math.ceil(items.length / rowCount);
  return Array.from({ length: rowCount }, (_, i) =>
    items.slice(i * size, (i + 1) * size),
  ).filter((chunk) => chunk.length > 0);
}

export default function ExpertiseSection({ heading, items = [] }) {
  const rowRefs = useRef([]);
  // Even number of item-set copies per row (two identical halves for the loop)
  const [sets, setSets] = useState(() => Array(ROW_COUNT).fill(4));

  const chunks = useMemo(() => chunkItems(items), [items]);

  const tracks = useMemo(
    () =>
      chunks.map((chunk, i) =>
        Array.from({ length: sets[i] ?? 4 }, () => chunk).flat(),
      ),
    [chunks, sets],
  );

  // Grow copies until one half of each row is wider than the viewport
  useLayoutEffect(() => {
    if (!chunks.length) return;

    const measure = () => {
      setSets((prev) => {
        const next = chunks.map((chunk, i) => {
          const el = rowRefs.current[i];
          const prevSets = prev[i] ?? 4;
          if (!el || !chunk.length) return prevSets;

          const oneSetWidth = el.scrollWidth / prevSets;
          if (oneSetWidth <= 0) return prevSets;

          const setsPerHalf = Math.max(
            1,
            Math.ceil(window.innerWidth / oneSetWidth) + 1,
          );
          return setsPerHalf * 2;
        });

        return next.every((n, i) => n === prev[i]) ? prev : next;
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [chunks, sets]);

  useEffect(() => {
    if (!chunks.length) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const tweens = [];
    const configs = [
      { reverse: true, duration: 100 },
      { reverse: false, duration: 100 },
      { reverse: true, duration: 100 },
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
      chunks.forEach((_, i) => {
        const tween = setupRow(rowRefs.current[i], configs[i]);
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
  }, [chunks, sets]);

  if (!chunks.length) return null;

  return (
    <section className="expertise-section tw-relative tw-w-full tw-overflow-hidden tw-bg-noct-dark tw-pt-[50px]">
      {heading && (
        <h2 className="tw-mb-10 md:tw-mb-14 lg:tw-mb-16 tw-text-center tw-text-[22px] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[130%] tw-tracking-[0.27%] tw-text-white">
          {heading}
        </h2>
      )}

      <div className="expertise-section__fade tw-relative tw-w-full tw-flex tw-flex-col tw-gap-[26px] md:tw-gap-[30px] lg:tw-gap-[42px]">
        {tracks.map((track, rowIndex) => (
          <div
            key={`expertise-row-${rowIndex}`}
            className="expertise-section__viewport tw-w-full tw-overflow-hidden"
          >
            <div
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
              className="expertise-section__track tw-flex tw-w-max tw-items-center tw-will-change-transform"
            >
              {track.map((label, index) => (
                <span
                  key={`expertise-${rowIndex}-${index}`}
                  className="expertise-section__item tw-inline-flex tw-shrink-0 tw-items-center"
                >
                  <h4 className="tw-whitespace-nowrap tw-px-4 md:tw-px-6 lg:tw-px-8 tw-text-[14px] md:tw-text-[20px] lg:tw-text-[24px] tw-font-normal tw-tracking-[0.01em] tw-text-noct-muted">
                    {label}
                  </h4>
                  <span
                    aria-hidden="true"
                    className="tw-block tw-h-[5px] tw-w-[5px] md:tw-h-[8px] md:tw-w-[8px] tw-shrink-0 tw-rounded-full tw-bg-noct-muted/20"
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
