import { useState } from "react";
import urlFor from "../../utils/urlFor";

export default function OverviewSection({ heading, description, items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!heading && !description && !items.length) return null;

  const activeItem = items[activeIndex] || items[0];
  const activeImageSrc = activeItem?.image?.asset
    ? urlFor(activeItem.image).url()
    : null;

  return (
    <section>
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
                  const isActive = index === activeIndex;

                  return (
                    <li key={item._key || `overview-item-${index}`}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-pressed={isActive}
                        className={`tw-group tw-flex tw-w-full tw-items-center tw-gap-3 tw-border-0 tw-bg-transparent tw-p-0 tw-text-left tw-transition-colors tw-duration-300 ${
                          isActive
                            ? "tw-text-noct-dark"
                            : "tw-text-noct-muted hover:tw-text-noct-dark"
                        }`}
                      >
                        <span className="tw-text-[16px] tw-font-normal tw-leading-[1.4] md:tw-text-[20px]">
                          {item.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className="tw-text-[16px] tw-font-normal tw-leading-none md:tw-text-[20px]"
                        >
                          {isActive ? "−" : "+"}
                        </span>
                      </button>
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
    </section>
  );
}
