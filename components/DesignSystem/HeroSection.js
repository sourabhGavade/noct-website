import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap/dist/gsap";
import urlFor from "../../utils/urlFor";
import LetteringTitle from "../LetteringTitle";

const LOGO_SET_COPIES = 4;

export default function HeroSection({
  title,
  trustDescription,
  trustLogos = [],
  heroVideo,
}) {
  const videoRef = useRef(null);
  const trackRef = useRef(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroVideo) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, [heroVideo]);

  return (
    <section className="tw-pt-[140px] md:tw-pt-[180px] lg:tw-pt-[152px]">
      <div className="container">
        <div className="tw-grid tw-grid-cols-1 tw-items-center tw-gap-10 lg:tw-grid-cols-2 lg:tw-gap-[48px] xl:tw-gap-[72px]">
          {/* Text */}
          <div className="tw-flex tw-flex-col">
            {title && (
              <h1 className="tw-mx-auto tw-mb-0 tw-max-w-[400px] tw-text-balance tw-text-center tw-text-[28px] tw-font-black tw-tracking-[0.18px] tw-text-noct-dark md:tw-max-w-[520px] md:tw-text-[52px] md:tw-leading-[80px] lg:tw-mx-0 lg:tw-text-left lg:tw-text-[64px]">
                <LetteringTitle text={title} />
              </h1>
            )}

            {(trustDescription || logoItems.length > 0) && (
              <div className="tw-mt-10 md:tw-mt-[64px]">
                {trustDescription && (
                  <p className="tw-mb-3 tw-text-center tw-text-[10px] tw-font-normal tw-uppercase tw-leading-[1.3] tw-tracking-[9%] tw-text-noct-muted md:tw-mb-6 md:tw-text-[12px] lg:tw-text-left">
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

          <div className="tw-w-full">
            {heroVideo && (
              <div className="hero-video tw-relative tw-aspect-[622/450] tw-w-full tw-overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                  className="tw-absolute tw-inset-0 tw-block tw-h-full tw-w-full tw-origin-center tw-scale-[1.02] tw-border-0 tw-object-cover tw-outline-none"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Safari composites <video> on its own layer and leaves a 1px
           seam. Scaling inside the clipped frame hides that edge. */
        .hero-video :global(video) {
          border: 0;
          outline: none;
          -webkit-mask-image: -webkit-radial-gradient(#fff, #000);
          mask-image: radial-gradient(#fff, #000);
        }

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
