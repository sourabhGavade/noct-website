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
    <>
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
                  className="client-play-blob tw-absolute tw-bottom-3 tw-right-3 md:tw-bottom-5 md:tw-right-5 tw-flex tw-cursor-pointer tw-items-center tw-justify-center tw-border-0 tw-p-0"
                >
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    aria-hidden="true"
                    className="tw-relative tw-z-[1] tw-ml-[2px] tw-h-[12px] tw-w-[10px] md:tw-h-[16px] md:tw-w-[14px]"
                  >
                    <path
                      d="M1.2 1.15v13.7c0 .38.14.7.41.95.27.26.58.38.94.38.11 0 .23-.02.35-.05.12-.03.24-.08.35-.15l10.9-6.85c.2-.13.35-.3.45-.5.1-.2.15-.41.15-.63s-.05-.43-.15-.63c-.1-.2-.25-.37-.45-.5L3.25.4C3.14.33 3.02.28 2.9.25 2.78.22 2.66.2 2.55.2c-.36 0-.67.13-.94.39-.27.25-.41.57-.41.95Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </article>
      <style jsx>{`
        .client-play-blob {
          width: 42px;
          height: 42px;
          background-color: rgba(255, 255, 255, 0.75);
          border-radius: 45% 55% 39% 56% / 57% 54% 46% 43%;
          animation: client-play-blob 2.5s linear infinite running;
        }

        @media (min-width: 768px) {
          .client-play-blob {
            width: 56px;
            height: 56px;
          }
        }

        @keyframes client-play-blob {
          0% {
            border-radius: 30% 70% 38% 62% / 47% 37% 63% 53%;
          }
          20% {
            border-radius: 42% 58% 58% 42% / 34% 41% 59% 66%;
          }
          40% {
            border-radius: 56% 44% 62% 38% / 44% 22% 78% 56%;
          }
          60% {
            border-radius: 60% 40% 38% 62% / 52% 35% 65% 48%;
          }
          80% {
            border-radius: 60% 40% 49% 51% / 52% 61% 39% 48%;
          }
          100% {
            border-radius: 30% 70% 38% 62% / 47% 37% 63% 53%;
          }
        }
      `}</style>
    </>
  );
}
