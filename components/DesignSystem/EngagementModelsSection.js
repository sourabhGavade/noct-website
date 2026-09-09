import { useState } from "react";
import urlFor from "../../utils/urlFor";

export default function EngagementModelsSection({
  heading,
  subtitle,
  models = [],
}) {
  if (!heading && !subtitle && !models.length) return null;

  return (
    <section>
      <div className="container">
        {(heading || subtitle) && (
          <div className="tw-mb-8 tw-max-w-[640px] md:tw-mb-12 lg:tw-mb-[72px]">
            {heading && (
              <h2 className="tw-mb-0 tw-text-balance tw-text-[24px] tw-font-black md:tw-leading-[62px] tw-tracking-[0.13px] tw-text-noct-dark md:tw-text-[32px] lg:tw-text-[48px]">
                {heading}
              </h2>
            )}
            {subtitle && (
              <p className="tw-mb-0 tw-mt-2 tw-text-[14px] tw-font-light tw-leading-[28px] tw-tracking-[0.38px] md:tw-text-[18px]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {models.length > 0 && (
          <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 md:tw-gap-5 lg:tw-grid-cols-3 lg:tw-gap-6">
            {models.map((model, index) => (
              <ModelCard
                key={model._key || `engagement-model-${index}`}
                model={model}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ModelCard({ model }) {
  const [includesOpen, setIncludesOpen] = useState(false);

  if (!model) return null;

  const logos = model.idealForLogos || [];
  const includes = model.includes || [];
  const idealForLabel = model.idealForLabel || "Ideal for";
  const hasIncludes = includes.length > 0;
  const hasLogos = logos.length > 0;

  return (
    <article className="tw-flex tw-h-full tw-flex-col tw-bg-[#F5F5F5] tw-p-6 md:tw-p-8 lg:tw-p-[30px]">
      {model.title && (
        <h3 className="tw-mb-[10px] tw-text-[20px] tw-font-bold tw-leading-[130%] tw-text-noct-dark md:tw-text-[26px]">
          {model.title}
        </h3>
      )}

      {model.description && (
        <p className="tw-mb-6 tw-text-[14px] tw-font-light tw-leading-[170%] tw-tracking-[0.02em] tw-text-noct-dark md:tw-mb-[34px]">
          {model.description}
        </p>
      )}

      {hasLogos && (
        <div
          className={`tw-order-2 md:tw-order-3 tw-flex sm:tw-flex-col sm:tw-gap-[5px] tw-gap-[10px] ${
            hasIncludes ? "tw-mb-0 md:tw-mt-auto md:tw-pt-4" : "tw-mt-auto tw-pt-4"
          }`}
        >
          <p className="tw-mb-0 tw-shrink-0 tw-whitespace-nowrap tw-text-[12px] tw-font-normal tw-leading-[36px] tw-tracking-[0.02em] tw-text-[#222323] md:tw-text-[14px]">
            {idealForLabel}
          </p>
          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-[10px] tw-gap-y-[13px] md:tw-gap-x-[13px]">
            {logos.map((logo, index) => {
              const src = logo?.asset ? urlFor(logo).url() : null;
              if (!src) return null;
              const label = logo.alt || logo.caption || "";

              return (
                <div
                  key={logo._key || `ideal-logo-${index}`}
                  className="tw-flex tw-items-center tw-gap-[4px]"
                >
                  <img
                    src={src}
                    alt={label ? "" : "Logo"}
                    className="tw-block tw-h-5 tw-w-5 tw-shrink-0 tw-object-contain md:tw-h-6 md:tw-w-6"
                  />
                  {label && (
                    <span className="tw-text-[13px] tw-font-light tw-leading-none tw-tracking-[0.01em] tw-text-[#808080] md:tw-text-[14px] md:tw-text-noct-dark">
                      {label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {hasIncludes && (
        <div className="tw-order-3 tw-mb-0 md:tw-order-2 md:tw-mb-10">
          {/* Mobile accordion trigger */}
          <button
            type="button"
            onClick={() => setIncludesOpen((open) => !open)}
            aria-expanded={includesOpen}
            className={`tw-mb-0 tw-flex tw-w-full tw-items-center tw-gap-3 tw-border-0 tw-bg-transparent tw-p-0 tw-text-left md:tw-hidden ${
              hasLogos
                ? "tw-mt-5 tw-border-t tw-border-[#808080] tw-pt-5"
                : ""
            }`}
          >
            <span className="tw-text-[14px] tw-font-semibold tw-leading-[1.4] tw-tracking-[0.02em] tw-text-noct-dark">
              what&apos;s included
            </span>
            <svg
              aria-hidden="true"
              width="10"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`tw-shrink-0 tw-transition-transform tw-duration-200 ${
                includesOpen ? "tw-rotate-180" : ""
              }`}
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Desktop label */}
          <p className="tw-mb-3 tw-hidden tw-text-[12px] tw-font-semibold tw-leading-[1.4] tw-tracking-[0.02em] tw-text-[#808080] md:tw-mb-[10px] md:tw-block md:tw-text-[14px]">
            Includes
          </p>

          <ul
            className={`tw-mb-0 tw-list-disc tw-space-y-2 tw-pl-2 tw-text-[13px] tw-font-normal tw-leading-[1.55] tw-tracking-[0.02em] tw-text-noct-dark md:tw-mt-0 md:tw-block md:tw-space-y-2.5 md:tw-text-[14px] ${
              includesOpen ? "tw-mt-3 tw-block" : "tw-hidden"
            }`}
          >
            {includes.map((item, index) => (
              <li key={`${model._key || "include"}-${index}`} className="tw-mb-0">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
