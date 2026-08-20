import { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import sanityClient from "../../client";
import LogoCarousel from "../../components/Industries/LogoCarousel";
import ChallengeSection from "../../components/Industries/ChallengeSection";
import ConnectSection from "../../components/Industries/ConnectSection";
import SelectedWorkCarousel from "../../components/Industries/SelectedWorkCarousel";
import HelpSection from "../../components/Industries/HelpSection";
import TestimonialSection from "../../components/Industries/TestimonialSection";

// ExpertiseSection is client-only
const ExpertiseSection = dynamic(
  () => import("../../components/Industries/ExpertiseSection"),
  { ssr: false },
);

export async function getStaticPaths() {
  const slugs = await sanityClient.fetch(
    `*[_type=="industryItem" && defined(industrySlug.current)].industrySlug.current`,
  );

  return {
    paths: (slugs || []).map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const industry = await sanityClient.fetch(
    `*[_type=="industryItem" && industrySlug.current==$slug][0]{
      industryTitle,
      industrySlug,
      industryDescription,
      seo,
      industryItemMoreDetails{
        mainSubtitle,
        mainDescription,
        trustedByHeading,
        trustedBy[]{
          ...,
          asset->
        },
        workHeading,
        workItems[]{
          ...,
          logo{
            ...,
            asset->
          },
          image{
            ...,
            asset->
          }
        },
        helpHeading,
        helpItems[]{
          ...,
          image{
            ...,
            asset->
          }
        },
        expertiseHeading,
        expertiseItems,
        testimonialHeading,
        testimonialItems[]{
          ...,
          logo{
            ...,
            asset->
          },
          image{
            ...,
            asset->
          }
        },
        challengeHeading,
        challengeItems[]{
          ...,
          logo{
            ...,
            asset->
          }
        },
        connectHeading,
        connectImage{
          ...,
          asset->
        },
        connectItems,
        cta
      }
    }`,
    { slug: params.slug },
  );

  if (!industry) {
    return { notFound: true };
  }

  return {
    revalidate: 60,
    props: {
      industry,
    },
  };
}

export default function IndustryPage({ industry }) {
  const details = industry?.industryItemMoreDetails || {};

  useEffect(() => {
    document.body.classList.add("industries-page", "industry-detail-page");
    const navbar = document.querySelector(".navbar");

    if (navbar) {
      navbar.style.backgroundColor = "transparent";
    }

    return () => {
      document.body.classList.remove("industries-page", "industry-detail-page");
      if (navbar) navbar.style.backgroundColor = "";
    };
  }, []);

  const pageTitle =
    industry.seo?.metaTitle || `NOCT | ${industry.industryTitle}`;
  const pageDescription =
    industry.seo?.metaDescription ||
    details.mainDescription ||
    industry.industryDescription;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {pageDescription && (
          <meta name="description" content={pageDescription} />
        )}
      </Head>

      <div className="tw-relative tw-bg-noct-dark tw-text-white">
        {/* Hero */}
        <section className="tw-relative tw-flex tw-items-center tw-min-h-[50vh] md:tw-min-h-[80vh] md:tw-pt-[160px] tw-pt-[150px] tw-pb-20 md:tw-pb-[100px]">
          {/* Anchored to section top so it bleeds behind the transparent navbar */}
          <img
            src="/graphic.svg"
            alt="background graphic"
            aria-hidden="true"
            className="tw-pointer-events-none tw-absolute tw-right-0 tw-top-0 tw-z-0 tw-hidden tw-w-[min(75vw,640px)] tw-max-w-none tw-select-none md:tw-block"
          />
          <img
            src="/graphic-mobile.svg"
            alt="background graphic"
            aria-hidden="true"
            className="tw-pointer-events-none tw-absolute tw-right-0 tw-top-10 tw-z-0 tw-block tw-w-[min(55vw,195px)] tw-max-w-none tw-select-none md:tw-hidden"
          />

          <div className="container tw-relative sm:tw-z-10">
            <div className="md:tw-max-w-[720px] tw-max-w-[342px] tw-space-y-[12px]">
              <p className="tw-text-[12px] md:tw-text-[14px] tw-font-light tw-uppercase tw-tracking-[7%] tw-leading-[160%] tw-text-noct-muted">
                {industry.industryTitle}
              </p>
              <h1 className="tw-text-[28px] mb-0 md:tw-text-[56px] lg:tw-text-[64px] tw-leading-[130%] tw-tracking-[0.28%] tw-text-white">
                {details.mainSubtitle}
              </h1>
              <p className="tw-text-[14px] md:tw-text-[18px] lg:tw-text-[22px] tw-font-light tw-leading-[170%] tw-tracking-[2%] tw-text-noct-muted">
                {details.mainDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Trusted By — auto logo carousel */}
        <LogoCarousel
          heading={details.trustedByHeading}
          logos={details.trustedBy}
        />

        {/* Selected Work — manual arrow carousel */}
        <SelectedWorkCarousel
          heading={details.workHeading}
          items={details.workItems}
        />

        {/* How we can help — scroll-pinned reveal */}
        <HelpSection heading={details.helpHeading} items={details.helpItems} />

        {/* Our expertise — alternating marquee rows */}
        <ExpertiseSection
          heading={details.expertiseHeading}
          items={details.expertiseItems}
        />

        {/* Testimonials — portrait + quotes carousel */}
        <TestimonialSection
          heading={details.testimonialHeading}
          items={details.testimonialItems}
        />

        {/* Challenges — accordion cards (same as services) */}
        <ChallengeSection
          heading={details.challengeHeading}
          items={details.challengeItems}
        />

        {/* Connect — final CTA card */}
        <ConnectSection
          heading={details.connectHeading}
          items={details.connectItems}
          image={details.connectImage}
          cta={details.cta}
        />
      </div>

      <style jsx global>{`
        .industry-detail-page .navbar {
          background-color: transparent !important;
        }

        .industry-detail-page .navbar-link {
          color: #fff;
        }

        .industry-detail-page .navbar-active {
          background-image: url("/images/gooey-sprite-horizontal-white.png");
        }

        .industry-detail-page .menu-icon-top,
        .industry-detail-page .menu-icon-bottom {
          background: #fff;
        }
      `}</style>
    </>
  );
}
