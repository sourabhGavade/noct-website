import { useEffect, useRef, useState } from "react";
import urlFor from "../../utils/urlFor";

export default function OverviewSection({ heading, description, items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(-1);
  const descRefs = useRef([]);
  const splitRefs = useRef([]);
  const openIndexRef = useRef(-1);

  useEffect(() => {
    openIndexRef.current = openIndex;
  }, [openIndex]);

  if (!heading && !description && !items.length) return null;

  const activeItem = items[activeIndex] || items[0];
  const activeImageSrc = activeItem?.image?.asset
    ? urlFor(activeItem.image).url()
    : null;

  const animateClose = (index) => {
    const descEl = descRefs.current[index];
    if (!descEl || typeof TweenMax === "undefined") return;
    TweenMax.to(descEl, 0.4, {
      height: "0px",
      ease: "Power1.easeOut",
    });
  };

  const animateOpen = (index) => {
    const descEl = descRefs.current[index];
    const splitEl = splitRefs.current[index];
    if (!descEl || typeof TweenMax === "undefined") return;

    TweenMax.to(descEl, 0.4, {
      height: "auto",
      ease: "Power1.easeOut",
    });

    if (splitEl && typeof SplitText !== "undefined") {
      const split = new SplitText(splitEl, { type: "lines" });
      TweenMax.staggerFrom(
        split.lines,
        0.3,
        { y: 20, opacity: 0, delay: 0.1 },
        0.05
      );
    }
  };

  const handleItemClick = (index) => {
    const currentOpen = openIndexRef.current;

    if (index === currentOpen) {
      animateClose(index);
      setOpenIndex(-1);
      return;
    }

    if (currentOpen >= 0) {
      animateClose(currentOpen);
    }
    animateOpen(index);
    setOpenIndex(index);
    setActiveIndex(index);
  };

  return (
    <section className="overview-section">
      <div className="container">
        <div className="tw-grid tw-grid-cols-1 tw-items-start tw-gap-10 lg:tw-grid-cols-2 lg:tw-gap-[48px] xl:tw-gap-[72px]">
          <div className="tw-flex tw-flex-col">
            {heading && (
              <h2 className="tw-mb-0 tw-max-w-[522px] tw-text-[24px] md:tw-leading-[62px] tw-tracking-[0.13px] tw-text-noct-dark md:tw-text-[32px] lg:tw-text-[48px]">
                {heading}
              </h2>
            )}

            {description && (
              <p className="tw-mb-0 tw-max-w-[510px] tw-text-[14px] tw-font-light md:tw-leading-[28px] tw-tracking-[0.38px] tw-mt-2 md:tw-text-[18px]">
                {description}
              </p>
            )}

            {items.length > 0 && (
              <ul className="tw-mb-0 tw-flex tw-list-none tw-flex-col tw-p-0 tw-mt-[24px]">
                {items.map((item, index) => {
                  const isOpen = index === openIndex;
                  const isActive = index === activeIndex;

                  return (
                    <li
                      key={item._key || `overview-item-${index}`}
                      className={`overview-item${isOpen ? " open" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleItemClick(index)}
                        aria-expanded={isOpen}
                        className={`overview-item__header tw-group tw-flex tw-w-full tw-items-center tw-border-0 tw-bg-transparent tw-p-0 tw-text-left tw-transition-colors tw-duration-300 ${
                          isOpen || isActive
                            ? "tw-text-noct-dark"
                            : "tw-text-noct-muted hover:tw-text-noct-dark"
                        }`}
                      >
                        <span className="tw-text-[16px] tw-font-normal tw-leading-[1.4] md:tw-text-[20px]">
                          {item.title}
                        </span>
                        <span aria-hidden="true" className="plus-icon" />
                      </button>

                      <div
                        className="overview-item__desc"
                        ref={(el) => {
                          descRefs.current[index] = el;
                        }}
                      >
                        {item.description && (
                          <p
                            className="tw-mb-0 tw-max-w-[510px] tw-pt-2 tw-pb-4 tw-text-[14px] tw-font-light tw-leading-[1.6] tw-tracking-[0.38px]  md:tw-text-[16px]"
                            ref={(el) => {
                              splitRefs.current[index] = el;
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="tw-relative tw-aspect-[4/3] tw-w-full tw-overflow-hidden lg:tw-aspect-auto lg:tw-min-h-[476px]">
            {items.map((item, index) => {
              const src = item?.image?.asset ? urlFor(item.image).url() : null;
              if (!src) return null;
              const isActive = index === activeIndex;

              return (
                <img
                  key={item._key || `overview-img-${index}`}
                  src={src}
                  alt={item.image?.alt || item.title || ""}
                  className={`tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-contain tw-object-center tw-transition-opacity tw-duration-500 ${
                    isActive ? "tw-opacity-100 tw-z-[1]" : "tw-opacity-0 tw-z-0"
                  }`}
                />
              );
            })}
            {!activeImageSrc && items.length > 0 && (
              <div className="tw-absolute tw-inset-0 tw-bg-transparent" />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .overview-item {
          overflow-y: hidden;
        }

        .overview-item__header {
          width: auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
        }

        .overview-item__desc {
          height: 0px;
        }

        .overview-item__desc :global(p) {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .overview-item.open .overview-item__desc :global(p) {
          opacity: 1;
        }

        .overview-item.open :global(.plus-icon:before) {
          transform: rotate(90deg);
        }

        .overview-item.open :global(.plus-icon:after) {
          transform: rotate(180deg);
        }

        .overview-item__header:hover :global(.plus-icon) {
          transform: rotate(90deg);
        }

        .overview-item.open .overview-item__header:hover :global(.plus-icon) {
          transform: rotate(0);
        }
      `}</style>
    </section>
  );
}
