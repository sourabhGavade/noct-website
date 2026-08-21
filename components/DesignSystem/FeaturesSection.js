import urlFor from "../../utils/urlFor";

export default function FeaturesSection({ features = [] }) {
  if (!features.length) return null;

  return (
    <section>
      <div className="container">
        <div className="tw-grid tw-grid-cols-1 tw-gap-10 md:tw-grid-cols-3 md:tw-gap-8 lg:tw-gap-x-[72px] lg:tw-gap-y-[96px]">
          {features.map((item, index) => (
            <FeatureCard key={item._key || `feature-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ item }) {
  if (!item) return null;

  const src = item.asset ? urlFor(item).url() : null;

  return (
    <article>
      {src && (
        <img
          src={src}
          alt={item.alt || ""}
          className="tw-mb-5 tw-block tw-h-auto tw-w-full md:tw-mb-[30px]"
        />
      )}
      {item.alt && (
        <h4 className="tw-mb-2 tw-text-[18px] tw-font-bold tw-leading-[140%] tw-tracking-[0.01em] md:tw-mb-[8px] md:tw-text-[24px]">
          {item.alt}
        </h4>
      )}
      {item.caption && (
        <p className="tw-mb-0 tw-text-[14px] tw-font-light tw-leading-[160%] tw-tracking-[0.02em] md:tw-text-[18px]">
          {item.caption}
        </p>
      )}
    </article>
  );
}
