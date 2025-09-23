import { useEffect, useRef, useState } from 'react'
import Head from "next/head";
import Link from 'next/link'
import Button from '../../components/Button'
import LetteringTitle from '../../components/LetteringTitle'
import ProcessSection from '../../components/ProcessSection'
import initFadeUp from '../../utils/initFadeUp'
import Preloader from '../../components/Preloader'

export default function Process() {
  const [active, setActive] = useState(false)
  const [sections] = useState(['Immersion', 'Research & Discovery', 'Ideation & Strategy', 'Design', 'Development Support', 'Testing & Improvement'])

  const switcherHeightRef = useRef()

  useEffect(() => {
    document.querySelector('.navbar-active').classList.add('active-page')
    initFadeUp()
    initScrollTrigger()
    initSwitcherHeight()

    return () => {
      document.querySelector('.navbar-active').classList.remove('active-page')
    }
  }, [])

  const initSwitcherHeight = () => {
    const height = switcherHeightRef.current.clientHeight
    document.querySelector('.process-switcher').style.height = `${height + 24}px`
  }

  const toggleSwitcher = () => {
    const closedHeight = switcherHeightRef.current.clientHeight + 24
    const openHeight = closedHeight * 2
    if (active) {
      TweenMax.to('.process-switcher', 0.4, { height: closedHeight })
      TweenMax.to('.dropdown-icon', 0.4, { rotate: 0 })
      setActive(!active)
    } else {
      TweenMax.to('.process-switcher', 0.4, { height: openHeight })
      TweenMax.to('.dropdown-icon', 0.4, { rotate: 180 })
      setActive(!active)
    }
  }

  const initScrollTrigger = () => {
    gsap.to('.process-footer', {
      scrollTrigger: {
        trigger: '.process-footer',
        start: 'top bottom',
        onLeaveBack: () => {
          gsap.to('.process-nav', { duration: 0.25, autoAlpha: 1 })
        },
        onEnter: () => {
          gsap.to('.process-nav', { duration: 0.25, autoAlpha: 0 })
        },
      }
    })
  }

  return (
    <>
      <Head>
        <title>NOCT | Process - User Experience Design</title>
      </Head>

      {/* <Preloader
        assets={[
          'https://d3vt8ypyn13r24.cloudfront.net/ideation-strategy-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/ideation-strategy-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/ideation-strategy-c.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/immersion-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/immersion-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/immersion-c.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/design-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/design-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/design-c.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/research-discovery-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/research-discovery-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/research-discovery-c.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/dev-support-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/dev-support-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/testing-improvement-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/testing-improvement-b.mp4',
        ]}
      /> */}

      {/* Process Nav Stepper */}
      <div className="process-nav d-none d-lg-flex">
        {
          sections.map((section, index) => (
            <div className="process-nav-item" data-name={section} key={index}
              onClick={() => document.getElementById(`section-${index + 1}`).scrollIntoView({ behavior: "smooth" })}
            />
          ))
        }
      </div>

      {/* Process Hero */}
      <section className="hero-section">
        <div className="process-fixed-elements">
          <div className="process-fixed-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="255" height="289"><g transform="matrix(-.390731 .920505 -.920505 -.390731 253.355787 68.602547)" stroke="#1a1a1a" fill="none" opacity=".88" strokeWidth=".85"><path d="M76.11.074c16-.8 31.9 4.9 45.1 16.8 12 10.8 22.4 23.3 34.8 33.6 19.1 15.9 39.2 30.7 59 45.7 12.3 9.3 21.3 20.7 23 36.2 2.7 24.9-20.6 44.6-47.2 38.2-20.1-4.8-39.8-12.2-58.9-20.5-35.5-15.4-70.2-32.6-101.3-56-7.9-5.9-15.4-12.8-21.6-20.4-15.8-19.6-9.1-38.6 6.8-51.9 16.8-14.1 36.3-21.6 60.3-21.7z" opacity=".88" /><path d="M74.91 13.174c15.8.2 29.8 5.7 41.3 16.3 26.6 24.6 52.8 49.7 82.1 71.3 7.3 5.4 12.9 13.9 17.4 22 7.4 13.2.2 27.5-14.1 32-9.6 3.1-19 2.1-27.9-1.1-47.8-17.2-94.1-37.7-134.7-69-3.9-3-7.4-6.7-10.4-10.6-14.6-19.8-10.7-38.2 10.4-50.8 10.8-6.4 23.8-10.1 35.9-10.1z" opacity=".88" /><path d="M73.51 27.474c-3.7.7-9.3.9-14.2 3-18.3 8-27.2 20.2-12.9 40 4.3 6 10.5 10.9 16.6 15.3 25.7 18.8 55.3 29.9 84.1 42.4 8 3.4 16.4 6.2 24.9 8.1 4.6 1 9.9.2 14.5-1 6.1-1.7 8.5-6.7 5.3-12.2-3.7-6.5-8-12.9-13.2-18.1-6.9-7.1-15.2-12.8-22.5-19.6l-44.4-41.9c-10.2-9.1-22.3-15.1-38.2-16z" opacity=".88" /><path d="M81.41 42.774c4.3 1.8 11 3.7 16.7 7.1 15.9 9.6 26.3 24.2 34.6 40.4 2.6 5-1.8 10.6-7.9 9.4-20.3-4.1-39.6-11-55.4-25.2-1.7-1.6-3.1-3.5-4.5-5.4-3.7-5.3-5.9-11.2-2.7-17.3 3.4-6.4 9.9-8.2 19.2-9z" opacity=".88" /></g></svg>
          </div>
          <div className="process-fixed-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><circle cx="32" cy="32" r="32" fill="#d2f3f7" fillRule="evenodd" /></svg>
          </div>
        </div>
        <div className="container">
          <div className="process-hero-mt">
            <div className="h4 xl-ls font-weight-normal text-uppercase mb-3">Design Process:</div>
            <div className="process-select mb-2">
              <div className="d-block d-lg-flex flex-row justify-content-start">
                <div className="process-switcher" onClick={() => toggleSwitcher()}>
                  <div ref={switcherHeightRef} className="process-switcher__item active">
                    <div className="h1 d-flex align-items-center justify-content-between justify-content-md-start">
                      <LetteringTitle text="User Experience Design" />
                      <svg className="dropdown-icon ml-4 mt-0 mt-lg-2" width="30px" height="17px" viewBox="0 0 30 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
                          <g className="stroke" id="6.1" transform="translate(-833.000000, -356.000000)" stroke="#1A1A1A" strokeWidth="4">
                            <g id="Group-2" transform="translate(120.000000, 317.000000)">
                              <g id="Path-3" transform="translate(715.000000, 41.000000)">
                                <path d="M0,0 L12.575736,12.575736 C12.8100505,12.8100505 13.1899495,12.8100505 13.424264,12.575736 L26,0 L26,0" id="Path-2" />
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <Link href="/process/branding">
                    <a>
                      <div className="process-switcher__item"><div className="h1">Branding &amp; Communication</div ></div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <p style={{ maxWidth: '690px' }} className="lg" data-fade-up>
              We follow a human centered approach to user experience design and use design thinking to solve problems. We build things in sprints, design quick, lean and adapt fast.
              </p>
          </div>
        </div>
      </section>

      <section id="section-1">
        <ProcessSection
          alt={false}
          index="1"
          title="Immersion"
          desc="You give us a brief, and we dive deep into it."
          items={[
            {
              title: "Understanding Vision & Objectives",
              desc: "In our goal-oriented immersion, a list of concrete deliverables - specific to your needs - is formulated and presented to you for review."
            },
            {
              title: "Team Formation",
              desc: "Acquainted with your vision, we carefully handpick designers from our network, based on their unique skills & experience to form a team."
            },
            {
              title: "Kick-off Workshop",
              desc: "The project lead conducts a virtual session with all stakeholders from business, design and tech to ensure that everyone is on the same page."
            }
          ]}
          video1="immersion-a.mp4"
          video2="immersion-b.mp4"
          video3="immersion-c.mp4"
        />
      </section>

      <section id="section-2">
        <ProcessSection
          alt={true}
          index="2"
          title="Research &amp; Discovery"
          desc="In order to gain a deeper, more meaningful understanding of your current product, end users and competitors, we dig deep to find insights that ensure maximum value for your users"
          items={[
            {
              title: "User Research",
              desc: "We jump into your end users' shoes, to identify what makes them tick, resolve their issues and uncover untapped opportunities."
            },
            {
              title: "Competitive Analysis",
              desc: "Competitive analysis involves identifying major competitors in the market, and learning from their products & strategies."
            },
            {
              title: "Heuristic Evaluation",
              desc: "For existing products, we conduct an expert evaluation by studying the interface & judging its compliance with recognized usability principles."
            }
          ]}
          video1="research-discovery-a.mp4"
          video2="research-discovery-b.mp4"
          video3="research-discovery-c.mp4"
        />
      </section>

      <section id="section-3">
        <ProcessSection
          alt={false}
          index="3"
          title="Ideation &amp; Strategy"
          desc="We draw insights from collected data to create a strategic product roadmap, with unique features &amp; functionality, to solve real problems."
          items={[
            {
              title: "Journey Mapping",
              desc: "Our team compiles a timeline with contextualised, predictable and unpredictable user actions covering all aspects of the user's journey."
            },
            {
              title: "Feature Ideation",
              desc: "Based on the journey map we come up with ideas in the form of ‘user stories’, which are categorised and filtered, into the product roadmap."
            },
            {
              title: "Information Architecture",
              desc: "All features and content of the application are logically categorised, to devise an intuitive navigation structure for your app or website."
            }
          ]}
          video1="ideation-strategy-a.mp4"
          video2="ideation-strategy-b.mp4"
          video3="ideation-strategy-c.mp4"
        />
      </section>

      <section id="section-4">
        <ProcessSection
          alt={true}
          index="4"
          title="Design"
          desc="The most tangible part of our process! Now is when we use all our research and ideation, to establish an interface for your product, which is not only incredibly easy to use, but also brings joy to those using it."
          items={[
            {
              title: "Wireframes",
              desc: "We develop a basic structural blueprint for your product that enables us to test your application's flow without any visual distractions!"
            },
            {
              title: "Visual Design",
              desc: "With pixel perfect UI & custom illustrations, we create design systems that ensure consistency and aesthetics for your product's visual appeal."
            },
            {
              title: "Motion & Interaction",
              desc: "We also design motion, animations and micro interactions that add in some final zing into your products and enchant your users!"
            }
          ]}
          video1="design-a.mp4"
          video2="design-b.mp4"
          video3="design-c.mp4"
        />
      </section>

      <section id="section-5">
        <ProcessSection
          alt={false}
          index="5"
          title="Development Support"
          desc="While the dev team starts bringing the product to life, we play a support role and guide them to ensure that the final design is executed as intended, from start to finish - until the product is shipped."
          items={[
            {
              title: "Specs Handoff",
              desc: "Time for the fluid hand-over of our final design files, associated assets and screens to the development team, paired with detailed specifications about how your final product flows best."
            },
            {
              title: "Design Q&A Support",
              desc: "Once the development team has actualised our designs, we conduct a thorough design quality assurance exercise and offer any support required to ensure a smooth execution of the design."
            }
          ]}
          video1="dev-support-a.mp4"
          video2="dev-support-b.mp4"
        />
      </section>

      <section id="section-6">
        <ProcessSection
          alt={true}
          index="6"
          title="Testing &amp; Improvement"
          desc="Once the product has been shipped to its first beta users, we monitor the usage to identify any design gaps we can fill &amp; make improvements."
          items={[
            {
              title: "Usability Testing",
              desc: "A small set of target end-users will then test your product to expose usability issues based on ease of use, flexibility to handle controls and the product’s ability to meet its objectives."
            },
            {
              title: "Feedback Analysis & Implementation",
              desc: "Upon identifying the needs and frustrations of the user, our team uses that data to analyse what we can do to upgrade the product further and make improvements in design, features or functionality."
            }
          ]}
          video1="testing-improvement-a.mp4"
          video2="testing-improvement-b.mp4"
        />
      </section>

      <section className="process-footer padded-section bg-grey">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="h3 mb-5">We build lean, fail fast and learn quick. We deliver high quality products, the right way.</div>
              <Link href="/contact">
                <a>
                  <Button text="Get In Touch" style="normal" />
                </a>
              </Link>
            </div>
            <div className="col-10 col-lg-5 text-left text-lg-right">
              <img src="/images/illustrations/static/process-footer-illustration.svg" alt="" />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
