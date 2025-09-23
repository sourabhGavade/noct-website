import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FooterCTA from "../components/FooterCTA";
import LetteringTitle from "../components/LetteringTitle";
import Service from "../components/Service";
import TestimonialCard from "../components/TestimonialCard";
import ButtonLink from "../components/ButtonLink";
import initFadeUp from "../utils/initFadeUp";
import sanityClient from '../client'
import urlFor from '../utils/urlFor'

export async function getStaticProps() {
  const content = await sanityClient.fetch(`*[_type=="services"][0]`);

  return {
    revalidate: 60,
    props: {
      content,
    },
  };
}

export default function Services({ content }) {
  // Mobile Carousel Dots Index
  const [mcIndex, setMcIndex] = useState(0);

  useEffect(() => {
    document.querySelector(".navbar-active").classList.add("active-page");
    initFadeUp();
    initParallax();
    initServiceFadeIn();
    initMobileCarousel();

    return () => {
      document.querySelector(".navbar-active").classList.remove("active-page");
      ScrollTrigger.getAll("serviceScrollTrigger").forEach((st) => st.kill());
    };
  }, []);

  const initMobileCarousel = () => {
    const scroller = document.querySelector(".mobile-carousel");
    document
      .querySelector(".mobile-carousel")
      .addEventListener("scroll", () => {
        const index = Math.round(
          (scroller.scrollLeft / scroller.scrollWidth) * content.collaboration.length
        );
        const itemWidth = scroller.scrollWidth / content.collaboration.length;
        if (scroller.scrollLeft <= itemWidth * (content.collaboration.length - 2) + 40) {
          setMcIndex(index);
        } else {
          setMcIndex(content.collaboration.length - 1);
        }
      });
  };

  const initParallax = () => {
    gsap.to(".services-fixed-1", {
      scrollTrigger: {
        trigger: ".services-hero-section",
        start: "top top",
        scrub: true,
      },
      x: 700,
      scale: 2,
      ease: "Power1.easeIn",
    });
    gsap.to(".services-hero-banner", {
      scrollTrigger: {
        trigger: ".services-hero-section",
        start: "top top",
        scrub: 0.5,
      },
      y: -200,
    });
  };

  const initServiceFadeIn = () => {
    gsap.from(`.services-container-1`, {
      scrollTrigger: {
        trigger: `.services-container-1`,
        start: "top 80%",
        onEnter: () => {
          TweenMax.staggerFrom(
            `.service-trigger-1`,
            0.4,
            { opacity: 0, y: 40, delay: 0.2 },
            0.06
          );
        },
      },
      opacity: 0,
      y: 40,
      duration: 0.4,
      delay: 0.1,
      ease: "ease",
      id: "serviceScrollTrigger",
    });

    gsap.from(`.services-container-2`, {
      scrollTrigger: {
        trigger: `.services-container-2`,
        start: "top 80%",
        onEnter: () => {
          TweenMax.staggerFrom(
            `.service-trigger-2`,
            0.4,
            { opacity: 0, y: 40, delay: 0.2 },
            0.06
          );
        },
      },
      opacity: 0,
      y: 40,
      duration: 0.4,
      delay: 0.1,
      ease: "ease",
      id: "serviceScrollTrigger",
    });

    gsap.from(`.services-container-3`, {
      scrollTrigger: {
        trigger: `.services-container-3`,
        start: "top 80%",
        onEnter: () => {
          TweenMax.staggerFrom(
            `.service-trigger-3`,
            0.4,
            { opacity: 0, y: 40, delay: 0.2 },
            0.06
          );
        },
      },
      opacity: 0,
      y: 40,
      duration: 0.4,
      delay: 0.1,
      ease: "ease",
      id: "serviceScrollTrigger",
    });
  };

  return (
    <>
      <Head>
        <title>NOCT | Services</title>
      </Head>

      {/* Services - Hero */}
      <section className="services-hero-section hero-section flex-center">
        <div className="hero-fixed-banner services-hero-banner">
          Our Services
        </div>
        <div className="services-fixed-elements">
          <div className="services-fixed-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="194" height="194">
              <circle
                cx="97"
                cy="97"
                r="97"
                fill="#bedcce"
                fillRule="evenodd"
                opacity=".3"
              />
            </svg>
          </div>
        </div>
        <div className="container">
          <div className="row w-100">
            <div className="col-12 col-lg-6">
              <h1 className="pr-4">
                <LetteringTitle text="What wonderful things we could do together" />
              </h1>
            </div>
            <div className="col-12 col-lg-6">
              <p className="lg" data-fade-up>
                We believe in partnerships; we work with you and your team to
                design things that outlive our engagement and are built to last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Research & Strategy */}
      <section className="padded-section">
        <div className="container services-container-1">
          <div className="row">
            <div className="col-12 col-lg-6 text-left text-lg-right order-1 order-lg-2 mb-3 mb-lg-0">
              <video
                style={{ maxWidth: "500px" }}
                className="illustration-video"
                autoPlay
                loop
                playsInline
                muted
                src="/images/services/services-strategy.mp4"
              ></video>
            </div>
            <div className="col-12 col-lg-6 order-2 order-lg-1">
              <div className="mb-4">
                <div className="h2 mb-2">Research &amp; Strategy</div>
                <p>
                  Understanding and defining things clearly is the key to
                  analysis and decision making for strong strategy and
                  meaningful design.
                </p>
              </div>
              {
                content.researchStrategy.map(item => (
                  <div className='service-trigger-1' key={item._key}>
                    <Service
                      title={item.title}
                      desc={item.description}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Services - Digital Product Design */}
      <section className="padded-section">
        <div className="container services-container-2">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <video
                style={{ maxWidth: "460px" }}
                className="illustration-video"
                autoPlay
                loop
                playsInline
                muted
                src="/images/services/services-digital.mp4"
              ></video>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <div className="h2 mb-2">Digital Product Design</div>
                <p>
                  We make digital more human by crafting websites and products
                  that bring delight to both people and the organisations behind
                  them.
                </p>
              </div>
              {
                content.productDesign.map(item => (
                  <div className='service-trigger-2' key={item._key}>
                    <Service
                      title={item.title}
                      desc={item.description}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Services - Branding & Communication */}
      <section className="padded-section">
        <div className="container services-container-3">
          <div className="row">
            <div className="col-12 col-lg-6 text-left text-lg-right order-1 order-lg-2 mb-3 mb-lg-0">
              <video
                style={{
                  maxWidth: "500px",
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 99%, 0% 99%)",
                }}
                className="illustration-video"
                autoPlay
                loop
                playsInline
                muted
                src="/images/services/services-branding.mp4"
              ></video>
            </div>
            <div className="col-12 col-lg-6 order-2 order-lg-1">
              <div className="mb-4">
                <div className="h2 mb-2">Brand &amp; Communication</div>
                <p>
                  Creating a brand is like building a human and communicating as
                  a brand is like being true to its nature.
                </p>
              </div>
              {
                content.brandCommunication.map(item => (
                  <div className='service-trigger-3' key={item._key}>
                    <Service
                      title={item.title}
                      desc={item.description}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Audits CTA */}
      <section className="pb-5">
        <div className="container">
          <div className="row" data-fade-up>
            <div className="col-lg-5 mr-md-auto mb-4 mb-lg-0">
              <div className="audit-cta p-4 p-lg-5 bg-light-orange">
                <div className="h6 mb-3 orange text-uppercase">
                  UX Design Audit
                </div>
                <div className="cta-text">
                  Don't know where to start with your product, or not sure how
                  to take it forward? We can help.
                </div>
                <Link href="/contact">
                  <a>
                    <ButtonLink text="Contact Us" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="audit-cta p-4 p-lg-5 bg-light-purple">
                <div className="h6 mb-3 purple text-uppercase">Brand Audit</div>
                <div className="cta-text">
                  Not sure how your brand is performing or if everything is in
                  line with your vision? Let us help you find out
                </div>
                <Link href="/contact">
                  <a>
                    <ButtonLink text="Contact Us" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Testimonials */}
      <section className="padded-section">
        <div className="container" data-fade-up>
          <div className="h2 mb-6">We understand your challenges</div>
          <div className="testimonial-grid grid-3">
            <div>
              <TestimonialCard
                problem={content.challenges[0].problem}
                solution={content.challenges[0].solution}
                logo={urlFor(content.challenges[0].logo).url()}
                ctaLink={content.challenges[0].link}
              />
              <TestimonialCard
                problem={content.challenges[1].problem}
                solution={content.challenges[1].solution}
                logo={urlFor(content.challenges[1].logo).url()}
                ctaLink={content.challenges[1].link}
              />
              <TestimonialCard
                problem={content.challenges[2].problem}
                solution={content.challenges[2].solution}
                logo={urlFor(content.challenges[2].logo).url()}
                ctaLink={content.challenges[2].link}
              />
            </div>
            <div>
              <TestimonialCard
                problem={content.challenges[3].problem}
                solution={content.challenges[3].solution}
                logo={urlFor(content.challenges[3].logo).url()}
                ctaLink={content.challenges[3].link}
              />
              <TestimonialCard
                problem={content.challenges[4].problem}
                solution={content.challenges[4].solution}
                logo={urlFor(content.challenges[4].logo).url()}
                ctaLink={content.challenges[4].link}
              />
              <TestimonialCard
                problem={content.challenges[5].problem}
                solution={content.challenges[5].solution}
                logo={urlFor(content.challenges[5].logo).url()}
                ctaLink={content.challenges[5].link}
              />
            </div>
            <div>
              <TestimonialCard
                problem={content.challenges[6].problem}
                solution={content.challenges[6].solution}
                logo={urlFor(content.challenges[6].logo).url()}
                ctaLink={content.challenges[6].link}
              />
              <TestimonialCard
                problem={content.challenges[7].problem}
                solution={content.challenges[7].solution}
                logo={urlFor(content.challenges[7].logo).url()}
                ctaLink={content.challenges[7].link}
              />
              {/* <TestimonialCard
                problem={content.challenges[8].problem}
                solution={content.challenges[8].solution}
                logo={urlFor(content.challenges[8].logo).url()}
                ctaLink={content.challenges[8].link}
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Services - How We Collaborate */}
      <section className="padded-section pt-0">
        <div className="container" data-fade-up>
          <div className="h2 mb-100">Here's how we collaborate with you</div>
          <div className="grid-3 mobile-carousel">
            {
              content.collaboration.map(item => (
                <div className="services-collaborate" key={item._key}>
                  <div className="icon services-collaborate__icon mb-4">
                    <img src={urlFor(item.image).url()} alt="" />
                  </div>
                  <div className="h4 mb-4">{item.title}</div>
                  <p>{item.description}</p>
                </div>
              ))
            }
          </div>
          <div className="mc-dots d-flex d-md-none">
            {new Array(content.collaboration.length).fill("0").map((item, index) => (
              <span
                className={`mc-dot ${mcIndex === index ? "active" : ""}`}
                key={`mc${index}`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />

      <style jsx>{`
        .services-fixed-1 {
          position: absolute;
          bottom: 12%;
          right: 28%;
        }

        .services-illustration {
          margin-top: 60px;
        }

        .cta-text {
          color: #1a1a1a;
          font-family: Lato;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 0;
          line-height: 36px;
          margin-bottom: 40px;
        }

        @media screen and (max-width: 768px) {
          .audit-cta .h6 {
            font-size: 12px;
          }

          .cta-text {
            font-size: 16px;
            line-height: 24px;
          }

          .services-fixed-1 {
            bottom: 8%;
            right: 36%;
            width: 146px;
          }
        }
      `}</style>
    </>
  );
}
