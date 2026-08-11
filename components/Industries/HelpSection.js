import { useEffect, useRef, useState } from "react";
import urlFor from "../../utils/urlFor";

/**
 * Scroll-pinned "How we can help" section.
 * Progress through items as the user scrolls; image + description update
 * with the active item. After the last item, the pin releases and the page
 * continues scrolling normally.
 */
export default function HelpSection({ heading, items = [] }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!items?.length || !sectionRef.current) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    const triggerId = "helpSectionScroll";
    const count = items.length;
    // Extra viewport height per item so each step has room to settle
    const scrollPerItem = () => Math.max(window.innerHeight * 0.85, 500);

    const st = ScrollTrigger.create({
      id: triggerId,
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${scrollPerItem() * count}`,
      pin: true,
      scrub: false,
      anticipatePin: 1,
      onUpdate: (self) => {
        const next = Math.min(count - 1, Math.floor(self.progress * count));
        setActiveIndex((prev) => (prev === next ? prev : next));
      },
    });

    // Ensure first item is active when pin starts
    setActiveIndex(0);

    return () => {
      st.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars?.id === triggerId)
        .forEach((t) => t.kill());
    };
  }, [items]);

  if (!items?.length) return null;

  const activeItem = items[activeIndex] || items[0];
  const activeImageSrc = activeItem?.image
    ? urlFor(activeItem.image).url()
    : null;

  return (
    <section
      ref={sectionRef}
      className="help-section tw-relative tw-bg-noct-dark tw-text-white tw-overflow-hidden"
    >
      <div className="container tw-flex tw-min-h-screen tw-flex-col tw-py-[100px] lg:tw-justify-center">
        {heading && (
          <h2 className="tw-text-[24px] tw-mb-10 md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
            {heading}
          </h2>
        )}

        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-10 lg:tw-gap-16 tw-items-center tw-flex-1 lg:tw-flex-none">
          {/* Mobile image — above the list */}
          <div className="help-section__image lg:tw-order-2 tw-flex tw-items-center tw-justify-center">
            <div className="tw-relative tw-w-full tw-max-w-[420px] tw-aspect-square tw-mx-auto">
              {items.map((item, index) => {
                const src = item?.image ? urlFor(item.image).url() : null;
                if (!src) return null;
                const isActive = index === activeIndex;
                return (
                  <img
                    key={item._key || `help-img-${index}`}
                    src={src}
                    alt={item.image?.alt || item.title || ""}
                    className={`tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-contain tw-transition-opacity tw-duration-500 ${
                      isActive
                        ? "tw-opacity-100 tw-z-[1]"
                        : "tw-opacity-0 tw-z-0"
                    }`}
                  />
                );
              })}
              {/* Fallback if no images resolved yet */}
              {!activeImageSrc && (
                <div className="tw-h-full tw-w-full tw-bg-white/5" />
              )}
            </div>
          </div>

          {/* Titles + scroll-revealed descriptions */}
          <div className="help-section__list lg:tw-order-1 tw-flex tw-flex-col tw-gap-5 md:tw-gap-[120px]">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              // Soft fade for items further from active (matches mobile mock)
              const distance = Math.abs(index - activeIndex);
              const inactiveOpacity =
                distance === 0 ? 1 : Math.max(0.25, 1 - distance * 0.28);

              return (
                <div
                  key={item._key || `help-${index}`}
                  className="help-section__item"
                >
                  <h3
                    className={`tw-mb-0 tw-text-[18px] md:tw-text-[24px] lg:tw-text-[32px] tw-font-bold tw-leading-[1.3] tw-transition-colors tw-duration-300 ${
                      isActive ? "tw-text-white" : "tw-text-noct-muted"
                    }`}
                    style={!isActive ? { opacity: inactiveOpacity } : undefined}
                  >
                    {item.title}
                  </h3>

                  <div
                    className={`tw-overflow-hidden tw-transition-all tw-duration-500 tw-ease-out ${
                      isActive
                        ? "tw-max-h-[240px] tw-opacity-100 tw-mt-3 md:tw-mt-4"
                        : "tw-max-h-0 tw-opacity-0 tw-mt-0"
                    }`}
                  >
                    <p className="tw-mb-0 tw-max-w-[540px] tw-text-[13px] md:tw-text-[18px] tw-font-light tw-leading-[1.6] tw-tracking-[0.02em] tw-text-noct-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
