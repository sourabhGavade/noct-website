import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "gsap/dist/gsap";
import Button from "../components/Button";
import LetteringTitle from "../components/LetteringTitle";
import Slider from "../components/Slider";
import ButtonLink from "../components/ButtonLink";
import initFadeUp from "../utils/initFadeUp";
import BlogItem from "../components/BlogItem";
import sanityClient from "../client";
import urlFor from "../utils/urlFor";

const ImageCarousel = dynamic(() => import("../components/ImageCarousel"), {
  ssr: false,
});

export async function getStaticProps() {
  const content = await sanityClient.fetch(`*[_type=="about"][0]`);

  return {
    revalidate: 60,
    props: {
      content,
    },
  };
}

export default function About({ content }) {
  const [imageCarouselArray, setImageCarouselArray] = useState([]);

  // Mobile Carousel Dots Index
  // Our beliefs
  const [mcIndex1, setMcIndex1] = useState(0);
  const mcItems1 = 3;
  // Things we tinker with
  const [mcIndex2, setMcIndex2] = useState(0);

  useEffect(() => {
    document.querySelector(".navbar-active").classList.add("active-page");
    initFadeUp();
    initParallax();
    initStudioVideos();
    initMobileCarousel();
    initImageCarousel();

    return () => {
      document.querySelector(".navbar-active").classList.remove("active-page");
    };
  }, []);

  const initMobileCarousel = () => {
    // Our beliefs
    const scroller1 = document.getElementById("carousel1");
    document.getElementById("carousel1").addEventListener("scroll", () => {
      const index = Math.round(
        (scroller1.scrollLeft / scroller1.scrollWidth) * mcItems1
      );
      const itemWidth = scroller1.scrollWidth / mcItems1;
      if (scroller1.scrollLeft <= itemWidth * (mcItems1 - 2) + 20) {
        setMcIndex1(index);
      } else {
        setMcIndex1(mcItems1 - 1);
      }
    });
    // Tinker with
    const scroller2 = document.getElementById("carousel2");
    document.getElementById("carousel2").addEventListener("scroll", () => {
      const index = Math.round(
        (scroller2.scrollLeft / scroller2.scrollWidth) * content.tinker.length
      );
      const itemWidth = scroller2.scrollWidth / content.tinker.length;
      if (
        scroller2.scrollLeft <=
        itemWidth * (content.tinker.length - 2) + 40
      ) {
        setMcIndex2(index);
      } else {
        setMcIndex2(content.tinker.length - 1);
      }
    });
  };

  const initStudioVideos = () => {
    gsap.from(".bg-video-container", {
      scrollTrigger: {
        trigger: ".bg-video-container",
        once: true,
        onEnter: () => {
          document.querySelectorAll(".bg-video").forEach((video) => {
            video.play();
          });
        },
      },
    });
  };

  const initParallax = () => {
    gsap.to(".about-fixed-1", {
      scrollTrigger: {
        trigger: ".about-hero-section",
        start: "top top",
        scrub: true,
      },
      x: 400,
      scale: 2.5,
      ease: "Power1.easeIn",
      force3D: true,
    });
    gsap.to(".about-hero-banner", {
      scrollTrigger: {
        trigger: ".about-hero-section",
        start: "top top",
        scrub: 0.5,
      },
      y: -200,
      force3D: true,
    });
  };

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
        <title>NOCT | About</title>
      </Head>

      {/* About - Hero */}
      <section className="about-hero-section hero-section flex-center">
        <div className="about-fixed-elements">
          <div className="about-fixed-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="114" height="114">
              <circle
                cx="57"
                cy="57"
                r="57"
                fill="#d1a4cb"
                fillRule="evenodd"
                opacity=".22"
              />
            </svg>
          </div>
          <div className="about-fixed-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="252" height="175">
              <g
                transform="matrix(-.069756 .997564 -.997564 -.069756 251.379445 17.397579)"
                stroke="#1a1a1a"
                fill="none"
                opacity=".88"
              >
                <g opacity=".88" strokeWidth=".85">
                  <path d="M35.51 130.474c-3.238-.183-9.3.9-14.2 3-18.3 8-27.2 20.2-12.9 40 4.3 6 10.5 10.9 16.6 15.3 25.7 18.8 55.3 29.9 84.1 42.4 8 3.4 16.4 6.2 24.9 8.1 4.6 1 9.9.2 14.5-1 6.1-1.7 8.5-6.7 5.3-12.2-3.7-6.5-8-12.9-13.2-18.1-6.9-7.1-15.2-12.8-22.5-19.6l-44.4-41.9c-10.2-9.1-22.3-15.1-38.2-16z" />
                  <path d="M43.41 145.774c6.187-.433 11 3.7 16.7 7.1 15.9 9.6 26.3 24.2 34.6 40.4 2.6 5-1.8 10.6-7.9 9.4-20.3-4.1-39.6-11-55.4-25.2-1.7-1.6-3.1-3.5-4.5-5.4-3.7-5.3-5.9-11.2-2.7-17.3 3.4-6.4 9.9-8.2 19.2-9z" />
                </g>
                <path
                  d="M51.61 53.852c-6.92 2.39-16.488-3.023-21.15-5.955-14.197-8.93-16.12-11.252-25.69-21.358-2.965-3.132-1.995-8.65-.183-11.135 1.235-1.694 5.23-5.284 10.342-5.64C31.284 8.62 35.4 9.447 50.53 20c1.644 1.203 3.124 2.74 4.604 4.28 3.972 4.326 6.93 9.48 5.81 15.77-1.206 6.61-2.414 11.413-9.335 13.802z"
                  opacity=".88"
                  strokeWidth=".85"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="hero-fixed-banner about-hero-banner">
          Get to know us better
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h1>
                <LetteringTitle text="Network of Creative Thinkers aka NOCT &amp; what we're all about" />
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* About - Intro */}
      <section className="py-5">
        <div className="container">
          <div className="row" data-fade-up>
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="h2">
                It began in the heart of Mumbai and ended up in the Sahyadri
                hills.
              </div>
            </div>
            <div className="col-lg-5 ml-md-auto">
              <p className="lg">
                NOCT aka Network of Creative Thinkers is the brainchild of two
                creatively curious designers,{" "}
                <a
                  href="https://www.linkedin.com/in/neha-shrestha/"
                  target="_blank"
                  className="inline-link"
                >
                  Neha
                </a>{" "}
                and{" "}
                <a
                  href="https://www.linkedin.com/in/rudranshmathur/"
                  target="_blank"
                  className="inline-link"
                >
                  Rudransh
                </a>
                , who founded a design agency in the heart of Mumbai. What they
                dreamed of though, was to be able to work on anything from
                anywhere with anyone.
                <br />
                <br />
                Summoned by the call of the wild, they moved to the quaint hills
                of Panchgani. Today, NOCT is an agency in the cloud - a virtual
                workplace - a studio in the hills - a network of creative
                thinkers - a quest so much bigger than the two dots that started
                it all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About - Gallery */}
      {content.imageCarousel?.length > 0 && (
        <section className="py-5">
          <div>
            <ImageCarousel animateScroll={true} imgs={imageCarouselArray} />
          </div>
        </section>
      )}

      {/* About - Our Beliefs */}
      <section className="padded-section">
        <div className="container">
          <div className="h2 mb-6">We believe that</div>
          <div className="grid-3 align-bottom mobile-carousel" id="carousel1">
            <div>
              <img
                className="about-belief-img mb-3"
                src="/images/illustrations/static/living-and-breathing-design.svg"
                alt=""
              />
              <div className="h4">
                Design is a way of living, thinking, breathing.
              </div>
            </div>
            <div>
              <img
                className="about-belief-img mb-2"
                src="/images/illustrations/static/better-world.svg"
                alt=""
              />
              <div className="h4">
                Our powers are meant to work towards a better world.
              </div>
            </div>
            <div>
              <img
                className="about-belief-img about-belief-img-sm mb-2"
                src="/images/illustrations/static/everything-is-fixable.svg"
                alt=""
              />
              <div className="h4">
                There is no problem that cannot be solved.
              </div>
            </div>
          </div>
          <div className="mc-dots d-flex d-md-none">
            {new Array(mcItems1).fill("0").map((item, index) => (
              <span
                className={`mc-dot ${mcIndex1 === index ? "active" : ""}`}
                key={`mc${index}`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* About - Office */}
      <section className="padded-section">
        <div className="container" data-fade-up>
          <div className="bg-video-container position-relative">
            <video
              id="studioVideo1"
              className="bg-video bg-video-1"
              muted
              loop
              playsInline
            >
              <source
                src="/images/about/noct-studio-video-2.mp4"
                type="video/mp4"
              />
            </video>
            <video
              id="studioVideo2"
              className="bg-video bg-video-2"
              muted
              loop
              playsInline
            >
              <source
                src="/images/about/noct-studio-video-2.mp4"
                type="video/mp4"
              />
            </video>
            <video
              id="studioVideo3"
              className="bg-video bg-video-3"
              muted
              loop
              playsInline
            >
              <source
                src="/images/about/noct-studio-video-2.mp4"
                type="video/mp4"
              />
            </video>
            <div className="row mb-5">
              <div className="col-lg-12 col-xl-8">
                <div className="h2 mb-4">Where we work</div>
                <div className="mobile-studio-video mobile-full-bleed mb-4">
                  <video autoPlay muted loop playsInline>
                    <source
                      src="/images/about/noct-studio-video.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <p>
                  Our dream is for people to be able to work from anywhere-a
                  loft in the heart of the city, a homely cafe in the hills, or
                  even a cave in the mountains. All you need is internet and
                  some inspiration!{" "}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-xl-4 pr-5 mb-5 mb-lg-0">
                <div className="h4 mb-4">Panchgani Design Studio</div>
                <p>
                  The central hub where all the creation happens. At any given
                  point in time, we have a stream of 10 - 15 designers working
                  from here.
                  <br />
                  <br />* We also have a part-time office in <b>Mumbai</b> for
                  sales and marketing
                </p>
              </div>
              <div className="col-lg-6 col-xl-4 pr-5">
                <div className="h4 mb-4">Anywhere in the world</div>
                <p>
                  Our network of designers is spread out across different parts
                  of the country and we collaborate with them remotely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About - Blog */}
      <section className="padded-section">
        <div className="container" data-fade-up>
          <div className="h2 mb-6">Musings</div>
          <div className="blog-container mb-5">
            <BlogItem
              date="7 Apr 2020"
              title="Remote Working for designers in the time of COVID-19"
              link="https://medium.com/noct-talk/remote-working-for-designers-in-the-time-of-covid-19-f5012b78c6dd"
              readTime="14"
            />
            <BlogItem
              date="18 Mar 2020"
              title="Design Hack for an alternate tourism ecosystem in Panchgani"
              link="https://medium.com/noct-talk/design-hack-for-an-alternate-tourism-ecosystem-in-panchgani-bb27e77d55c4"
              readTime="9"
            />
            <BlogItem
              date="19 Apr 2018"
              title="The Power of Wind: Inox Wind Theatre Ad"
              link="https://medium.com/noct-talk/the-power-of-wind-inox-wind-theatre-ad-f6cb91ea3ac6"
              readTime="5"
            />
            <BlogItem
              date="4 Oct 2017"
              title="Designing a festival of flowers: The Karvi Festival 2016"
              link="https://medium.com/noct-talk/designing-a-festival-of-flowers-the-karvi-festival-2016-e4fc8091f56b"
              readTime="7"
            />
          </div>
          {/* <a className="view-all-blog-btn">
            <Button text="View All" />
          </a> */}
        </div>
      </section>

      {/* About - Things We Tinker With */}
      <section className="padded-section">
        <div className="container" data-fade-up>
          <div className="h2 mb-80">Other things we tinker with</div>
          <div className="grid-3 mobile-carousel" id="carousel2">
            {content.tinker.map((item) => (
              <div>
                <img
                  className="tinker-logo mb-4"
                  src={urlFor(item.image).url()}
                  alt={item.title}
                />
                <div className="h4 mb-3">{item.title}</div>
                <p className="mb-4">{item.description}</p>
                {item.href && (
                  <a href={item.href} target="_blank">
                    <ButtonLink text="Know More" />
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mc-dots d-flex d-md-none">
            {new Array(content.tinker.length).fill("0").map((item, index) => (
              <span
                className={`mc-dot ${mcIndex2 === index ? "active" : ""}`}
                key={`mc${index}`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* About - Things We Care About */}
      <section className="about-causes-section padded-section">
        <div className="container" data-fade-up>
          <Slider
            type="regular"
            sliderTitle="Things We Care About"
            slides={content.causes.map((cause, index) => {
              return {
                index,
                title: cause.title,
                desc: cause.description,
                img: urlFor(cause.image).url(),
              };
            })}
          />
        </div>
      </section>

      {/* About - Footer CTA */}
      <section className="padded-section bg-grey">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-12 col-lg-7 pr-0 pr-lg-5 mb-5 mb-lg-0">
              <div className="h3 mb-3">
                “How do you know I’m mad?” said Alice. “You must be” said the
                Cat, “or you wouldn’t have come here.”
              </div>
              <p className="mb-4">
                Are you creatively curious or curiously creative too? Join our
                network to work with us, grow with us and make wonderful things
                together.
              </p>
              <Link href="/join-us">
                <a>
                  <Button text="Join Us" style="normal" />
                </a>
              </Link>
            </div>
            <div className="col-12 col-lg-5 text-left text-lg-right">
              <img src="/images/illustrations/static/alice-dark.svg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-fixed-1 {
          position: absolute;
          bottom: 9%;
          right: 21%;
        }

        .about-fixed-2 {
          position: absolute;
          bottom: 25%;
          right: 21%;
        }

        .about-belief-img {
          max-width: 290px;
        }

        .about-belief-img.about-belief-img-sm {
          max-width: 245px;
        }

        .bg-video-container {
          padding-bottom: 19%;
        }

        .bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .bg-video-1 {
          clip-path: inset(calc(100% - 190px) calc(100% - 309px) 0 0);
        }

        .bg-video-2 {
          clip-path: inset(calc(100% - 304px) calc(100% - 730px) 0 390px);
        }

        .bg-video-3 {
          clip-path: inset(0 0 0 810px);
        }

        .mobile-studio-video {
          display: none;
        }

        .mobile-studio-video video {
          width: 100%;
        }

        .tinker-logo {
          width: 80px;
        }

        @media screen and (max-width: 1200px) {
          .bg-video {
            display: none;
          }

          .mobile-studio-video {
            display: block;
          }
        }

        @media screen and (max-width: 992px) {
          .about-causes-section.padded-section {
            padding-bottom: 0;
          }
        }

        @media screen and (max-width: 768px) {
          .about-fixed-2 {
            bottom: 20%;
            right: 42%;
            width: 180px;
          }

          .about-belief-img,
          .about-belief-img.about-belief-img-sm {
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
