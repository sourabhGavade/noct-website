import { useMemo } from "react";
import urlFor from "../../utils/urlFor";

/**
 * Infinite auto-scrolling logo marquee.
 * Duplicates the logo set 3× so the loop is seamless.
 */
export default function LogoCarousel({ heading, logos = [] }) {
  const track = useMemo(() => {
    if (!logos?.length) return [];
    return [...logos, ...logos];
  }, [logos]);

  if (!logos?.length) return null;

  return (
    <section className="logo-carousel tw-overflow-hidden tw-py-8 md:tw-py-16">
      {heading && (
        <p className="tw-mb-8 md:tw-mb-[45px] max-sm:tw-max-w-[170px] mx-auto tw-text-center tw-text-[12px] tw-font-light tw-uppercase tw-tracking-[7%] tw-leading-[140%] tw-text-noct-muted">
          {heading}
        </p>
      )}

      <div className="logo-carousel__viewport tw-relative tw-w-full tw-overflow-hidden">
        <div className="logo-carousel__track tw-flex tw-w-max tw-items-center">
          {track.map((logo, index) => {
            const src = logo ? urlFor(logo).url() : null;
            if (!src) return null;
            return (
              <div
                key={`${logo._key || logo.asset?._ref || "logo"}-${index}`}
                className="logo-carousel__item tw-flex tw-shrink-0 tw-items-center tw-justify-center tw-px-6 md:tw-px-[72px]"
              >
                <img
                  src={src}
                  alt={logo.alt || ""}
                  className="tw-h-[15px] md:tw-h-[36px] tw-w-auto tw-max-w-[70px] md:tw-max-w-[120px] tw-object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .logo-carousel__track {
          animation: logo-marquee 60s linear infinite;
        }

        .logo-carousel__track:hover {
          animation-play-state: paused;
        }

        @keyframes logo-marquee {
          from {
            transform: translateX(0);
          }
          to {
            /* 3 sets → shift by exactly one set (33.333%) */
            transform: translateX(-33.333%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-carousel__track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
