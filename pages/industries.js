import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import LetteringTitle from "../components/LetteringTitle";
import Button from "../components/Button";
// import initFadeUp from "../utils/initFadeUp";
import sanityClient from "../client";
import urlFor from "../utils/urlFor";

export async function getStaticProps() {
  const content = await sanityClient.fetch(`*[_type=="industries"][0]{
    title,
    slug,
    description,
    backgroundImage,
    seo,
    industryItems[]->{
      industryTitle,
      industrySlug,
      industryDescription,
      services,
      ctaText,
      desktopImage,
      mobileImage
    },
    moreIndustries{
      title,
      items[]{
        title,
        brands
      }
    }
  }`);

  return {
    revalidate: 60,
    props: {
      content: content || null,
    },
  };
}

export default function Industries({ content }) {
  useEffect(() => {
    document.body.classList.add("industries-page");
    const navbar = document.querySelector(".navbar");

    if (navbar) {
      navbar.style.backgroundColor = "transparent";
    }

    return () => {
      document.body.classList.remove("industries-page");
      if (navbar) navbar.style.backgroundColor = "";
    };
  }, []);

  if (!content) {
    return (
      <>
        <Head>
          <title>NOCT | Industries</title>
        </Head>
        <section className="tw-bg-noct-dark tw-text-white padded-section tw-min-h-screen">
          <div className="container tw-text-center">
            <h1>Industries</h1>
            <p>Content coming soon.</p>
          </div>
        </section>
      </>
    );
  }

  const bgImage = content.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : null;
  const pageTitle = content.seo?.metaTitle || `NOCT | ${content.title}`;
  const pageDescription = content.seo?.metaDescription || content.description;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {pageDescription && (
          <meta name="description" content={pageDescription} />
        )}
      </Head>

      <div className="tw-bg-noct-dark tw-text-white">
        {/* Hero */}
        <section
          className="tw-flex tw-items-center tw-justify-center tw-min-h-0 lg:tw-min-h-[70vh] tw-pt-[128px] tw-pb-20 md:tw-pt-[168px] md:tw-pb-[100px] tw-bg-cover tw-bg-center tw-bg-no-repeat"
          style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
        >
          <div className="container tw-text-center">
            <div
              className="tw-mx-auto tw-max-w-[720px] tw-text-center"
              // data-fade-up
            >
              <h1 className="tw-mx-auto tw-mb-4 md:tw-max-w-[600px] tw-max-w-[270px] tw-text-[28px] md:tw-text-[64px] tw-leading-[130%] tw-text-white">
                <LetteringTitle text={content.title} />
              </h1>
              <p className="tw-mx-auto md:tw-max-w-[620px] tw-max-w-[300px] md:tw-text-[22px] tw-text-[14px] tw-leading-[170%] tw-text-noct-muted">
                {content.description}
              </p>
            </div>
          </div>
        </section>

        {/* Industry items — alternate text left / image left */}
        {(content.industryItems || []).map((item, index) => {
          if (!item) return null;
          const slug = item.industrySlug?.current;
          const imageOnLeft = index % 2 === 1;

          return (
            <section
              key={slug || item.industryTitle || index}
              className="tw-py-[30px] md:tw-pt-[64px]"
            >
              <div className="container">
                <div className="row align-items-center justify-content-between">
                  <div
                    className={`col-lg-5 md:mb-5 mb-[16px] ${
                      imageOnLeft ? "order-1" : "order-1 order-lg-2"
                    }`}
                    // data-fade-up
                  >
                    <div className="tw-flex tw-items-center tw-justify-center">
                      {item.desktopImage && (
                        <img
                          className="md:tw-block tw-hidden tw-w-[600px] tw-h-[480px] tw-object-contain"
                          src={urlFor(item.desktopImage).url()}
                          width={600}
                          height={480}
                          alt={
                            item.desktopImage.alt ||
                            `${item.industryTitle} desktop`
                          }
                        />
                      )}
                      {item.mobileImage && (
                        <img
                          className="md:tw-hidden tw-block"
                          src={urlFor(item.mobileImage).url()}
                          width={302}
                          height={300}
                          alt={
                            item.mobileImage.alt ||
                            `${item.industryTitle} mobile`
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={`col-lg-6 tw-text-center md:tw-text-left ${
                      imageOnLeft ? "order-2" : "order-2 order-lg-1"
                    }`}
                    // data-fade-up
                  >
                    <h3 className="text-white tw-tracking-[2%] tw-leading-[140%] tw-mb-[5px] max-sm:tw-text-[18px]">
                      {item.industryTitle}
                    </h3>
                    <p className="tw-text-[#a0a0a0] max-sm:tw-mx-auto tw-max-w-[246px] md:tw-max-w-[500px] md:tw-text-[18px] tw-text-[12px] tw-tracking-[2.1%] tw-leading-[160%] tw-font-light tw-mb-[24px]">
                      {item.industryDescription}
                    </p>
                    {item.services?.length > 0 && (
                      <ul className="tw-list-none tw-mb-[56px] tw-space-y-[16px] [&_li]:tw-mb-0 md:tw-block tw-hidden">
                        {item.services.map((service) => (
                          <li key={service} className="text-white">
                            {service}
                          </li>
                        ))}
                      </ul>
                    )}
                    {slug ? (
                      <Link href={`/industries/${slug}`}>
                        <a>
                          <Button text={item.ctaText} style="alt" />
                        </a>
                      </Link>
                    ) : (
                      <Button text={item.ctaText} style="alt" />
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* More industries */}
        {content.moreIndustries?.items?.length > 0 && (
          <section className="padded-section">
            <div className="container md:tw-space-y-[64px] tw-space-y-[40px] max-sm:tw-px-[24px]">
              <h2 className="text-white">{content.moreIndustries.title}</h2>
              <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-y-8 lg:tw-gap-y-12 tw-gap-x-[116px]">
                {content.moreIndustries.items.map((entry, i) => (
                  <div key={`${entry.title}-${i}`} className="tw-space-y-[8px]">
                    <h4 className="md:tw-text-[24px] tw-text-[14px] tw-font-bold text-white tw-leading-[130%]">
                      {entry.title}
                    </h4>
                    {entry.brands?.length > 0 && (
                      <p className="md:tw-text-[22px] tw-text-[14px] tw-tracking-[2%] tw-leading-[170%] tw-font-light tw-text-noct-brand">
                        {entry.brands.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <style jsx global>{`
        .industries-page .navbar-link {
          color: #fff;
        }

        .industries-page .navbar-active {
          background-image: url("/images/gooey-sprite-horizontal-white.png");
        }

        .industries-page .menu-icon-top,
        .industries-page .menu-icon-bottom {
          background: #fff;
        }
      `}</style>
    </>
  );
}
