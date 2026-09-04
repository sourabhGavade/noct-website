import { useMemo, useState } from "react";
import Head from "next/head";
import LetteringTitle from "../components/LetteringTitle";
import FooterCTA from "../components/FooterCTA";
import ClientTestimonialCard from "../components/Clients/ClientTestimonialCard";
import VideoModal from "../components/Clients/VideoModal";
import sanityClient from "../client";
import urlFor from "../utils/urlFor";

export async function getStaticProps() {
  const content = await sanityClient.fetch(`*[_type=="clients"][0]{
    title,
    description,
    clientsWithVideos[]{
      _key,
      quote,
      name,
      designation,
      videoUrl,
      logo,
      image
    },
    logosWithText[]{
      _key,
      alt,
      caption,
      asset
    }
  }`);

  return {
    revalidate: 60,
    props: {
      content: content || null,
    },
  };
}

/**
 * Walk CMS order: video items become full-width rows;
 * non-video items are paired into two-column grids.
 */
function groupClientRows(items = []) {
  const rows = [];
  let pairBuffer = [];

  const flushPair = () => {
    if (!pairBuffer.length) return;
    rows.push({ type: "grid", items: pairBuffer });
    pairBuffer = [];
  };

  items.forEach((item) => {
    if (item?.videoUrl) {
      flushPair();
      rows.push({ type: "featured", item });
      return;
    }

    pairBuffer.push(item);
    if (pairBuffer.length === 2) flushPair();
  });

  flushPair();
  return rows;
}

export default function Clients({ content }) {
  const [activeVideo, setActiveVideo] = useState(null);

  const rows = useMemo(
    () => groupClientRows(content?.clientsWithVideos || []),
    [content?.clientsWithVideos],
  );

  const logos = content?.logosWithText || [];

  if (!content) {
    return (
      <>
        <Head>
          <title>NOCT | Clients</title>
        </Head>
        <section className="tw-bg-white tw-pt-[160px] tw-pb-20 tw-text-noct-dark tw-min-h-screen">
          <div className="container tw-text-center">
            <h1 className="tw-mb-4 tw-text-[32px] md:tw-text-[64px] tw-font-black tw-leading-[1.2]">
              Clients
            </h1>
            <p className="tw-text-[14px] md:tw-text-[18px] tw-text-noct-muted">
              Content coming soon.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>NOCT | Clients</title>
      </Head>

      <div className="tw-bg-white tw-text-noct-dark md:tw-space-y-[144px] tw-space-y-[110px] md:tw-pb-[160px] tw-pb-[40px]">
        <section className="tw-flex tw-items-center tw-justify-center tw-pt-[152px] md:tw-pt-[240px]">
          <div className="container md:tw-text-center max-sm:tw-text-left">
            <div className="tw-mx-auto">
              <h1 className="tw-mx-auto md:tw-mb-4 tw-mb-[12px] tw-text-[28px] md:tw-text-[64px] tw-font-black tw-leading-[1.2] tw-text-noct-dark">
                <LetteringTitle text={content.title} />
              </h1>
              {content.description && (
                <p className="tw-mx-auto tw-mb-0 tw-max-w-[500px] tw-text-[14px] md:tw-text-[22px] tw-font-normal tw-leading-relaxed tw-text-noct-muted">
                  {content.description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="container">
          <div className="tw-flex tw-flex-col tw-gap-[24px] md:tw-gap-[32px]">
            {rows.map((row, index) => {
              if (row.type === "featured") {
                return (
                  <div key={row.item._key || `featured-${index}`}>
                    <ClientTestimonialCard
                      item={row.item}
                      variant="featured"
                      onPlay={setActiveVideo}
                    />
                  </div>
                );
              }

              return (
                <div
                  key={
                    row.items.map((i) => i._key).join("-") || `grid-${index}`
                  }
                  className={
                    row.items.length === 1
                      ? "tw-grid tw-grid-cols-1 md:tw-max-w-[calc(50%-12px)]"
                      : "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-[24px] md:tw-gap-[32px]"
                  }
                >
                  {row.items.map((item, itemIndex) => (
                    <ClientTestimonialCard
                      key={item._key || `grid-item-${itemIndex}`}
                      item={item}
                      variant="grid"
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {logos.length > 0 && (
          <section className="md:tw-pt-[24px]">
            <div className="container">
              <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 md:tw-gap-[64px] tw-gap-[32px] max-sm:tw-gap-y-[50px]">
                {logos.map((logo, index) => {
                  const src = logo?.asset ? urlFor(logo).url() : null;
                  if (!src) return null;

                  return (
                    <div
                      key={logo._key || `logo-${index}`}
                      className="tw-flex tw-flex-col tw-items-center tw-text-center"
                    >
                      <img
                        src={src}
                        alt={logo.alt || ""}
                        className="tw-block tw-h-auto tw-w-auto tw-max-w-[150px] tw-object-contain tw-object-center md:tw-mb-8 tw-mb-4"
                      />

                      {logo.alt && (
                        <h5 className="tw-mb-[6px] tw-text-[14px] md:tw-text-[20px] tw-font-bold tw-leading-tight tw-text-noct-dark">
                          {logo.alt}
                        </h5>
                      )}
                      {logo.caption && (
                        <p className="tw-mb-0 tw-text-[12px] md:tw-text-[14px] tw-font-normal tw-leading-snug tw-text-noct-dark/40">
                          {logo.caption}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>

      <FooterCTA />

      {activeVideo && (
        <VideoModal
          videoUrl={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
