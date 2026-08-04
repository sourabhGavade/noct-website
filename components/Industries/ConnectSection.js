import Link from "next/link";
import urlFor from "../../utils/urlFor";

/**
 * Final connect / CTA card for industry detail pages.
 * Heading + engagement list on the left, illustration on the right.
 */
export default function ConnectSection({
  heading,
  items = [],
  image,
  cta,
}) {
  if (!heading && !items?.length && !image && !cta) return null;

  const imageSrc = image?.asset ? urlFor(image).url() : null;
  const href = cta?.href || "/contact";
  const label = cta?.text || "Let's Connect";
  const isExternal = /^https?:\/\//i.test(href);

  const buttonClassName =
    "tw-uppercase md:tw-text-[14px] tw-text-[12px] tw-bg-transparent tw-text-white tw-tracking-[1.58px] tw-leading-[18px] tw-border-white tw-border-[0.5px] md:tw-px-[40px] md:tw-py-[16px] tw-px-[32px] tw-py-[11px]";

  const buttonEl = <button className={buttonClassName}>{label}</button>;

  const button = isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {buttonEl}
    </a>
  ) : (
    <Link href={href}>{buttonEl}</Link>
  );

  return (
    <section className="connect-section tw-bg-noct-dark tw-pb-16 md:tw-pb-24 lg:tw-pb-28 tw-pt-8 md:tw-pt-12 tw-text-white">
      <div className="container">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-10 lg:tw-gap-16 tw-items-center tw-border tw-border-white/10 tw-bg-[#1E1E1E] tw-px-6 tw-py-10 md:tw-px-12 md:tw-py-14 lg:tw-px-16 lg:tw-py-16">
          <div className="tw-flex tw-flex-col tw-items-start">
            {heading && (
              <h2 className="tw-mb-6 md:tw-mb-8 tw-max-w-[520px] tw-text-[28px] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
                {heading}
              </h2>
            )}

            {items?.length > 0 && (
              <ul className="connect-section__list tw-mb-8 md:tw-mb-10 tw-list-none tw-p-0 tw-m-0 tw-flex tw-w-full tw-flex-col tw-gap-2 md:tw-gap-2.5 tw-text-left">
                {items.map((item, index) => (
                  <li
                    key={`connect-item-${index}`}
                    className="tw-m-0 tw-ml-0 tw-pl-0 tw-text-left tw-text-[14px] md:tw-text-[16px] lg:tw-text-[18px] tw-font-light tw-leading-[1.5] tw-tracking-[0.01em] tw-text-noct-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {button}
          </div>

          {imageSrc && (
            <div className="tw-flex tw-items-center tw-justify-center lg:tw-justify-end">
              <img
                src={imageSrc}
                alt={image?.alt || ""}
                className="tw-w-full tw-max-w-[480px] lg:tw-max-w-[520px] tw-h-auto tw-object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .connect-section__list :global(li) {
          margin-left: 0 !important;
          margin-bottom: 0 !important;
          padding-left: 0 !important;
          text-align: left;
        }
      `}</style>
    </section>
  );
}
