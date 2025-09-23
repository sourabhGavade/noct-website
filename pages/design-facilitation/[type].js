import React, { useState, useEffect } from "react";
import Head from "next/head";
import Button from "../../components/Button";
import LetteringTitle from "../../components/LetteringTitle";
import DropdownCard from "../../components/DropdownCard";
import ImageCarousel from "../../components/ImageCarousel";
import VerticalTimeline from "../../components/VerticalTimeline";
import Service from "../../components/Service";
import initFadeUp from "../../utils/initFadeUp";
import sanityClient from "../../client";
import urlFor from "../../utils/urlFor";
import BlockContent from "@sanity/block-content-to-react";

export async function getServerSideProps(context) {
  const content = await sanityClient.fetch(
    `*[_type=="facilitation" && slug.current=="${context.params.type}"]`
  );

  return {
    props: {
      content: content[0],
    },
  };
}

export default function DesignFacilitationInner({ content }) {
  const [imageCarouselArray, setImageCarouselArray] = useState([]);

  useEffect(() => {
    initFadeUp();
    initImageCarousel();
  }, []);

  const initImageCarousel = () => {
    const arr = [];
    content.imageCarousel?.map((img) => {
      arr.push({
        url: `${urlFor(img.image).url()}`,
        width: img.width,
        ...(img.caption ? { caption: img.caption } : {}),
      });
    });
    setImageCarouselArray(arr);
  };

  return (
    <>
      <Head>
        <title>NOCT | {content.title}</title>
      </Head>

      <section
        className="network-inner-hero"
        style={{ backgroundColor: content.heroBackgroundColor }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="order-2 order-lg-1 col-lg-7">
              <div className="h1 mb-3">
                <LetteringTitle text={content.title} />
              </div>
              <p className="mb-3">{content.heroDescription}</p>
              {content.duration && (
                <div className="d-flex mb-3">
                  <div className="mr-4">
                    <div className="h6 text-uppercase">Duration :</div>
                    <p className="mb-5">{content.duration}</p>
                  </div>
                  {content.teamSize && (
                    <div>
                      <div className="h6 text-uppercase">Team Size :</div>
                      <p className="mb-5">{content.teamSize}</p>
                    </div>
                  )}
                </div>
              )}
              <a href={content.ctaLink} target="_blank">
                <Button style="normal" text="Send Enquiry" />
              </a>
            </div>
            <div className="order-1 order-lg-2 col-6 col-lg-5 mb-4 mb-lg-0">
              <img src={urlFor(content.heroImage).url()} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="padded-section pt-5">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="h2">{content.introTitle}</div>
            </div>
            <div className="col-lg-6">
              <BlockContent blocks={content.introDescription} />
            </div>
          </div>
        </div>
      </section>

      {/* Workshops */}
      {content.workshopSectionItems?.length > 0 && (
        <section className="padded-section pt-5">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="h2">{content.workshopSectionTitle}</div>
              </div>
              <div className="col-lg-6">
                {content.workshopSectionItems.map((item) => (
                  <Service
                    title={item.title}
                    desc={item.description}
                    boxContent={item.skills}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Icon Section */}
      {content.whySectionItems?.length > 0 && (
        <section className="padded-section">
          <div className="container">
            <div className="h2 mb-100">{content.whySectionTitle}</div>
            <div className="grid-3">
              {content.whySectionItems.map((item) => (
                <div key={item._key}>
                  <div
                    className={`mb-4 ${item.type === "icon-lg" ? "icon" : ""} ${
                      item.type === "icon-sm" ? "icon-sm" : ""
                    }`}
                  >
                    <img src={urlFor(item.image).url()} alt="" />
                  </div>
                  <div className="h4 mb-4">{item.title}</div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Carousel */}
      {content.imageCarousel?.length > 0 && (
        <section className="py-5">
          <div>
            <ImageCarousel animateScroll={true} imgs={imageCarouselArray} />
          </div>
        </section>
      )}

      {/* Why Do It? */}
      {content.whenSectionItems?.length > 0 && (
        <section className="padded-section">
          <div className="container">
            <div className="h2 mb-100">{content.whenSectionTitle}</div>
            <div className="grid-3">
              {content.whenSectionItems.map((item) => (
                <div key={item._key}>
                  <DropdownCard title={item.title} desc={item.description} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {content.processSectionItems?.length > 0 && (
        <section className="padded-section">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-4">
                <div className="h2">{content.processSectionTitle}</div>
              </div>
              <div className="col-lg-7">
                <VerticalTimeline items={content.processSectionItems} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Past Workshops */}
      {content.pastWorkshopsItems?.length > 0 &&
        <section className="padded-section">
          <div className="container">
            <div className="h2 mb-80">{content.pastWorkshopsTitle}</div>
            <div className="row align-items-center justify-content-center">
              {content.pastWorkshopsItems.map((item, index) => (
                <div
                  className="facilitation-grid mb-6"
                  key={item._key}
                >
                  <div className={`${index % 2 === 0 ? "" : "order-md-2"}`}>
                    <img
                      src={urlFor(item.image).url()}
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <div className="h3 mb-4">{item.title}</div>
                    <BlockContent blocks={item.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      }

      {/* Footer CTA */}
      <section className="padded-section bg-grey">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="order-lg-2 mb-5 mb-lg-0 col-8 col-lg-5">
              <img src={urlFor(content.footerImage).url()} alt="" />
            </div>
            <div className="col-lg-6">
              <div className="h3 mb-4">{content.footerText}</div>
              <a href={content.ctaLink} target="_blank">
                <Button text="Send Enquiry" style="normal" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
