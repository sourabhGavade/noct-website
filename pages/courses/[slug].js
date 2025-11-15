import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import sanityClient from "../../client";
import urlFor from "../../utils/urlFor";
import LetteringTitle from "../../components/LetteringTitle";
import Button from "../../components/Button";
import ImageCarousel from "../../components/ImageCarousel";
import VerticalTimeline from "../../components/VerticalTimeline";
import DropdownCardIcon from "../../components/DropdownCardIcon";
import BlockContent from "@sanity/block-content-to-react";
import Service from "../../components/Service";
import { MdCheck } from "react-icons/md";
import useWindowSize from "../../utils/useWindowSize";

export async function getServerSideProps(context) {
  const content = await sanityClient.fetch(
    `*[_type=="course" && slug.current=="${context.params.slug}"]`
  );

  return {
    props: {
      content: content[0],
    },
  };
}

export default function CoursePage({ content }) {
  const [imageCarouselArray1, setImageCarouselArray1] = useState([]);
  const [imageCarouselArray2, setImageCarouselArray2] = useState([]);
  const windowSize = useWindowSize();

  useEffect(() => {
    initImageCarousel1();
    initImageCarousel2();
    document.querySelector(".navbar").style.display = "none";

    return () => {
      document.querySelector(".navbar").style.display = "block";
    };
  }, []);

  const initImageCarousel1 = () => {
    const arr = [];
    content.imageCarousel?.map((img) => {
      arr.push({
        url: `${urlFor(img.image).url()}`,
        width: img.width,
        ...(img.caption ? { caption: img.caption } : {}),
      });
    });
    setImageCarouselArray1(arr);
  };

  const initImageCarousel2 = () => {
    const arr = [];
    content.studioImages?.map((img) => {
      arr.push({
        url: `${urlFor(img.image).url()}`,
        width: img.width,
        ...(img.caption ? { caption: img.caption } : {}),
      });
    });
    setImageCarouselArray2(arr);
  };

  const scrollToPricing = () => {
    document.querySelector("#pricing").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>NOCT | Portfolio Course</title>
      </Head>

      <div className="course-page">
        <section className="courses-inner-hero">
          <div className="logo">
            <Link href="/">
              <a>
                <svg
                  width={80}
                  height={30}
                  viewBox="0 0 80 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_48_4966)">
                    <path
                      d="M27.0459 23.7807C25.2395 23.7807 23.2324 23.2789 21.8776 21.3721C17.3616 14.849 24.6374 8.72731 30.0064 4.26147C30.458 3.86005 30.8594 3.55898 31.311 3.15756C32.6157 1.95329 33.7698 1.2508 34.8235 0.999908C36.2285 0.899552 37.2822 1.40133 38.0851 2.40489C39.5904 4.31165 39.5904 7.6234 39.0384 9.32945C38.8377 9.98176 38.637 10.7344 38.4865 11.3867C37.0815 16.3544 35.6765 21.4725 30.2071 23.3793C29.2036 23.58 28.1498 23.7807 27.0459 23.7807ZM35.0744 1.20062C34.974 1.20062 34.8737 1.20062 34.7733 1.20062C33.7698 1.45151 32.6157 2.154 31.3612 3.30809C30.9598 3.65934 30.5584 4.01058 30.1068 4.41201C24.8381 8.87784 17.6125 14.9494 22.0281 21.2718C24.1356 24.1821 27.9491 23.7305 30.0064 23.1284C35.3253 21.2718 36.7303 16.2038 38.1352 11.2864C38.3359 10.6341 38.5367 9.8814 38.6872 9.22909C39.189 7.57322 39.2392 4.36183 37.784 2.50525C37.1317 1.65222 36.2285 1.20062 35.0744 1.20062Z"
                      fill="#222323"
                    />
                    <path
                      d="M27.4473 20.5693C26.2431 20.5693 25.0388 20.0174 24.1858 19.0138C23.3327 18.0604 22.9815 16.8562 23.2826 15.8024C23.9851 12.29 27.347 10.1825 30.0566 8.47644L30.3577 8.27573C30.4078 8.22555 30.458 8.17537 30.5082 8.17537C30.9096 7.82413 31.311 7.62341 31.8128 7.37252C32.3648 7.07146 33.0673 7.02128 33.6694 7.22199C33.8701 7.27217 34.0708 7.37252 34.2214 7.47288C35.0744 7.97466 35.6263 8.82768 35.6263 9.78106C35.6765 12.3401 35.0744 14.9996 33.8701 16.9063C32.4149 19.1643 30.3577 20.469 27.7986 20.5693C27.6982 20.5693 27.5979 20.5693 27.4473 20.5693ZM30.6587 8.3259C30.6085 8.37608 30.5584 8.42626 30.458 8.47644L30.1569 8.67715C27.4975 10.333 24.1356 12.4405 23.4833 15.8526C23.2324 16.8562 23.5335 17.9601 24.3363 18.8633C25.2395 19.917 26.5441 20.469 27.7986 20.3686C31.6121 20.1177 35.6263 16.7558 35.4256 9.78106C35.4256 8.87786 34.9238 8.07501 34.121 7.62341C33.9203 7.52306 33.7196 7.4227 33.569 7.37252C33.0171 7.17181 32.3648 7.22199 31.863 7.52306C31.4616 7.77395 31.0601 8.02484 30.6587 8.3259Z"
                      fill="#222323"
                    />
                    <path
                      d="M28.0495 18.3114C27.1965 18.3114 26.3434 18.0605 25.942 17.659C24.8883 16.5049 25.1392 15.2003 26.6947 13.6448C29.3541 10.9854 31.4114 9.78111 32.4651 10.2829C33.0673 10.6341 33.268 11.5373 32.9669 12.842C32.5153 14.7487 31.4616 16.4548 30.0064 17.7594C29.605 18.1608 28.8523 18.3114 28.0495 18.3114ZM31.9132 10.3832C30.8594 10.3832 29.053 11.5875 26.8452 13.7953C24.6374 15.953 25.7413 17.1573 26.0925 17.5085C26.7448 18.211 29.0029 18.3114 29.9061 17.659C31.4114 16.4046 32.415 14.7487 32.8164 12.8921C33.0673 11.6879 32.9167 10.7847 32.3648 10.5338C32.2644 10.4334 32.1139 10.3832 31.9132 10.3832Z"
                      fill="#222323"
                    />
                    <path
                      d="M39.9918 20.5691C39.9918 15.4509 43.7552 11.9385 48.5221 11.9385C51.0811 11.8883 53.3893 13.1427 54.8445 15.2502L53.1384 16.2036C52.0847 14.6982 50.3787 13.795 48.5723 13.795C44.9594 13.795 42.1495 16.5548 42.1495 20.5189C42.1495 24.4829 44.9093 27.2427 48.5723 27.2427C50.3787 27.2427 52.1349 26.3395 53.1384 24.8342L54.8445 25.7876C53.4395 27.895 51.0811 29.1495 48.5221 29.0993C43.705 29.1495 39.9918 25.637 39.9918 20.5691Z"
                      fill="#222323"
                    />
                    <path
                      d="M11.7416 28.8486L2.0573 15.6017V28.8486H0V12.2397H2.10747L11.6915 25.1857V12.2397H13.7488V28.8486H11.7416Z"
                      fill="#222323"
                    />
                    <path
                      d="M63.0737 28.8486V14.0963H57.805V12.2397H70.3997V14.0963H65.131V28.8988L63.0737 28.8486Z"
                      fill="#222323"
                    />
                    <path
                      d="M19.4189 20.5691C19.4189 15.7018 22.7808 11.9385 27.648 11.9385C32.5153 11.9385 35.9274 15.6516 35.9274 20.5691C35.9274 25.4865 32.5655 29.1997 27.648 29.1997C22.7306 29.1997 19.4189 25.4363 19.4189 20.5691ZM33.7697 20.5691C33.7697 16.7054 31.3612 13.8452 27.648 13.8452C23.9349 13.8452 21.5765 16.7054 21.5765 20.5691C21.5765 24.4328 23.985 27.2929 27.6982 27.2929C31.4114 27.2929 33.8199 24.3826 33.7697 20.5691Z"
                      fill="#222323"
                    />
                    <path
                      d="M75.6683 11.5877C73.6612 11.5877 72.0053 9.93183 72.0053 7.92471C72.0053 5.91759 73.6612 4.26172 75.6683 4.26172C77.6754 4.26172 79.3313 5.91759 79.3313 7.92471C79.3313 9.93183 77.6754 11.5877 75.6683 11.5877ZM75.6683 5.01439C74.0626 5.01439 72.758 6.31901 72.758 7.92471C72.758 9.5304 74.0626 10.835 75.6683 10.835C77.274 10.835 78.5786 9.5304 78.5786 7.92471C78.5786 6.31901 77.274 5.01439 75.6683 5.01439Z"
                      fill="#222323"
                    />
                    <path
                      d="M75.4676 7.62365C75.6683 7.62365 75.8188 7.57347 75.9192 7.52329C76.0195 7.47311 76.0697 7.32258 76.0697 7.12187C76.0697 6.97133 76.0195 6.8208 75.9192 6.77062C75.8188 6.72044 75.6683 6.67026 75.4676 6.67026H75.0662V7.67382H75.4676M75.016 8.32614V9.7813H74.0124V5.96777H75.5178C76.0195 5.96777 76.3708 6.06813 76.6217 6.21866C76.8726 6.3692 76.9729 6.67026 76.9729 7.02151C76.9729 7.2724 76.9227 7.47311 76.7722 7.62365C76.6719 7.77418 76.4711 7.92471 76.2202 7.97489C76.3708 8.02507 76.4711 8.07525 76.5715 8.1756C76.6719 8.27596 76.7722 8.42649 76.8726 8.67738L77.4245 9.7813H76.3708L75.9192 8.82792C75.8188 8.6272 75.7185 8.52685 75.6181 8.42649C75.5178 8.37631 75.3672 8.32614 75.2167 8.32614H75.016Z"
                      fill="#222323"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_48_4966">
                      <rect
                        width="79.3313"
                        height="28.2"
                        fill="white"
                        transform="translate(0 1)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </Link>
          </div>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="order-2 order-lg-1 col-lg-6">
                <div className="h2 mb-4">
                  <LetteringTitle text={content.title} />
                </div>
                <p className="lg mb-5">{content.description}</p>
                <div className="d-flex align-items-center">
                  <a onClick={() => scrollToPricing()}>
                    <Button style="normal" text="Learn More" />
                  </a>
                  <a href="tel:+917045306680" className="ml-4">
                    <p className="uppercase font-weight-normal sm">
                      Talk to us on 7045306680
                    </p>
                  </a>
                </div>
              </div>
              <div className="order-1 order-lg-2 col-6 col-lg-5 mb-4 mb-lg-0">
                <video
                  src={content.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  style={{
                    transform:
                      windowSize.width > 1024 ? "scale(1.4)" : "scale(1.2)",
                  }}
                  // poster={urlFor(content.mainImage).url()}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8" style={{ backgroundColor: "#222323" }}>
          <div className="container">
            <div className="grid-3">
              <div>
                <div className="mb-4">
                  <p className="text-white">Registration Deadline</p>
                  <h3 className="text-white course-stat">
                    {content.registrationDeadline}
                  </h3>
                </div>
                <div>
                  <p className="text-white">Course starts on</p>
                  <h3 className="text-white course-stat">
                    {content.startDate}
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-white">Course Duration</p>
                <h3 className="text-white course-stat mb-2">
                  {content.courseDuration}
                </h3>
                <p className="text-white">{content.courseDurationDetails}</p>
              </div>
              <div>
                <p className="text-white">In-person location</p>
                <h3 className="text-white course-stat">{content.location}</h3>
              </div>
            </div>
          </div>
        </section>

        {content.whatYouGet?.length > 0 && (
          <section className="padded-section">
            <div className="container">
              <div className="h2 mb-100">What you get</div>
              <div className="grid-3">
                {content.whatYouGet.map((item) => (
                  <div key={item._key}>
                    <div
                      className={`mb-4 ${
                        item.type === "icon-lg" ? "icon" : ""
                      } ${item.type === "icon-sm" ? "icon-sm" : ""}`}
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

        {content.imageCarousel?.length > 0 && (
          <section className="py-6">
            <div>
              <ImageCarousel animateScroll={true} imgs={imageCarouselArray1} />
            </div>
          </section>
        )}

        <section className="padded-section">
          <div className="container">
            <div className="h2 mb-100">The course structure</div>
            <div className="row justify-content-between align-items-start">
              <div className="col-lg-5 mb-5 mb-lg-0">
                <div>
                  <div className="h3">Week 1</div>
                  <p className="lg font-weight-medium mb-4">
                    In-person learning in Panchgani
                  </p>
                  <p className="mb-5">
                    In the first week, you will meet their mentors, experience
                    the NOCT studio, learn about what makes a good portfolio,
                    understand the industry hiring process, and start building
                    your portfolio in the serene landscape of Panchgani.{" "}
                  </p>
                  <div className="mb-4">
                    <div className="h5">Day 0 - Check-in</div>
                    <p style={{ fontSize: "16px" }}>
                      Check in to your accommodation and settle into Panchgani.
                      Meet your peers and mentors.
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="h5">Day 1</div>
                    <p style={{ fontSize: "16px" }}>
                      The course begins with a studio tour, a round of
                      introductions, a look into the NOCT hiring process, and an
                      interaction session with designers across various roles
                      and organisations around India.
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="h5">Day 2</div>
                    <p style={{ fontSize: "16px" }}>
                      Understand how companies hire designers. Learn what makes
                      a good designer and a portfolio that stands out with the
                      help of mentor and peer feedback.
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="h5">Day 3</div>
                    <p style={{ fontSize: "16px" }}>
                      Work on narrative building and telling the story of your
                      work focussed on the type of audience you are targeting.{" "}
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="h5">Day 4</div>
                    <p style={{ fontSize: "16px" }}>
                      Learn how to apply and enhance your visual design
                      knowledge and about the skills beyond design that you need
                      to be able to put your best self forward in the industry.
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="h5">Day 5</div>
                    <p style={{ fontSize: "16px" }}>
                      1:1 sessions for career guidance and advice from NOCT
                      senior designers and design managers.
                    </p>
                  </div>
                  <div>
                    <div className="h5">Day 6</div>
                    <p style={{ fontSize: "16px" }}>
                      Begin your day by exploring Panchgani on a beautiful hike.
                      Later, present your week’s work and get feedback and ideas
                      from all your peers and mentors. We will conclude the
                      Panchgani visit with a team dinner and party. Attendees
                      will return to their home/city the following day.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 sticky">
                <div className="mb-5">
                  <div className="h3">Week 2-3</div>
                  <p className="lg font-weight-medium mb-3">
                    Virtual Mentorship
                  </p>
                  <p>
                    After the first week’s learnings and in-studio sessions in
                    Panchgani, you will return to your home city to work on your
                    portfolios individually. Weekly progress sessions will be
                    scheduled with your mentor, and you will continue to have
                    access to NOCT’s resources and libraries.
                  </p>
                </div>
                <div>
                  <div className="h3">Week 4</div>
                  <p className="lg font-weight-medium mb-3">
                    Mock Interview and closing
                  </p>
                  <p>
                    At the end of Week 4, mock interviews will be conducted
                    where the students will present their work to the the NOCT
                    hiring team. After completion, an additional mentor session
                    can be scheduled before your first job interview for a quick
                    review and a pep talk if you need one. :)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="padded-section"
          style={{ backgroundColor: "#DEEDE6" }}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5 mb-4 mb-lg-0">
                <p className="xl mb-4">Introductory course fee</p>
                {/* <p className='font-weight-bold lg' style={{color:"#949494"}}><s>₹ {content.originalPrice}</s></p> */}
                <div className="h2 mb-2">₹ {content.price}</div>
                <p className="font-weight-normal mb-3">
                  *excluding accommodation and meals
                </p>
                <p className="mb-3">- OR -</p>
                <div className="d-flex align-items-end mb-5">
                  <div className="h4 mr-2">₹ {content.priceWithAccom}</div>
                  <p
                    className="font-weight-normal"
                    style={{ lineHeight: "150%" }}
                  >
                    all inclusive
                  </p>
                </div>
                <a
                  href={content.applicationLink}
                  target="_blank"
                  className="d-block mb-3"
                >
                  <Button style="normal" text="Apply Now" />
                </a>
                <p>Hurry, only {content.seatsRemaining} seats available!</p>
              </div>
              <div className="col-lg-6">
                {content.features.map((feature) => (
                  <div key={feature._key} className="d-flex mb-2">
                    <MdCheck size="22" className="flex-shrink-0 mr-3 mt-1" />
                    <p className="mb-4">
                      <strong>{feature}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="padded-section">
          <div className="container">
            <div className="h2 mb-100">Is this course for me?</div>
            <div className="grid-3">
              {content.isThisForYou.map((item) => (
                <div key={item._key}>
                  <DropdownCardIcon
                    icon={item.yesNo}
                    title={item.title}
                    desc={item.description}
                  />
                </div>
              ))}
              <div style={{ backgroundColor: "#F4F4F4" }} className="p-4">
                <div className="h5 mb-3">Still can't decide?</div>
                <a href="tel:7045306680">
                  <Button style="normal" text="talk to us on 7045306680" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="padded-section">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-4">
                <div
                  className={`h2 ${
                    content.enrollmentProcess.length > 5 ? "sticky" : ""
                  }`}
                >
                  Enrolment Process
                </div>
              </div>
              <div className="col-lg-7">
                <VerticalTimeline items={content.enrollmentProcess} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row justify-content-between mb-4">
              <div className="col-lg-5">
                <div className="h2 mb-3">The NOCT accommodation</div>
                <p className="lg">(Available at an additional cost)</p>
              </div>
              <div className="col-lg-6">
                <BlockContent blocks={content.whereYouWillBeStaying} />
              </div>
            </div>
          </div>
        </section>

        {content.imageCarousel?.length > 0 && (
          <section className="py-5">
            <div>
              <ImageCarousel animateScroll={true} imgs={imageCarouselArray2} />
            </div>
          </section>
        )}

        <section className="padded-section">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-8 mb-5 mb-lg-0">
                <div className="h2 mb-4">{content.whyTitle}</div>
                <div className="mb-5">
                  <BlockContent blocks={content.whyDescription} />
                </div>
                <Link href="/">
                  <a>
                    <Button style="normal" text="Visit the NOCT Website" />
                  </a>
                </Link>
              </div>
              <div className="col-lg-2">
                {content.whyStats.map((stat) => (
                  <div className="about-stat mb-5" key={stat._key}>
                    <div className="h2 mb-1 about-count">{stat.title}</div>
                    <div className="h5">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="footer-cta padded-section"
          style={{ backgroundColor: "#E1DDEE" }}
        >
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-8 mb-5 mb-lg-0 pr-lg-5">
                <div className="h2 mb-6">Ready to start?</div>
                <a
                  href={content.applicationLink}
                  target="_blank"
                  className="d-block mb-3"
                >
                  <a>
                    <Button text="Apply Now" style="normal" />
                  </a>
                </a>
                <p className="lg mt-2">Hurry, limited seats available!</p>
              </div>
              <div className="col-9 col-lg-4 text-right">
                <img
                  src="/images/illustrations/static/alice-dark.svg"
                  alt="Alice in Wonderland Illustration"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="footer-cta padded-section">
          <div className="container">
            <div className="row align-items-start justify-content-between">
              <div className="col-lg-5">
                <div className="h2 text-white mb-6">
                  Frequently Asked Questions
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-5">
                  {content.faqs.map((faq) => (
                    <div className="faq service-trigger" key={faq._key}>
                      <Service title={faq.title} desc={faq.description} />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white lg mb-3">
                    Can't see your question here?
                  </p>
                  <a href={`tel:${content.contactNumber}`}>
                    <Button
                      text={`Talk to us on ${content.contactNumber}`}
                      style="alt"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .logo {
          position: absolute;
          top: 3%;
          left: 5%;
        }

        .course-stat {
          font-size: 32px;
          line-height: 42px;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
