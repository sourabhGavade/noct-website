import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import urlFor from "../../utils/urlFor";

/**
 * Work showcase card for industry detail pages.
 * Accent color from Sanity is applied as a bottom-up gradient behind the title.
 * Linked cards show a right arrow on the title (hover-only on desktop).
 */
export default function SelectedWorkCard({ item }) {
  if (!item) return null;

  const { title, link, comingSoon, logo, image, accentColor } = item;

  const imageSrc = image?.asset ? urlFor(image).url() : null;
  const logoSrc = logo?.asset ? urlFor(logo).url() : null;
  const accent = accentColor?.hex || "#342F1A";
  const hasLink = Boolean(link);

  const titleContent = (
    <span className="tw-inline tw-text-[14px] md:tw-text-[22px] tw-font-medium tw-leading-[160%] tw-tracking-[0.01em] tw-text-white">
      {title}
      {hasLink && (
        <HiArrowRight
          className="selected-work-card__arrow tw-ml-3 tw-inline-block tw-align-middle tw-shrink-0 tw-opacity-100 md:tw-opacity-0 md:tw-transition-opacity md:tw-duration-200 md:group-hover:tw-opacity-100"
          size={16}
          aria-hidden="true"
        />
      )}
    </span>
  );

  const cardInner = (
    <>
      <div
        role="img"
        aria-label={title}
        className="selected-work-card__media tw-relative tw-h-[320px] md:tw-h-[512px] md:tw-w-[378px] tw-w-[240px] tw-overflow-hidden tw-bg-cover tw-bg-center"
        style={{
          backgroundColor: accent,
          backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
        }}
      >
        {logoSrc && (
          <div className="tw-absolute tw-left-4 tw-top-4 md:tw-left-6 md:tw-top-6 tw-z-10">
            <img
              src={logoSrc}
              alt={logo.alt || ""}
              className="tw-h-[22px] md:tw-h-[29px] tw-w-auto tw-max-w-[160px] tw-object-contain"
            />
          </div>
        )}

        {/* Accent gradient from Sanity — transparent → solid color from bottom */}
        <div
          className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-z-[2] tw-flex tw-flex-col tw-justify-end tw-gap-3 tw-px-4 tw-pb-5 tw-pt-16 md:tw-gap-3 md:tw-px-6 md:tw-pb-7 md:tw-pt-[100px]"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${accent} 50%, ${accent} 100%)`,
          }}
        >
          {comingSoon && (
            <span className="tw-inline-block tw-w-fit tw-rounded-full tw-bg-white/15 tw-px-3 tw-py-1.5 tw-text-[9px] md:tw-text-[12px] tw-font-medium tw-uppercase tw-tracking-[7%] tw-backdrop-blur-sm">
              Coming Soon
            </span>
          )}
          {hasLink ? (
            <span className="tw-inline tw-font-bold">{titleContent}</span>
          ) : (
            <p className="tw-inline tw-font-bold">{titleContent}</p>
          )}
        </div>
      </div>
    </>
  );

  const className =
    "selected-work-card tw-group tw-block tw-shrink-0 tw-w-[240px] md:tw-w-[384px] tw-no-underline";

  if (hasLink) {
    const isExternal = /^https?:\/\//i.test(link);
    if (isExternal) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {cardInner}
        </a>
      );
    }
    return (
      <Link href={link}>
        <a className={className}>{cardInner}</a>
      </Link>
    );
  }

  return <div className={className}>{cardInner}</div>;
}
