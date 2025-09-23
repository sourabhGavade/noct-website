import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Button from '../components/Button'
import WorkItem from '../components/WorkItem'
import Service from '../components/Service'
import BlogItem from '../components/BlogItem'
import FooterCTA from '../components/FooterCTA'
import ButtonLink from '../components/ButtonLink'
import initFadeUp from '../utils/initFadeUp'
import sanityClient from '../client'
import urlFor from '../utils/urlFor'
import AwardsPopUp from '../components/AwardsPopUp'


const HomeHero = dynamic(
  () => import('../components/HomeHero'),
  { ssr: false }
)

const ImageCarousel = dynamic(
  () => import('../components/ImageCarousel'),
  { ssr: false }
)

export async function getStaticProps() {
  const content = await sanityClient.fetch(`*[_type=="home"][0]`)
  const featuredProjects = await sanityClient.fetch(`*[_type=="projects" && isFeatured == true] | order(priority asc) {_id, projectTitle, slug, projectCaption, previewImage, previewImageBg}`)

  return {
      revalidate: 60,
      props: {
          content,
          featuredProjects
      },
  }
}

export default function Home({ content, featuredProjects }) {
  const [imageCarouselArray, setImageCarouselArray] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    initScrollTrigger()
    initFadeUp()
    initImageCarousel()

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  const initClientLogoAnimation = () => {
    let tl = new TimelineMax({ repeat: -1 })
    tl.staggerTo('.logo-1', 1.2, { opacity: 0, delay: 1 }, 0.2)
    tl.staggerTo('.logo-2', 1.2, { opacity: 1 }, 0.2, '-=1')
    tl.staggerTo('.logo-2', 1.2, { opacity: 0, delay: 1 }, 0.2)
    tl.staggerTo('.logo-1', 1.2, { opacity: 1 }, 0.2, '-=1')
  }

  const countToNumber = (id, start, end, duration) => {
    if (process.browser) {
      let range = end - start;
      let current = start;
      let increment = end > start ? 1 : -1;
      let stepTime = Math.abs(Math.floor(duration / range));
      let obj = document.getElementById(id);
      let timer = setInterval(function () {
        current += increment;
        obj ? obj.innerHTML = current : ''
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }
  }

  const initScrollTrigger = () => {
    gsap.from('.work-item-see-all', {
      scrollTrigger: {
        id: 'workItem',
        trigger: '.work-item-see-all',
        start: '-5% bottom',
      },
      opacity: 0,
      y: 100,
      scale: 0.75,
      duration: 0.5
    });

    gsap.from('.services-container', {
      scrollTrigger: {
        trigger: '.services-container',
        start: 'top 80%',
        onEnter: () => {
          TweenMax.staggerFrom('.service-trigger', 0.4, { opacity: 0, y: 40 }, 0.06)
        }
      },
      opacity: 0,
      y: 40,
      duration: 0.4,
      delay: 0.1,
      ease: 'ease',
      id: 'serviceScrollTrigger'
    });

    gsap.to('.client-logos-container', {
      scrollTrigger: {
        trigger: '.client-logos-container',
        start: '-=800',
        onEnter: () => {
          setTimeout(() => {
            initClientLogoAnimation()
          }, 1000)
        }
      }
    })

    gsap.from('#projects', {
      scrollTrigger: {
        trigger: '#projects',
        once: true,
        onEnter: () => {
          setTimeout(() => {
            countToNumber('projects', 95, content.projectsExecuted, 500)
          }, 250);
        }
      }
    });

    gsap.from('#years', {
      scrollTrigger: {
        trigger: '#years',
        once: true,
        onEnter: () => {
          setTimeout(() => {
            countToNumber('years', 0, content.yearsOld, 500)
          }, 250);
        }
      }
    });

    gsap.from('#sectors', {
      scrollTrigger: {
        trigger: '#sectors',
        once: true,
        onEnter: () => {
          setTimeout(() => {
            countToNumber('sectors', 9, content.sectorsServiced, 500)
          }, 250);
        }
      }
    })
  }

  const initImageCarousel = () => {
    const arr = []
    content.imageCarousel?.map(img => {
      arr.push({ 
        url: `${urlFor(img.image).url()}`, 
        width: img.width,
        ...(img.caption ? { caption: img.caption } : {} )
      })
    })
    setImageCarouselArray(arr)
  }
  
  useEffect(() => {
    const awardsInterval = setInterval(() => {
      if (activeIndex < content.awards.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else {
        setActiveIndex(0)
      }
    }, 5000)

    return () => clearInterval(awardsInterval)
  }, [activeIndex])

  return (
    <>
      <Head>
        <title>NOCT | Network of Creative Thinkers</title>
      </Head>

      {/* <AwardsPopUp /> */}

      <HomeHero awards={content.awards} />

      {/* Home - Work Section */}
      <section className="padded-section">
        <div className="container">
          <div className="work-grid">
            {
              featuredProjects.map(project => (
                <WorkItem
                  key={project._id}
                  uid={project._id}
                  url={`/work/${project.slug.current}`}
                  img={urlFor(project.previewImage).url()}
                  imgBg={project.previewImageBg}
                  title={project.projectTitle}
                  desc={project.projectCaption}
                />
              ))
            }
            <div className="work-item work-item-sm work-item-see-all">
              <div className="work-item-see-all-inner">
                <div className="work-title mt-0 mb-5 pr-5">
                  Join us further down the rabbit hole to see some more fascinating projects
                  <br/><br/>
                </div>
                <Link href="/work">
                  <a><ButtonLink text="View All Work" /></a>
                </Link>
              </div>
            </div>
            {/* <div className="d-block d-lg-none">
              <Link href="/work"><a><Button text="View All Work" /></a></Link>
            </div> */}
          </div>
        </div>
      </section>

      {/* Home - Services Section */}
      <section className="padded-section">
        <div className="container services-container">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <div className="h2">{content.servicesTitle}</div>
            </div>
            <div className="col-lg-5 ml-auto">
              {
                content.services.map(service => (
                  <div className="service-trigger" key={service._key}>
                    <Service
                      title={service.title}
                      desc={service.description}
                    />
                  </div>
                ))
              }
              <Link href="/services">
                <a className="view-all-service-btn">
                  <Button text="View All Services" style="normal" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Home - Clients Section */}
      <section className="padded-section bg-grey">
        <div className="container" data-fade-up>
          <div className="row mb-5">
            <div className="col-lg-5 mr-md-auto">
              <div className="h2">{content.clientsTitle}</div>
            </div>
            <div className="col-lg-5 ml-auto">
              <p className="mb-5">{content.clientsDescription}</p>
              <div className="row clients-services">
                {
                  content.clientsIndustries.map(industry => (
                    <div className="col-6 mb-2" key={industry._key}>
                      <div className="h5 font-weight-regular">{industry}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="client-logos-container">
            {
              new Array(10).fill('').map((_, i) => (
                <div className={`client-logo-set ${i === 9 ? 'd-none d-lg-block' : ''}`} key={i}>
                  <div className="logo-1"><img src={urlFor(content.clientLogos[i]).url()} alt="" /></div>
                  <div className="logo-2"><img src={urlFor(content.clientLogosSecondary[i]).url()} alt="" /></div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Home - About Section */}
      <section className="home-about-section padded-section">
        <div className="container" data-fade-up>
          <div className="row">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="h3 mb-3">{content.aboutTitle}</div>
              <p className="lg mb-4 mb-md-5">{content.aboutDescription}</p>
              <Link href="/about">
                <a>
                  <Button text="More About Us" />
                </a>
              </Link>
            </div>
            <div className="about-stats-container col-lg-2 ml-auto">
              <div className="about-stat mb-4">
                <div className="d-flex flex-row justify-content-start">
                  <div className="h2 about-count" id="projects">{content.projectsExecuted}</div>
                  <div className="h2">+</div>
                </div>
                <div className="h5">Projects executed</div>
              </div>
              <div className="about-stat mb-4">
                <div className="d-flex flex-row justify-content-start">
                  <div className="h2">0</div>
                  <div className="h2 about-count" id="years">{content.yearsOld}</div>
                </div>
                <div className="h5">Years old</div>
              </div>
              <div className="about-stat">
                <div className="d-flex flex-row justify-content-start">
                  <div className="h2 about-count" id="sectors">{content.sectorsServiced}</div>
                  <div className="h2">+</div>
                </div>
                <div className="h5">Sectors serviced</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home - Image Carousel Desktop */}
      {
        content.imageCarousel?.length > 0 &&
        <section className="py-3">
          <div>
            <ImageCarousel
              animateScroll={true}
              imgs={imageCarouselArray}
            />
          </div>
        </section>
      }

      {/* Home - Blog Section */}
      <section className="padded-section">
        <div className="container">
          <div className="blog-container">
            <BlogItem
              date="#ARTICLE"
              title="Remote Working for designers in the time of COVID-19"
              link="https://medium.com/noct-talk/remote-working-for-designers-in-the-time-of-covid-19-f5012b78c6dd"
              readTime="14"
            />
            <BlogItem
              date="#EVENT"
              title="Design Hack for an alternate tourism ecosystem in Panchgani"
              link="https://medium.com/noct-talk/design-hack-for-an-alternate-tourism-ecosystem-in-panchgani-bb27e77d55c4"
              readTime="9"
            />
            <BlogItem
              date="#ADVERTISING"
              title="The Power of Wind: Inox Wind Theatre Ad"
              link="https://medium.com/noct-talk/the-power-of-wind-inox-wind-theatre-ad-f6cb91ea3ac6"
              readTime="5"
            />
          </div>
        </div>
      </section>

      {/* Home - Award Section */}
      <section className="home-award-section bg-grey">
        <div className="container">
            <div className="row align-items-stretch justify-content-between">
              <div className="col-8 col-lg-4 mb-4 mb-lg-0 flex-center">
                <img src="/images/award-image-2022.webp" alt="Award for India's Best Brand Design Studio 2022"/>
              </div>
              <div className="col-12 col-lg-7 pb-5 mb-0 mb-md-5">
                <div className="h2 mb-4 d-none d-sm-block">{content.awardsTitle}</div>
                {/* <p className='mb-4'>{content.awardsDescription}</p> */}
                <div className="d-flex flex-wrap">
                  <div className="design-award d-flex mr-4">
                    <img className="mr-2" src="/images/icons/award.svg" alt="Award Icon" />
                    <div className="h6 mb-0">
                      India’s Best<br/>Brand Design Studio<br/>
                      <span className="font-weight-light">IBDA 2022</span>
                    </div>
                  </div>
                  <div className="design-award d-flex mr-4">
                    <img className="mr-2" src="/images/icons/award.svg" alt="Award Icon" />
                    <div className="h6 mb-0">
                      India’s Best<br/>Brand Design Project<br/>
                      <span className="font-weight-light">IBDA 2021</span>
                    </div>
                  </div>
                  <div className="design-award d-flex">
                    <img className="mr-2" src="/images/icons/award.svg" alt="Award Icon" />
                    <div className="h6 mb-0">
                      India’s Best<br/> Design Studio<br/>
                      <span className="font-weight-light">IBDA 2020</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      <FooterCTA />

      <style jsx>{`
      
        .view-all-service-btn {
          display: inline-block;
          margin-top: 25px;
        }

        .home-award-section {
          position: relative;
          padding-top: 100px;
          overflow: hidden;
        }

        @media screen and (max-width: 992px) {

          .about-stats-container {
            display: flex;
          }

          .about-stat {
            margin-right: 40px;
          }

          .about-stat .h2,
          .about-count.h2 {
            margin-bottom: 6px;
          }

          .about-stat .h5 {
            font-size: 14px;
            font-weight: 400;
          }

        }

        @media screen and (max-width: 550px) {

          .home-award-section {
            padding-top: 42px;
          }
        }
      
      `}</style>
    
    </>
  )
}