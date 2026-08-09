import urlFor from "../../utils/urlFor";

export default function ClientTestimonialCard({
  item,
  variant = "grid",
  onPlay,
}) {
  if (!item) return null;

  const logoSrc = item.logo?.asset ? urlFor(item.logo).url() : null;
  const imageSrc = item.image?.asset ? urlFor(item.image).url() : null;
  const hasVideo = Boolean(item.videoUrl);
  const isFeatured = variant === "featured";

  return (
    <article
      className={
        isFeatured
          ? "tw-h-full tw-items-center tw-bg-[#F9F9F9] tw-p-6 md:tw-p-8 lg:tw-p-12 md:tw-flex max-md:tw-space-y-[32px]"
          : "tw-flex tw-h-full tw-flex-col tw-justify-center tw-bg-[#F9F9F9] tw-p-6 md:tw-p-8 lg:tw-p-12"
      }
    >
      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-justify-center tw-gap-5 md:tw-gap-7">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={item.logo?.alt || ""}
            className="tw-block tw-h-6 md:tw-h-8 tw-w-auto tw-max-w-[160px] tw-object-contain tw-object-left md:tw-mb-5 tw-mb-3"
          />
        )}

        <p
          className={
            isFeatured
              ? "tw-text-[14px] md:tw-text-[18px] lg:tw-text-[22px] tw-font-light tw-leading-[1.45] tw-tracking-[0.01em] tw-text-[#1A1A1A]"
              : "tw-text-[14px] md:tw-text-[18px] lg:tw-text-[22px] tw-font-light tw-leading-[1.5] tw-tracking-[0.01em] tw-text-[#1A1A1A]"
          }
        >
          {item.quote}
        </p>

        <div>
          <div
            aria-hidden="true"
            className="tw-mb-4 md:tw-mb-5 tw-h-px tw-w-12 tw-bg-noct-dark/20"
          />
          <h5 className="tw-mb-1 tw-text-[14px] md:tw-text-[20px] tw-font-bold tw-leading-tight tw-text-noct-dark">
            {item.name}
          </h5>
          <p className="tw-mb-0 tw-text-[12px] md:tw-text-[14px] tw-font-normal tw-leading-snug tw-text-noct-dark/45">
            {item.designation}
          </p>
        </div>
      </div>

      {isFeatured && imageSrc && (
        <div className="tw-w-full">
          <div className="tw-relative tw-mx-auto tw-aspect-square tw-w-full tw-overflow-hidden tw-bg-[#e8e8e8] md:tw-size-[372px]">
            <img
              src={imageSrc}
              alt={item.image?.alt || item.name || ""}
              className="tw-block tw-h-full tw-w-full tw-object-cover"
            />
            {hasVideo && (
              <button
                type="button"
                aria-label={`Play video testimonial from ${item.name}`}
                onClick={() => onPlay?.(item.videoUrl)}
                className="tw-absolute tw-bottom-3 tw-right-3 md:tw-bottom-5 md:tw-right-5 tw-cursor-pointer tw-border-0 tw-bg-transparent tw-p-0 tw-transition-transform tw-duration-200 hover:tw-scale-105"
              >
                <img
                  src="/play-button.svg"
                  alt=""
                  aria-hidden="true"
                  className="tw-block tw-h-[42px] md:tw-h-[56px] tw-w-auto"
                />
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
