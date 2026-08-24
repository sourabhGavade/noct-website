import Head from "next/head";
import sanityClient from "../client";
import HeroSection from "../components/DesignSystem/HeroSection";
import FeaturesSection from "../components/DesignSystem/FeaturesSection";
import MainVideoSection from "../components/DesignSystem/MainVideoSection";
import OverviewSection from "../components/DesignSystem/OverviewSection";
import FooterCTA from "../components/FooterCTA";

export async function getStaticProps() {
  const content = await sanityClient.fetch(`*[_type=="designSystem"][0]{
    title,
    slug,
    trustDescription,
    trustLogos[]{
      _key,
      alt,
      caption,
      asset
    },
    heroVideo,
    heroVideoThumbnail{
      alt,
      caption,
      asset
    },
    features[]{
      _key,
      alt,
      caption,
      asset
    },
    mainVideo,
    overview{
      heading,
      description,
      items[]{
        _key,
        title,
        description,
        image{
          alt,
          caption,
          asset
        }
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

export default function DesignSystem({ content }) {
  if (!content) {
    return (
      <>
        <Head>
          <title>NOCT | Design System</title>
        </Head>
        <section className="tw-min-h-screen tw-bg-white tw-pb-20 tw-pt-[160px] tw-text-noct-dark">
          <div className="container tw-text-center">
            <h1 className="tw-mb-4 tw-text-[32px] tw-font-black tw-leading-[1.2] md:tw-text-[64px]">
              Design System
            </h1>
            <p className="tw-text-[14px] tw-text-noct-muted md:tw-text-[18px]">
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
        <title>NOCT | Design System</title>
      </Head>

      <div className="tw-bg-white tw-text-noct-dark tw-space-y-[80px] md:tw-space-y-[163px]">
        <HeroSection
          title={content.title}
          trustDescription={content.trustDescription}
          trustLogos={content.trustLogos}
          heroVideo={content.heroVideo}
          heroVideoThumbnail={content.heroVideoThumbnail}
        />

        <FeaturesSection features={content.features} />

        <MainVideoSection videoUrl={content.mainVideo} />

        <OverviewSection
          heading={content.overview?.heading}
          description={content.overview?.description}
          items={content.overview?.items}
        />

        <FooterCTA />
      </div>
    </>
  );
}
