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
              <h2 className="tw-mb-0 tw-text-[24px] tw-font-black tw-leading-[62px] tw-tracking-[0.13px] tw-text-noct-dark md:tw-text-[32px] lg:tw-text-[48px]">
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
  if (!model) return null;

  const logos = model.idealForLogos || [];
  const includes = model.includes || [];
  const idealForLabel = model.idealForLabel || "Ideal for";

  return (
    <article className="tw-flex tw-h-full tw-flex-col tw-bg-[#f1f1f1] tw-p-6 md:tw-p-8 lg:tw-p-[30px]">
      {model.title && (
        <h3 className="tw-mb-[10px] tw-text-[20px] tw-font-bold tw-leading-[130%] tw-text-noct-dark md:tw-text-[28px]">
          {model.title}
        </h3>
      )}

      {model.description && (
        <p className="tw-mb-6 tw-text-[14px] tw-font-light tw-leading-[170%] tw-tracking-[0.02em] tw-text-noct-dark md:tw-mb-[34px]">
          {model.description}
        </p>
      )}

      {includes.length > 0 && (
        <div className="tw-mb-8 md:tw-mb-10">
          <p className="tw-mb-3 tw-text-[12px] tw-font-light tw-leading-[1.4] tw-tracking-[0.02em] tw-text-[#808080] md:tw-mb-[10px] md:tw-text-[16px]">
            Includes
          </p>
          <ul className="tw-mb-0 tw-list-disc tw-space-y-2 tw-pl-5 tw-text-[13px] tw-font-normal tw-leading-[1.55] tw-tracking-[0.02em] tw-text-noct-dark md:tw-space-y-2.5 md:tw-text-[16px]">
            {includes.map((item, index) => (
              <li key={`${model._key || "include"}-${index}`} className="tw-mb-0">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {logos.length > 0 && (
        <div className="tw-mt-auto tw-flex tw-items-center tw-gap-x-[13px] tw-pt-4">
          <p className="tw-shrink-0 tw-whitespace-nowrap tw-text-[12px] tw-font-light tw-leading-[36px] tw-tracking-[0.02em] md:tw-text-[14px]">
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
                    <span className="tw-text-[13px] tw-font-light tw-leading-none tw-tracking-[0.01em] md:tw-text-[14px]">
                      {label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
