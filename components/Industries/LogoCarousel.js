import { useMemo } from "react";
import urlFor from "../../utils/urlFor";

/**
 * Infinite auto-scrolling logo marquee.
 * Duplicates the logo set 3× so the loop is seamless.
 */
export default function LogoCarousel({ heading, logos = [] }) {
  const track = useMemo(() => {
    if (!logos?.length) return [];
    return [...logos, ...logos, ...logos];
  }, [logos]);

  if (!logos?.length) return null;

  return (
    <section className="logo-carousel tw-overflow-hidden tw-pb-8 md:tw-pb-16">
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
                className="logo-carousel__item tw-flex tw-shrink-0 tw-items-center tw-justify-center md:tw-px-6 tw-px-3"
              >
                <img
                  src={src}
                  alt={logo.alt || ""}
                  width={133}
                  height={40}
                  className="md:tw-h-[40px] md:tw-w-[133px] tw-object-contain"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .logo-carousel__track {
          animation: logo-marquee 10s linear infinite;
        }

        @media (min-width: 768px) {
          .logo-carousel__track {
            animation: logo-marquee 50s linear infinite;
          }
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
