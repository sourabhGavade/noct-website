import urlFor from "../../utils/urlFor";
import LetteringTitle from "../LetteringTitle";

export default function HeroSection({
  title,
  trustDescription,
  trustLogos = [],
  heroVideo,
  heroVideoThumbnail,
}) {
  const thumbnailSrc = heroVideoThumbnail?.asset
    ? urlFor(heroVideoThumbnail).url()
    : null;

  return (
    <section className="tw-pt-[140px] md:tw-pt-[180px] lg:tw-pt-[152px]">
      <div className="container">
        <div className="tw-grid tw-grid-cols-1 tw-items-center tw-gap-10 lg:tw-grid-cols-2 lg:tw-gap-[48px] xl:tw-gap-[72px]">
          <div className="tw-flex tw-flex-col">
            {title && (
              <h1 className="tw-mb-0 tw-max-w-[400px] tw-text-[28px] tw-font-black md:tw-leading-[80px] tw-tracking-[0.18px] tw-text-noct-dark md:tw-max-w-[520px] md:tw-text-[56px] lg:tw-text-[64px]">
                <LetteringTitle text={title} />
              </h1>
            )}

            {(trustDescription || trustLogos.length > 0) && (
              <div className="tw-mt-10 md:tw-mt-[64px]">
                {trustDescription && (
                  <p className="tw-mb-5 tw-text-[12px] md:tw-text-[14px] tw-font-light tw-uppercase tw-leading-[24px] tw-tracking-[9%] tw-text-noct-muted md:tw-mb-6">
                    {trustDescription}
                  </p>
                )}

                {trustLogos.length > 0 && (
                  <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-6 tw-gap-y-4 md:tw-gap-x-8">
                    {trustLogos.map((logo, index) => {
                      const src = logo?.asset ? urlFor(logo).url() : null;
                      if (!src) return null;

                      return (
                        <img
                          key={logo._key || `trust-logo-${index}`}
                          src={src}
                          alt={logo.alt || ""}
                          className="tw-block tw-h-[20px] tw-w-auto tw-max-w-[70px] tw-object-contain md:tw-h-[22px] md:tw-max-w-[99px]"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="tw-w-full">
            <div className="tw-relative tw-aspect-[622/450] tw-w-full tw-overflow-hidden tw-bg-[#D9D9D9]">
              {heroVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={thumbnailSrc || undefined}
                  className="tw-absolute tw-inset-0 tw-block tw-h-full tw-w-full tw-object-cover"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
              ) : thumbnailSrc ? (
                <img
                  src={thumbnailSrc}
                  alt={heroVideoThumbnail?.alt || ""}
                  className="tw-absolute tw-inset-0 tw-block tw-h-full tw-w-full tw-object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
