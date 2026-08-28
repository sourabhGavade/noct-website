import urlFor from "../../utils/urlFor";

export default function AiReadableSection({
  heading,
  description,
  cards = [],
}) {
  if (!heading && !description && !cards.length) return null;

  const rows = groupCards(cards);

  return (
    <section>
      <div className="container">
        {(heading || description) && (
          <div className="tw-mx-auto tw-mb-8 tw-text-center md:tw-mb-12 lg:tw-mb-[56px]">
            {heading && (
              <h2 className="tw-mb-0 tw-text-[24px] tw-max-w-[543px] tw-mx-auto tw-font-black tw-leading-[1.25] tw-tracking-[0.13px] tw-text-noct-dark md:tw-text-[32px] md:tw-leading-[1.3] lg:tw-text-[48px] lg:tw-leading-[62px]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="tw-mb-0 tw-text-[14px] tw-max-w-[614px] tw-mx-auto tw-font-light tw-leading-[1.6] tw-tracking-[0.38px] tw-text-[#808080] tw-mt-2 md:tw-text-[18px] md:tw-leading-[28px]">
                {description}
              </p>
            )}
          </div>
        )}

        {rows.length > 0 && (
          <div className="tw-flex tw-flex-col tw-gap-4 md:tw-gap-10">
            {rows.map((row, rowIndex) => {
              if (row.layout === "stacked") {
                return (
                  <div
                    key={row.cards[0]?._key || `stacked-row-${rowIndex}`}
                    className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 md:tw-gap-10"
                  >
                    {row.cards.map((card, index) => (
                      <FeatureCard
                        key={card._key || `stacked-${rowIndex}-${index}`}
                        card={card}
                      />
                    ))}
                  </div>
                );
              }

              return (
                <FeatureCard
                  key={row.cards[0]?._key || `${row.layout}-${rowIndex}`}
                  card={row.cards[0]}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function FeatureCard({ card }) {
  if (!card) return null;

  const layout = card.layout || "split";
  const backgroundColor = card.backgroundColor || "#000000";
  const dark = isDarkColor(backgroundColor);
  const lightSurface = isNearWhite(backgroundColor);
  const imageSrc = card.image?.asset ? urlFor(card.image).url() : null;
  const imageAlt = card.image?.alt || card.title || "";
  const paragraphs = splitParagraphs(card.description);

  const titleColor = dark ? "tw-text-white" : "tw-text-noct-dark";
  const bodyColor = dark ? "tw-text-white/70" : "tw-text-[#222323]";

  if (layout === "centered") {
    return (
      <article
        className="tw-px-6 tw-py-12 md:tw-px-12 md:tw-py-16 lg:tw-px-16 lg:tw-py-[80px]"
        style={{ backgroundColor }}
      >
        <div className="tw-mx-auto tw-max-w-[720px] tw-text-center">
          {card.title && (
            <h3
              className={`tw-mb-0 tw-text-[20px] tw-font-bold tw-leading-[130%] md:tw-text-[24px] lg:tw-text-[32px] ${titleColor}`}
            >
              {card.title}
            </h3>
          )}
          {paragraphs.map((text, index) => (
            <p
              key={`${card._key}-p-${index}`}
              className={`tw-mb-0 tw-mt-3 tw-text-[14px] tw-font-light tw-leading-[1.6] tw-tracking-[0.38px] md:tw-mt-4 md:tw-text-[18px] md:tw-leading-[28px] ${bodyColor}`}
            >
              {text}
            </p>
          ))}
        </div>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="tw-mx-auto tw-mt-10 tw-block tw-h-auto tw-w-full tw-max-w-[860px] md:tw-mt-14"
          />
        )}
      </article>
    );
  }

  if (layout === "stacked") {
    return (
      <article
        className="tw-flex tw-h-full tw-flex-col tw-overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="tw-px-6 tw-pt-6 md:tw-px-8 md:tw-pt-8 lg:tw-px-10 lg:tw-pt-10">
          {card.title && (
            <h3
              className={`tw-mb-2 tw-text-[20px] tw-font-bold tw-leading-[130%] md:tw-mb-[10px] md:tw-text-[24px] lg:tw-text-[32px] ${titleColor}`}
            >
              {card.title}
            </h3>
          )}
          {paragraphs.map((text, index) => (
            <p
              key={`${card._key}-p-${index}`}
              className={`tw-mb-0 tw-text-[14px] tw-font-light tw-leading-[28px] tw-tracking-[0.02em] md:tw-text-[16px] lg:tw-text-[18px] ${bodyColor}`}
            >
              {text}
            </p>
          ))}
        </div>
        {imageSrc && (
          <div className="tw-mt-6 tw-flex tw-flex-1 tw-items-end tw-justify-end tw-pl-6 md:tw-mt-8 md:tw-pl-8 lg:tw-pl-10">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="tw-block tw-h-auto tw-w-full tw-object-contain tw-object-right-bottom"
            />
          </div>
        )}
      </article>
    );
  }

  const featured = !lightSurface;

  return (
    <article
      className="tw-p-6 md:tw-p-8 lg:tw-p-[48px]"
      style={{ backgroundColor }}
    >
      <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-gap-20 lg:tw-grid-cols-2">
        <div className={featured ? "tw-max-w-[330px]" : "tw-max-w-[462px]"}>
          {card.title && (
            <h3
              className={`tw-mb-3 tw-text-[20px] tw-font-bold tw-leading-[130%] tw-tracking-[0.13px] md:tw-mb-4 md:tw-text-[24px] lg:tw-text-[32px] ${titleColor}`}
            >
              {card.title}
            </h3>
          )}
          {paragraphs.map((text, index) => (
            <p
              key={`${card._key}-p-${index}`}
              className={`tw-mb-0 tw-text-[14px] tw-font-light tw-leading-[28px] tw-tracking-[0.02em] md:tw-text-[16px] lg:tw-text-[18px] ${
                index > 0 ? "tw-mt-4" : ""
              } ${bodyColor}`}
            >
              {text}
            </p>
          ))}
        </div>
        {imageSrc && (
          <div className="tw-w-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="tw-block tw-h-auto md:tw-w-[520px] tw-object-contain"
            />
          </div>
        )}
      </div>
    </article>
  );
}

function groupCards(cards) {
  const rows = [];
  let stacked = [];

  const flushStacked = () => {
    if (stacked.length) {
      rows.push({ layout: "stacked", cards: stacked });
      stacked = [];
    }
  };

  cards.forEach((card) => {
    const layout = card.layout || "split";
    if (layout === "stacked") {
      stacked.push(card);
    } else {
      flushStacked();
      rows.push({ layout, cards: [card] });
    }
  });

  flushStacked();
  return rows;
}

function splitParagraphs(text) {
  if (!text) return [];
  return String(text)
    .split(/\u2028|\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseHex(hex) {
  if (!hex || typeof hex !== "string") return null;
  const cleaned = hex.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((char) => char + char)
          .join("")
      : cleaned;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function luminance(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return 255;
  return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
}

function isDarkColor(hex) {
  return luminance(hex) < 150;
}

function isNearWhite(hex) {
  return luminance(hex) > 245;
}
