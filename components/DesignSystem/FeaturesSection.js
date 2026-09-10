import { useEffect, useRef, useState } from "react";
import urlFor from "../../utils/urlFor";

export default function FeaturesSection({ features = [] }) {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !features.length) return;

    const onScroll = () => {
      const itemWidth = scroller.scrollWidth / features.length;
      if (!itemWidth) return;

      const index = Math.round(scroller.scrollLeft / itemWidth);
      const clamped = Math.min(Math.max(index, 0), features.length - 1);
      setActiveIndex(clamped);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [features.length]);

  if (!features.length) return null;

  return (
    <section>
      <div className="container">
        {/* Mobile carousel — text top, image bottom, dots bottom-left */}
        <div className="md:tw-hidden">
          <div
            ref={scrollerRef}
            className="mobile-carousel features-mobile-carousel"
          >
            {features.map((item, index) => (
              <div key={item._key || `feature-mobile-${index}`}>
                <FeatureCard item={item} textFirst />
              </div>
            ))}
          </div>
          <div className="mc-dots tw-flex" aria-hidden="true">
            {features.map((item, index) => (
              <span
                key={item._key || `feature-dot-${index}`}
                className={`mc-dot ${activeIndex === index ? "active" : ""}`}
              />
            ))}
          </div>
          <style jsx>{`
            :global(.features-mobile-carousel) {
              align-items: stretch;
            }

            :global(.features-mobile-carousel > div) {
              flex: 0 0 332px;
              width: 352px;
              max-width: 352px;
              margin-right: 10px;
              display: flex;
            }

            :global(.features-mobile-carousel > div > article) {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 100%;
            }

            :global(.features-mobile-carousel > div > article > img) {
              margin-top: auto;
              padding-top: 20px;
            }
          `}</style>
        </div>

        {/* Desktop grid — unchanged */}
        <div className="tw-hidden tw-grid-cols-1 tw-gap-10 md:tw-grid md:tw-grid-cols-3 md:tw-gap-8 lg:tw-gap-x-[72px] lg:tw-gap-y-[96px]">
          {features.map((item, index) => (
            <FeatureCard key={item._key || `feature-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ item, textFirst = false }) {
  if (!item) return null;

  const src = item.asset ? urlFor(item).url() : null;

  const image = src ? (
    <img
      src={src}
      alt={item.alt || ""}
      className={`tw-block tw-h-auto tw-w-full ${
        textFirst ? "" : "tw-mb-5 md:tw-mb-[30px]"
      }`}
    />
  ) : null;

  const text = textFirst ? (
    <div>
      {item.alt && (
        <h4 className="tw-mb-2 tw-text-[18px] tw-font-bold tw-leading-[140%] tw-tracking-[0.01em]">
          {item.alt}
        </h4>
      )}
      {item.caption && (
        <p className="tw-mb-0 tw-text-[14px] tw-font-light tw-leading-[160%] tw-tracking-[0.02em]">
          {item.caption}
        </p>
      )}
    </div>
  ) : (
    <>
      {item.alt && (
        <h4 className="tw-mb-2 tw-text-[18px] tw-font-bold tw-leading-[140%] tw-tracking-[0.01em] md:tw-mb-[8px] md:tw-text-[24px]">
          {item.alt}
        </h4>
      )}
      {item.caption && (
        <p className="tw-mb-0 tw-text-[14px] tw-font-light tw-leading-[160%] tw-tracking-[0.02em] md:tw-text-[18px]">
          {item.caption}
        </p>
      )}
    </>
  );

  return (
    <article>
      {textFirst ? (
        <>
          {text}
          {image}
        </>
      ) : (
        <>
          {image}
          {text}
        </>
      )}
    </article>
  );
}
