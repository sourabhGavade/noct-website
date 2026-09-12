import Head from "next/head";
import sanityClient from "../client";
import HeroSection from "../components/DesignSystem/HeroSection";
import FeaturesSection from "../components/DesignSystem/FeaturesSection";
import MainVideoSection from "../components/DesignSystem/MainVideoSection";
import OverviewSection from "../components/DesignSystem/OverviewSection";
import AiReadableSection from "../components/DesignSystem/AiReadableSection";
import EngagementModelsSection from "../components/DesignSystem/EngagementModelsSection";
import VerticalTimeline from "../components/VerticalTimeline";
import { DesignSystemFooterCTA } from "../components/FooterCTA";

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
    },
    aiReadable{
      heading,
      description,
      cards[]{
        _key,
        title,
        description,
        backgroundColor,
        layout,
        image{
          alt,
          caption,
          asset
        }
      }
    },
    process{
      heading,
      steps[]{
        _key,
        title,
        description,
        icon{
          alt,
          caption,
          asset
        }
      }
    },
    engagementModels{
      heading,
      subtitle,
      models[]{
        _key,
        title,
        description,
        includes,
        idealForLabel,
        idealForLogos[]{
          _key,
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
        <section className="tw-min-h-screen tw-bg-[#FCFCFC] tw-pb-20 tw-pt-[160px] tw-text-noct-dark">
          <div className="container tw-text-center">
            <h1 className="tw-mb-4 tw-text-balance tw-text-[32px] tw-font-black tw-leading-[1.2] md:tw-text-[64px]">
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

      <div className="tw-bg-[#FCFCFC] tw-text-noct-dark tw-space-y-[117px] md:tw-space-y-[160px]">
        <HeroSection
          title={content.title}
          trustDescription={content.trustDescription}
          trustLogos={content.trustLogos}
          heroVideo={content.heroVideo}
          heroVideoThumbnail={content.heroVideoThumbnail}
        />

        <FeaturesSection features={content.features} />

        <MainVideoSection videoUrl={content.mainVideo} />

        {/* <OverviewSection
          heading={content.overview?.heading}
          description={content.overview?.description}
          items={content.overview?.items}
        /> */}

        <AiReadableSection
          heading={content.aiReadable?.heading}
          description={content.aiReadable?.description}
          cards={content.aiReadable?.cards}
        />
        <div className="tw-bg-white md:tw-pt-[120px] tw-pt-[60px] tw-space-y-[117px] md:tw-space-y-[160px]">
          {(content.process?.heading || content.process?.steps?.length > 0) && (
            <section>
              <div className="container">
                <div className="row justify-content-between">
                  {content.process?.heading && (
                    <div className="col-lg-4">
                      <div
                        className={`h2 ${
                          content.process.steps?.length > 5 ? "sticky" : ""
                        }`}
                      >
                        {content.process.heading}
                      </div>
                    </div>
                  )}
                  {content.process?.steps?.length > 0 && (
                    <div className="col-lg-7">
                      <VerticalTimeline
                        lineTop="28px"
                        items={content.process.steps.map((step) => ({
                          _key: step._key,
                          title: step.title,
                          description: step.description,
                          image: step.icon,
                        }))}
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          <EngagementModelsSection
            heading={content.engagementModels?.heading}
            subtitle={content.engagementModels?.subtitle}
            models={content.engagementModels?.models}
          />
        </div>

        <DesignSystemFooterCTA />
      </div>
    </>
  );
}
