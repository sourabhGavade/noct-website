import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import sanityClient from "../../client";
import BlockContent from "@sanity/block-content-to-react";
import urlFor from "../../utils/urlFor";
import ParaWithHeading from "../../components/Projects/ParaWithHeading";
import SingleMedia from "../../components/Projects/SingleMedia";
import Testimonial from "../../components/Projects/Testimonial";
import TwoColumnMedia from "../../components/Projects/TwoColumnMedia";
import Embed from "../../components/Projects/Embed";
import ProjectButton from "../../components/Projects/ProjectButton";
import AssociatedProjects from "../../components/Projects/AssociatedProjects";
import ProblemSolution from "../../components/Projects/ProblemSolution";
import ImageCompare from "../../components/Projects/ImageCompare";
import useContainerOffset from "../../utils/useContainerOffset";

// No SSR Components | Owl Carousel
const ImagesCarousel = dynamic(
  () => import("../../components/Projects/ImagesCarousel"),
  { ssr: false }
);
const SectionalCarousel = dynamic(
  () => import("../../components/Projects/SectionalCarousel"),
  { ssr: false }
);

const LaptopCarousel = dynamic(
  () => import("../../components/Projects/LaptopCarousel"),
  { ssr: false }
);

const PhoneCarousel = dynamic(
  () => import("../../components/Projects/PhoneCarousel"),
  { ssr: false }
);

export default function ProjectPage({ project, allProjects }) {
  // Set next and previous projects
  const currentIndex = allProjects.findIndex((x) => x._id === project._id);
  const nextProject =
    currentIndex === allProjects.length - 1
      ? allProjects[0]
      : allProjects[currentIndex + 1];
  const prevProject =
    currentIndex === 0
      ? allProjects[allProjects.length - 1]
      : allProjects[currentIndex - 1];

  // Set footer preview image offset
  let containerOffset = useContainerOffset();
  const prevImageRef = useRef();
  const nextImageRef = useRef();

  useEffect(() => {
    prevImageRef.current.style.left = containerOffset;
    nextImageRef.current.style.right = containerOffset;
    gsap.set(".project-page", { backgroundColor: `${project.bgColor}` });
    let tl = gsap.to(".project-page", {
      scrollTrigger: {
        id: "trigger1",
        trigger: ".project-hero-img",
        start: "-=200",
        onEnter: () => {
          gsap.to(".project-page", {
            backgroundColor: "#FCFCFC",
            duration: 0.45,
          });
        },
        onLeaveBack: () => {
          gsap.to(".project-page", {
            backgroundColor: `${project.bgColor}`,
            duration: 0.65,
          });
        },
      },
    });

    return () => {
      tl.kill(true);
      ScrollTrigger.getById("trigger1").kill(true);
      gsap.set(".project-page", { clearProps: true });
    };
  });

  const handleMouseOver = (dir) => {
    if (dir === "next") {
      nextImageRef.current.classList.add("show");
    } else {
      prevImageRef.current.classList.add("show");
    }
  };

  const handleMouseOut = (dir) => {
    if (dir === "next") {
      nextImageRef.current.classList.remove("show");
    } else {
      prevImageRef.current.classList.remove("show");
    }
  };

  return (
    <>
      <Head>
        <title>NOCT | {project.projectTitle}</title>
        <link rel="preload" as="image" href={urlFor(project.mainImageDesktop).url()} />
        <link rel="preload" as="image" href={urlFor(project.mainImageMobile).url()} />
      </Head>

      <article className="project-page">
        <section className="project-hero">
          <div className="project-hero-inner">
            <div className="container text-center">
              <div className="h6 project-hero-title">{project.heroTitle}</div>
              <h2 className="project-hero-tagline">{project.heroCaption}</h2>
            </div>
          </div>
          <div className="project-hero-img container">
            <img
              className="project-hero-img-desktop d-none d-lg-block"
              src={urlFor(project.mainImageDesktop).url()}
              alt={project.mainImageAltText}
            />
            <img
              className="project-hero-img-mobile d-block d-lg-none"
              src={urlFor(project.mainImageMobile).url()}
              alt={project.mainImageAltText}
            />
          </div>
        </section>

        <section className="project-intro-section">
          <div className="container">
            <div className="project-intro-inner">
              <h2 className="mb-3">{project.introTitle}</h2>
              <div className="mb-5">
                <BlockContent blocks={project.introPara} />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="h6 text-uppercase mb-3">Services:</div>
                  {project.services.map((service, index) => (
                    <div>
                      <p
                        className="font-weight-regular mb-2"
                        key={`service_${index}`}
                      >
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <div className="h6 text-uppercase mb-3">Industry:</div>
                    {project.industries.map((industry, index) => (
                      <div>
                        <p
                          className="font-weight-regular mb-2"
                          key={`industry_${index}`}
                        >
                          {industry}
                        </p>
                      </div>
                    ))}
                  </div>
                  {project.showWebsiteLink && (
                    <div>
                      <div className="h6 text-uppercase mb-3">Website:</div>
                      <a href={project.websiteURL} target="_blank">
                        <p className="font-weight-regular mb-2">
                          {project.websiteURL}
                        </p>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {project.projectSections.map((section, index) => (
          <div key={section._key}>
            {section._type === "paraWithHeading" && (
              <ParaWithHeading data={section} />
            )}
            {section._type === "singleMedia" && <SingleMedia data={section} />}
            {section._type === "imageCompare" && (
              <ImageCompare data={section} />
            )}
            {section._type === "featuresSlider" && (
              <SectionalCarousel data={section} />
            )}
            {section._type === "projectTestimonial" && (
              <Testimonial data={section} />
            )}
            {section._type === "twoColumnMedia" && (
              <TwoColumnMedia data={section} />
            )}
            {section._type === "embed" && <Embed data={section} />}
            {section._type === "button" && <ProjectButton data={section} />}
            {section._type === "phoneCarousel" && (
              <PhoneCarousel data={section} />
            )}
            {section._type === "laptopCarousel" && (
              <LaptopCarousel data={section} />
            )}
            {section._type === "imagesCarousel" && (
              <ImagesCarousel data={section} />
            )}
            {section._type === "associatedProjects" && (
              <AssociatedProjects data={section} />
            )}
            {section._type === "problemSolution" && (
              <ProblemSolution data={section} />
            )}
          </div>
        ))}

        <div className="project-footer position-relative">
          <div
            ref={prevImageRef}
            className="project-preview-image"
            style={{ backgroundColor: `${prevProject.previewImageBg}` }}
          >
            <img
              src={urlFor(prevProject.previewImage).url()}
              alt={`Image for ${prevProject.projectTitle} project`}
            />
          </div>
          <div
            ref={nextImageRef}
            className="project-preview-image"
            style={{ backgroundColor: `${nextProject.previewImageBg}` }}
          >
            <img
              src={urlFor(nextProject.previewImage).url()}
              alt={`Image for ${nextProject.projectTitle} project`}
            />
          </div>
          <div className="project-footer-inner">
            <div className="container d-flex justify-content-between">
              <div className="previous-project">
                <Link href={`/work/${prevProject.slug.current}`}>
                  <a
                    onMouseOver={() => handleMouseOver("prev")}
                    onMouseOut={() => handleMouseOut("prev")}
                  >
                    <div className="d-flex align-items-center">
                      <svg
                        width="19"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          transform="matrix(-1 0 0 1 19 1)"
                          fill="none"
                          fillRule="evenodd"
                          opacity=".8"
                        >
                          <rect
                            fill="#1A1A1A"
                            y="5"
                            width="18"
                            height="2"
                            rx="1"
                          />
                          <path
                            d="M11 0l6.734 5.772a.3.3 0 010 .456L11 12h0"
                            stroke="#1A1A1A"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <h6 className="mb-0 ml-2 text-uppercase font-weight-regular">
                        Previous
                        <span className="d-none d-sm-inline">
                          &nbsp;Project
                        </span>
                      </h6>
                    </div>
                    <h5 className="mt-2">{prevProject.projectTitle}</h5>
                  </a>
                </Link>
              </div>
              <div className="next-project">
                <Link href={`/work/${nextProject.slug.current}`}>
                  <a
                    onMouseOver={() => handleMouseOver("next")}
                    onMouseOut={() => handleMouseOut("next")}
                  >
                    <div className="d-flex justify-content-end align-items-center">
                      <h6 className="mb-0 mr-2 text-uppercase font-weight-regular">
                        Next
                        <span className="d-none d-sm-inline">
                          &nbsp;Project
                        </span>
                      </h6>
                      <svg
                        width="19"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          transform="translate(0 1)"
                          fill="none"
                          fillRule="evenodd"
                          opacity=".8"
                        >
                          <rect
                            fill="#1A1A1A"
                            y="5"
                            width="18"
                            height="2"
                            rx="1"
                          />
                          <path
                            d="M11 0l6.734 5.772a.3.3 0 010 .456L11 12h0"
                            stroke="#1A1A1A"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                    </div>
                    <h5 className="mt-2">{nextProject.projectTitle}</h5>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <style jsx>{`
        .project-hero {
          margin-bottom: 160px;
        }

        .project-hero-inner {
          padding: 200px 0 500px;
        }

        .project-hero-title {
          font-weight: regular;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .project-hero-tagline {
          max-width: 992px;
          margin: 0 auto;
        }

        .project-hero-img-desktop {
          margin-top: -380px;
        }

        .project-hero-img-mobile {
          margin-top: -240px;
        }

        .project-intro-section {
          margin-bottom: 130px;
        }

        .project-footer {
          position: relative;
          z-index: 1;
          width: 100vw;
          height: 105px;
          background: #f7f7f7;
        }

        .project-footer-inner {
          z-index: 2;
          position: absolute;
          width: 100%;
          left: 0;
          right: 0;
          background: #f7f7f7;
          padding: 24px 0;
        }

        .project-footer h5 {
          font-weight: 800;
        }

        .next-project {
          text-align: right;
        }

        .project-preview-image {
          pointer-events: none;
          width: 320px;
          height: 320px;
          position: absolute;
          top: 50%;
          transform: translateY(0);
          display: grid;
          place-items: center;
          transition: all 0.5s ease;
          box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.03);
        }

        .project-preview-image.show {
          transform: translateY(-100%);
        }

        @media (hover: none) {
          .project-preview-image {
            display: none;
          }
        }

        @media screen and (max-width: 768px) {
          .project-hero {
            margin-bottom: 80px;
          }

          .project-hero-inner {
            padding: 180px 0 270px;
          }

          .project-intro-section {
            margin-bottom: 80px;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps(context) {
  const project = await sanityClient.fetch(
    `*[_type=="projects" && slug.current=="${context.params.slug}"]`
  );
  const allProjects = await sanityClient.fetch(
    `*[_type=="projects"] | order(priority asc) {_id, projectTitle, slug, previewImage, previewImageBg}`
  );

  return {
    revalidate: 60,
    props: {
      project: project[0],
      allProjects,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await sanityClient.fetch(`*[_type=="projects"].slug.current`);

  const paths = slugs.map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
}
