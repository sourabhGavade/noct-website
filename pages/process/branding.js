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
  const [sections] = useState(['Scope & Definition', 'Research & Strategy', 'Concept & Ideation', 'Brand Identity', 'Brand Collaterals'])

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
        <title>NOCT | Process - Branding & Communication</title>
      </Head>

      {/* <Preloader
        assets={[
          'https://d3vt8ypyn13r24.cloudfront.net/scope-definition-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/scope-definition-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/research-strategy-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/research-strategy-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/research-strategy-c.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/concept-ideation-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/concept-ideation-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/brand-identity-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/brand-identity-b.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/brand-collaterals-a.mp4',
          'https://d3vt8ypyn13r24.cloudfront.net/brand-collaterals-b.mp4'
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
                      <LetteringTitle text="Branding &amp; Communication" />
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
                  <Link href="/process/ux">
                    <a>
                      <div className="process-switcher__item"><div className="h1">User Experience Design</div ></div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <p style={{ maxWidth: '690px' }} className="lg" data-fade-up>
              We build your vision, not just visuals; what we create is a living breathing personality with a voice and mind of its own. We build brands to be believable, consistent and outlast their creators.
              </p>
          </div>
        </div>
      </section>

      <section id="section-1">
        <ProcessSection
          alt={false}
          index="1"
          title="Scope &amp; Definition"
          desc="The first step in the process is to understand the brief and formulate the list of deliverables as per your goals."
          items={[
            {
              title: "Understanding Vision & Objectives",
              desc: "Understanding the scope of the project, the brand, it’s vision and objectives via key stakeholders."
            },
            {
              title: "Goal Setting & Team Formation",
              desc: "Defining the deliverables and formation of the team with the required skills accordingly."
            }
          ]}
          deliverables="Final Brief and Branding Form"
          video1="scope-definition-a.mp4"
          video2="scope-definition-b.mp4"
        />
      </section>

      <section id="section-2">
        <ProcessSection
          alt={true}
          index="2"
          title="Research &amp; Strategy"
          desc="Developing an overall knowledge of the brand assists with the creation, development, management and strengthening of brands. Analysis is carried out to understand the landscape and develop a launch strategy."
          items={[
            {
              title: "Research",
              desc: "Initial research on the brand, its existing collaterals and digital presence (if any)."
            },
            {
              title: "Competitive Analysis",
              desc: "Study of the brand's direct and indirect competitors to understand their patterns and positioning."
            },
            {
              title: "Defining",
              desc: "Defining the brand's positioning and core values to find the right vibe of the brand."
            }
          ]}
          deliverables="Competitive Analysis &amp; Brand Notes"
          video1="research-strategy-a.mp4"
          video2="research-strategy-b.mp4"
          video3="research-strategy-c.mp4"
        />
      </section>

      <section id="section-3">
        <ProcessSection
          alt={false}
          index="3"
          title="Concept &amp; Ideation"
          desc="Ideas and solutions are generated by challenging existing trends, beliefs and thinking outside the box. The most fruitful ideas are then envisioned into different concepts that best fit the brief."
          items={[
            {
              title: "Logo & Brand Ideation",
              desc: "Ideation on the logo and language of the brand with moodboards and concept sketches."
            },
            {
              title: "Concept Creation",
              desc: "Concept creation based on the research and ideation with logo and visual language sketches."
            }
          ]}
          deliverables="Brand Concept Presentation with logo sketches and brand personality"
          video1="concept-ideation-a.mp4"
          video2="concept-ideation-b.mp4"
        />
      </section>

      <section id="section-4">
        <ProcessSection
          alt={true}
          index="4"
          title="Brand Identity"
          desc="Brand identity is formed by assembling the collection of all elements that we create to portray the right image of the brand to its user. We embody the concepts to a final more cohesive identity and develop its persona further."
          items={[
            {
              title: "Concept Implementation",
              desc: "Taking the finalised concept forward into the design of the final logo and development of brand identity."
            },
            {
              title: "Identity Creation",
              desc: "Development of brand identity as per the brand concept and logo using graphical elements."
            }
          ]}
          deliverables="Brand Concept Presentation with logo, brand identity and visual style."
          video1="brand-identity-a.mp4"
          video2="brand-identity-b.mp4"
        />
      </section>

      <section id="section-5">
        <ProcessSection
          alt={false}
          index="5"
          title="Brand Collaterals"
          desc="Ultimately the collaterals specific to your brand are created making sure that the brand persona shines through. The entire brand guidelines are defined and documented ensuring future cohesiveness for your brand."
          items={[
            {
              title: "Collaterals Handoff",
              desc: "Application of the brand identity and visual language in the form of brand collaterals."
            },
            {
              title: "Documentation",
              desc: "Defining and documenting the guideline of the identity and visual language of the brand in the guideline."
            }
          ]}
          deliverables="Brand Collaterals and Brand Guideline Document."
          video1="brand-collaterals-a.mp4"
          video2="brand-collaterals-b.mp4"
        />
      </section>

      <section className="process-footer padded-section bg-grey">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="h3 mb-5">Let's build a fabulous brand together!</div>
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
