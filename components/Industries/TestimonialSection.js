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

    const scrollLeft = el.scrollLeft;
    let target = null;

    if (direction > 0) {
      target = cards.find((card) => card.offsetLeft > scrollLeft + 8);
    } else {
      for (let i = cards.length - 1; i >= 0; i -= 1) {
        if (cards[i].offsetLeft < scrollLeft - 8) {
          target = cards[i];
          break;
        }
      }
    }

    if (target) {
      el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }
  };

  if (!items?.length) return null;

  return (
    <section className="testimonial-section tw-bg-noct-dark tw-py-16 md:tw-py-24 lg:tw-py-28 tw-text-white">
      <div className="container">
        <div className="tw-mb-6 md:tw-mb-8 lg:tw-mb-10 tw-flex tw-items-center tw-justify-between tw-gap-4">
          {heading && (
            <h2 className="tw-mb-0 tw-text-[24px] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
              {heading}
            </h2>
          )}

          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-1 md:tw-gap-2">
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
              <HiChevronLeft size={28} />
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
              <HiChevronRight size={28} />
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
          ? "testimonial-card tw-grid tw-shrink-0 tw-w-[min(753px,85vw)] tw-grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] tw-gap-4 md:tw-gap-6 lg:tw-gap-8 tw-items-start"
          : "testimonial-card tw-flex tw-shrink-0 tw-w-[min(240px,72vw)] md:tw-w-[425px] tw-flex-col"
      }
    >
      {imageSrc && (
        <div className="tw-relative tw-aspect-[3/4] tw-w-full tw-overflow-hidden">
          <img
            src={imageSrc}
            alt={item.image?.alt || item.name || ""}
            className="tw-h-full tw-w-full tw-object-cover"
          />
        </div>
      )}

      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
        {logoSrc && (
          <div className="tw-mb-4 md:tw-mb-6 lg:tw-mb-8">
            <img
              src={logoSrc}
              alt={item.logo?.alt || ""}
              className="tw-h-[22px] md:tw-h-[28px] lg:tw-h-[32px] tw-w-auto tw-max-w-[140px] md:tw-max-w-[180px] tw-object-contain tw-object-left"
            />
          </div>
        )}

        <p className="tw-mb-0 tw-flex-1 tw-text-[13px] md:tw-text-[16px] lg:tw-text-[18px] tw-font-light tw-leading-[1.55] tw-tracking-[0.01em] tw-text-noct-muted">
          {item.quote}
        </p>

        <div className="tw-mt-6 md:tw-mt-10 lg:tw-mt-14 tw-pt-4 md:tw-pt-5">
          <div
            aria-hidden="true"
            className="tw-mb-4 md:tw-mb-5 tw-h-px tw-w-10 md:tw-w-12 tw-bg-white/25"
          />
          <p className="tw-mb-1 tw-text-[14px] md:tw-text-[16px] tw-font-bold tw-leading-tight tw-text-white">
            {item.name}
          </p>
          <p className="tw-mb-0 tw-text-[12px] md:tw-text-[14px] tw-font-light tw-leading-snug tw-text-noct-muted">
            {item.designation}
          </p>
        </div>
      </div>
    </div>
  );
}
