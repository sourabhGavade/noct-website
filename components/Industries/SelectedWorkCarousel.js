import { useCallback, useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SelectedWorkCard from "./SelectedWorkCard";

/**
 * Manual horizontal carousel for selected work cards.
 * Controlled by chevron arrows (and native swipe/scroll on mobile).
 */
export default function SelectedWorkCarousel({ heading, items = [] }) {
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
    const card = el.querySelector(".selected-work-card");
    const gap = 16;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  if (!items?.length) return null;

  return (
    <section className="selected-work-carousel tw-pt-[100px] md:tw-pt-[120px] max-sm:tw-pb-[50px]">
      <div className="container">
        <div className="tw-mb-[48px] md:tw-mb-[64px] tw-flex tw-items-center tw-justify-between">
          {heading && (
            <h2 className="tw-text-[24px] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
              {heading}
            </h2>
          )}

          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-1 md:tw-gap-2 tw--mr-2 md:tw--mr-3">
            <button
              type="button"
              aria-label="Previous work"
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
              aria-label="Next work"
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
          className="selected-work-carousel__scroller tw-flex tw-gap-[32px] md:tw-gap-[36px] tw-overflow-x-auto tw-scroll-smooth"
        >
          {items.map((item, index) => (
            <SelectedWorkCard key={item._key || `work-${index}`} item={item} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .selected-work-carousel__scroller {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .selected-work-carousel__scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
