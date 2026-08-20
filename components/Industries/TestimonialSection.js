import { useCallback, useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import urlFor from "../../utils/urlFor";

/**
 * Horizontal testimonials carousel (same pattern as Selected Work).
 * Each card optionally includes a portrait. Arrows scroll the track by one card.
 */
export default function TestimonialSection({ heading, items = [] }) {
  const scrollerRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateNav = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateNav();
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);

    return () => {
      el.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [items, updateNav]);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll(".testimonial-card"));
    if (!cards.length) return;

    // offsetLeft is relative to the offset parent, so rebase on the first card
    // to get positions comparable with the scroller's scrollLeft.
    const origin = cards[0].offsetLeft;
    const positions = cards.map((card) => card.offsetLeft - origin);
    const scrollLeft = el.scrollLeft;

    let target;
    if (direction > 0) {
      target = positions.find((pos) => pos > scrollLeft + 8);
      if (target === undefined) target = el.scrollWidth - el.clientWidth;
    } else {
      target = [...positions].reverse().find((pos) => pos < scrollLeft - 8);
      if (target === undefined) target = 0;
    }

    el.scrollTo({ left: target, behavior: "smooth" });
  };

  if (!items?.length) return null;

  return (
    <section className="testimonial-section tw-bg-noct-dark tw-pt-[130px] md:tw-pt-[250px] tw-text-white">
      <div className="container">
        <div className="tw-mb-6 md:tw-mb-8 lg:tw-mb-[64px] tw-flex tw-items-center tw-justify-between tw-gap-4">
          {heading && (
            <h2 className="tw-mb-0 tw-text-[24px] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
              {heading}
            </h2>
          )}

          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-1 md:tw-gap-2 tw--mr-2 md:tw--mr-7">
            <button
              type="button"
              aria-label="Previous testimonial"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
              className={`tw-flex tw-h-9 tw-w-9 md:tw-h-10 md:tw-w-10 tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-0 tw-transition-opacity ${
                canPrev
                  ? "tw-cursor-pointer tw-text-white tw-opacity-100"
                  : "tw-cursor-default tw-text-noct-muted tw-opacity-40"
              }`}
            >
              <HiChevronLeft size={40} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
              className={`tw-flex tw-h-9 tw-w-9 md:tw-h-10 md:tw-w-10 tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-0 tw-transition-opacity ${
                canNext
                  ? "tw-cursor-pointer tw-text-white tw-opacity-100"
                  : "tw-cursor-default tw-text-noct-muted tw-opacity-40"
              }`}
            >
              <HiChevronRight size={40} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="testimonial-section__scroller tw-flex tw-gap-5 md:tw-gap-10 tw-overflow-x-auto tw-scroll-smooth tw-pb-2"
        >
          {items.map((item, index) => (
            <TestimonialCard
              key={item._key || `testimonial-${index}`}
              item={item}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-section__scroller {
          margin-right: calc(50% - 50vw);
          padding-right: calc(50vw - 50%);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .testimonial-section__scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ item }) {
  if (!item) return null;

  const imageSrc = item.image?.asset ? urlFor(item.image).url() : null;
  const logoSrc = item.logo?.asset ? urlFor(item.logo).url() : null;

  return (
    <div
      className={
        imageSrc
          ? "testimonial-card tw-grid tw-shrink-0 tw-w-[min(753px,140vw)] tw-grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] tw-gap-4 md:tw-gap-6 lg:tw-gap-8 tw-items-stretch"
          : "testimonial-card tw-flex tw-shrink-0 tw-w-[min(240px,72vw)] md:tw-w-[425px] tw-flex-col"
      }
    >
      {imageSrc && (
        <div className="tw-relative tw-aspect-[3/4] tw-w-full tw-overflow-hidden">
          <img
            src={imageSrc}
            alt={item.image?.alt || item.name || ""}
            className="tw-h-full tw-w-full tw-object-contain"
          />
        </div>
      )}

      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-justify-center">
        {logoSrc && (
          <div className="tw-mb-4 md:tw-mb-6 lg:tw-mb-[40px]">
            <img
              src={logoSrc}
              alt={item.logo?.alt || ""}
              className="tw-h-[22px] md:tw-h-[28px] lg:tw-h-[32px] tw-w-auto tw-max-w-[140px] md:tw-max-w-[180px] tw-object-contain tw-object-left"
            />
          </div>
        )}

        <p className="tw-mb-6 md:tw-mb-8 tw-text-[14px] md:tw-max-w-[360px] md:tw-text-[16px] lg:tw-text-[22px] tw-font-light tw-leading-[1.55] tw-tracking-[0.01em] tw-text-noct-muted">
          {item.quote}
        </p>

        <div>
          <div
            aria-hidden="true"
            className="tw-mb-4 md:tw-mb-7 tw-h-px tw-w-10 md:tw-w-[56px] tw-bg-white/25"
          />
          <h5 className="tw-mb-1 tw-text-[14px] md:tw-text-[20px] tw-font-bold tw-leading-tight tw-text-white">
            {item.name}
          </h5>
          <p className="tw-mb-0 tw-text-[12px] md:tw-text-[14px] tw-font-light tw-leading-snug tw-text-noct-muted">
            {item.designation}
          </p>
        </div>
      </div>
    </div>
  );
}
