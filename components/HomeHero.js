import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react'
import ScrollDownCTA from './ScrollDownCTA';
import urlFor from "../utils/urlFor";

// const AwardsCarousel = dynamic(
//   () => import('../components/AwardsCarousel'),
//   { ssr: false }
// )

export default function HomeHero({ awards }) {
  const [activeVideo, setActiveVideo] = useState('light')
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    initBlob()
    setTimeout(() => {
      document.addEventListener('mousemove', handleMouseMove)    
    }, 1500)

    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const initBlob = () => {
    if (window.innerWidth < 768) {
      gsap.to("#blobOne", { duration: 0.1,  attr: { r: '80px', cx: `${window.innerWidth}px`, cy: `${window.innerHeight - 240}px` }});
    } else {
      gsap.to("#blobOne", { duration: 1.5,  attr: { r: '210px', cx: `${(0.75 * window.innerWidth) - 105}px`, cy: `${(0.5 * window.innerHeight) - 50}px` }, ease: 'Power1.easeInOut' });
    }
  }

  const handleMouseMove = (e) => {
    gsap.to("#blobOne", { duration: 0.3, attr: { cx: `${e.clientX}px`, cy: `${e.pageY}px` } });
  }

  const heroMouseEnter = () => {
    gsap.to("#blobOne", { duration: 0.5, r: '210px' });
  }

  const heroMouseLeave = () => {
    gsap.to("#blobOne", { duration: 0.5,  r: '0' });
  }

  const bannerMouseLeave = () => {
    gsap.to('.video-bg-dark', { duration: 0.75, opacity: 0, ease: 'Power1.easeInOut', delay: 0.5 });
    gsap.to('#blobOne', { duration: 1.2, r: '210px', ease: 'Power1.easeInOut', delay: 0.2 });
    setActiveVideo('light')
  }

  const bannerMouseEnter = () => {
    gsap.to("#blobOne", { duration: 0.8, r: '40px', ease: 'Power1.easeInOut' });
    gsap.to('.video-bg-dark', { duration: 0.75, opacity: 1, ease: 'Power1.easeInOut' });
  }

  const bannerClick = () => {
    // gsap.to('.video-bg-dark', { duration: 0.5, opacity: 1, ease: 'Power1.easeInOut' })
    gsap.to("#blobOne", { duration: 1.2, r: '105vw', ease: 'Power1.easeInOut' });
    setActiveVideo('dark')
  }

  useEffect(() => {
    const awardsInterval = setInterval(() => {
      if (activeIndex < awards.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else {
        setActiveIndex(0)
      }
    }, 5000)

    return () => clearInterval(awardsInterval)
  }, [activeIndex])

  return (
    <>
      {/* Page */}
      <section className="hero-section home-hero-section flex-center" onMouseLeave={() => heroMouseLeave()} onMouseEnter={() => heroMouseEnter()} style={{ height: '100vh' }}>
        <div className="video-bg">
          <video autoPlay loop muted playsInline>
            <source src="/images/hero-video-light.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-bg-dark">
          <video autoPlay loop muted playsInline>
            <source src="/images/hero-video-dark.mp4" type="video/mp4" />
          </video>
        </div>
        <svg className="position-absolute">
          <clipPath id="videoMask" x="0" y="0">
            <circle id="blobOne" className="blob" r="2000px" fill="white" stroke="white" />
          </clipPath>
        </svg>
        <div className="hero-fixed-banner cursor-pointer" onMouseLeave={() => bannerMouseLeave()} onMouseEnter={() => bannerMouseEnter()} onClick={() => bannerClick()}>
          <div className="dot" />
            <span id="bannerText">Network of Creative Thinkers</span>
          </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-9 col-xl-6">
              <h1>We craft digital products &amp; brands</h1>
              <p className="mb-4 lg">
                A design agency in the cloud with a studio in the hills, that crafts digital experiences, weaves intricate tales and builds brands from the ground up.
              </p>
              {/* <div className="design-award d-flex flex-row justify-content-start align-items-center">
                <img className="mr-2" src="/images/icons/award.svg" alt="Award Icon" />
                <div className="h6 mb-0">
                  India's Best Brand Design Studio<br/>
                  <span className="subtext">IBDA 2022</span>
                </div>
              </div> */}
              <div className="awards-slider-container">
                {
                  awards.map((award, index) => (
                    <div 
                      key={index}
                      className={index === activeIndex ? 'slide active' : 'slide'}
                      style={{
                        transform: index === activeIndex ? 'translateY(0)' : 'translateY(20px)',
                        opacity: index === activeIndex ? 1 : 0,
                        transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out'
                      }}
                    >
                      <img src={urlFor(award).url()} alt="" />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
        <ScrollDownCTA />
      </section>
    </>
  )
}