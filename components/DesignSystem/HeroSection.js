import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap/dist/gsap";
import urlFor from "../../utils/urlFor";
import LetteringTitle from "../LetteringTitle";

const LOGO_SET_COPIES = 4;

export default function HeroSection({
  title,
  trustDescription,
  trustLogos = [],
  heroVideo,
  heroVideoThumbnail,
}) {
  const videoRef = useRef(null);
  const trackRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailSrc = heroVideoThumbnail?.asset
    ? urlFor(heroVideoThumbnail).url()
    : null;

  const logoItems = useMemo(
    () =>
      (trustLogos || [])
        .map((logo, index) => {
          const src = logo?.asset ? urlFor(logo).url() : null;
          if (!src) return null;
          return {
            key: logo._key || `trust-logo-${index}`,
            src,
            alt: logo.alt || "",
          };
        })
        .filter(Boolean),
    [trustLogos],
  );

  const trackItems = useMemo(
    () => Array.from({ length: LOGO_SET_COPIES }, () => logoItems).flat(),
    [logoItems],
  );

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl || logoItems.length === 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    let tween;

    const setup = () => {
      tween?.kill();

      const setWidth = trackEl.scrollWidth / 2;
      if (setWidth <= 0) return;

      gsap.set(trackEl, { x: 0 });

      // ~40px/s so speed stays consistent regardless of logo count
      const duration = Math.max(12, setWidth / 40);

      tween = gsap.to(trackEl, {
        x: -setWidth,
        duration,
        ease: "none",
        repeat: -1,
      });
    };

    const raf = requestAnimationFrame(setup);
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      tween?.kill();
    };
  }, [logoItems, trackItems]);

  const handlePlay = async () => {
    if (!heroVideo || isPlaying) return;

    setIsPlaying(true);

    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="tw-pt-[140px] md:tw-pt-[180px] lg:tw-pt-[152px]">
      <div className="container">
        <div className="tw-grid tw-grid-cols-1 tw-items-center tw-gap-10 lg:tw-grid-cols-2 lg:tw-gap-[48px] xl:tw-gap-[72px]">
          {/* Text */}
          <div className="tw-flex tw-flex-col">
            {title && (
              <h1 className="tw-mb-0 tw-max-w-[400px] tw-text-balance tw-text-[28px] tw-font-black md:tw-leading-[80px] tw-tracking-[0.18px] tw-text-noct-dark md:tw-max-w-[520px] md:tw-text-[56px] lg:tw-text-[64px]">
                <LetteringTitle text={title} />
              </h1>
            )}

            {(trustDescription || logoItems.length > 0) && (
              <div className="tw-mt-10 md:tw-mt-[64px]">
                {trustDescription && (
                  <p className="tw-mb-3 md:tw-text-[12px] tw-text-[10px] tw-font-normal tw-uppercase tw-leading-[1.3] tw-tracking-[9%] tw-text-noct-muted md:tw-mb-6">
                    {trustDescription}
                  </p>
                )}

                {logoItems.length > 0 && (
                  <div className="trust-logos tw-relative tw-w-full tw-overflow-hidden">
                    <div
                      ref={trackRef}
                      className="tw-flex tw-w-max tw-items-center tw-gap-x-8 tw-will-change-transform md:tw-gap-x-10"
                    >
                      {trackItems.map((logo, index) => (
                        <img
                          key={`${logo.key}-${index}`}
                          src={logo.src}
                          alt={logo.alt}
                          className="tw-block tw-h-[20px] tw-w-auto tw-shrink-0 tw-object-contain md:tw-h-[22px]"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Video */}
          <div className="tw-w-full">
            <div className="tw-group tw-relative tw-aspect-[622/450] tw-w-full tw-overflow-hidden">
              {heroVideo && thumbnailSrc && (
                <>
                  <video
                    ref={videoRef}
                    playsInline
                    controls={isPlaying}
                    poster={thumbnailSrc || undefined}
                    onEnded={handleEnded}
                    className="tw-absolute tw-inset-0 tw-block tw-h-full tw-w-full tw-object-cover"
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>

                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={handlePlay}
                      aria-label="Play video"
                      className="tw-absolute tw-inset-0 tw-flex tw-cursor-pointer tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-0"
                    >
                      <span
                        aria-hidden="true"
                        className="tw-relative tw-z-[1] tw-flex tw-h-14 tw-w-14 tw-items-center tw-justify-center tw-rounded-full tw-bg-white/80 tw-opacity-100 tw-shadow-sm tw-transition-opacity tw-duration-200 md:tw-h-16 md:tw-w-16 md:tw-opacity-0 md:group-hover:tw-opacity-100"
                      >
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          className="tw-ml-[2px] tw-h-5 tw-w-5"
                        >
                          <path
                            d="M1.2 1.15v13.7c0 .38.14.7.41.95.27.26.58.38.94.38.11 0 .23-.02.35-.05.12-.03.24-.08.35-.15l10.9-6.85c.2-.13.35-.3.45-.5.1-.2.15-.41.15-.63s-.05-.43-.15-.63c-.1-.2-.25-.37-.45-.5L3.25.4C3.14.33 3.02.28 2.9.25 2.78.22 2.66.2 2.55.2c-.36 0-.67.13-.94.39-.27.25-.41.57-.41.95Z"
                            fill="#222323"
                          />
                        </svg>
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trust-logos {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 32px,
            #000 calc(100% - 32px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 32px,
            #000 calc(100% - 32px),
            transparent 100%
          );
        }

        @media (min-width: 768px) {
          .trust-logos {
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 48px,
              #000 calc(100% - 48px),
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 48px,
              #000 calc(100% - 48px),
              transparent 100%
            );
          }
        }
      `}</style>
    </section>
  );
}
