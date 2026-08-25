import urlFor from "../../utils/urlFor";

export default function ProcessSection({ heading, steps = [] }) {
  if (!heading && !steps.length) return null;

  return (
    <section>
      <div className="container">
        <div className="tw-grid tw-grid-cols-1 tw-items-start tw-gap-10 lg:tw-grid-cols-12 lg:tw-gap-[48px]">
          {heading && (
            <div className="lg:tw-col-span-4">
              <h2 className="tw-mb-0 tw-max-w-[420px] tw-text-[24px] tw-font-black tw-leading-[1.25] tw-tracking-[0.13px] tw-text-noct-dark md:tw-text-[32px] md:tw-leading-[1.3] lg:tw-text-[48px] lg:tw-leading-[62px]">
                {heading}
              </h2>
            </div>
          )}

          {steps.length > 0 && (
            <div
              className={
                heading
                  ? "lg:tw-col-span-7 lg:tw-col-start-6"
                  : "lg:tw-col-span-12"
              }
            >
              <div className="ds-process-timeline">
                {steps.map((step, index) => {
                  const iconSrc = step?.icon?.asset
                    ? urlFor(step.icon).url()
                    : null;

                  return (
                    <div
                      key={step._key || `process-step-${index}`}
                      className="ds-process-timeline__item"
                    >
                      <div className="ds-process-timeline__icon">
                        {iconSrc && (
                          <img
                            src={iconSrc}
                            alt={step.icon?.alt || ""}
                            className="tw-block tw-h-11 tw-w-11 tw-object-contain"
                          />
                        )}
                      </div>
                      <div className="ds-process-timeline__content">
                        {step.title && (
                          <h3 className="tw-mb-2 tw-text-[18px] tw-font-semibold md:tw-leading-[30px] tw-leading-[22px] tw-text-noct-dark md:tw-mb-3 md:tw-text-[24px]">
                            {step.title}
                          </h3>
                        )}
                        {step.description && (
                          <p className="tw-mb-0 tw-text-[14px] tw-font-light md:tw-leading-[28px] tw-leading-[20px] tw-tracking-[0.3px] md:tw-text-[18px]">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .ds-process-timeline__item {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
        }

        .ds-process-timeline__icon {
          position: relative;
          width: 100px;
          flex-shrink: 0;
          padding-bottom: 32px;
        }

        .ds-process-timeline__icon:before {
          content: "";
          display: block;
          position: absolute;
          width: 3px;
          left: calc(22px - 1.5px);
          top: 44px;
          height: 100%;
          background: #e1e1e1;
        }

        .ds-process-timeline__item:last-child
          .ds-process-timeline__icon:before {
          opacity: 0;
          visibility: hidden;
        }

        .ds-process-timeline__content {
          width: calc(100% - 100px);
          padding-bottom: 40px;
        }

        .ds-process-timeline__item:last-child .ds-process-timeline__content {
          padding-bottom: 0;
        }

        .ds-process-timeline__item:last-child .ds-process-timeline__icon {
          padding-bottom: 0;
        }

        @media screen and (max-width: 786px) {
          .ds-process-timeline__icon {
            width: 80px;
          }

          .ds-process-timeline__content {
            width: calc(100% - 80px);
          }
        }
      `}</style>
    </section>
  );
}
