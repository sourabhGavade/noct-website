import React, { useState, useRef, useEffect } from 'react'

export default function ProcessSection({ alt, index, title, desc, items, deliverables, video1, video2, video3 }) {

  const [activeItem, setActiveItem] = useState(3)
  const [activeVideo, setActiveVideo] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mcIndex, setMcIndex] = useState(0)

  const video1Ref = useRef()
  const video2Ref = useRef()
  const video3Ref = useRef()
  const mobCarousel = useRef()
  const mobVideo1 = useRef()
  const mobVideo2 = useRef()
  const mobVideo3 = useRef()
  const process1 = useRef()
  const process2 = useRef()
  const process3 = useRef()

  const mcItems = items.length

  useEffect(() => {
    initScrollPlay()
    initMobileCarousel()

    return () => {
      ScrollTrigger.getAll('scrollPlay').forEach(st => st.kill())
    }
  }, [])

  const initMobileCarousel = () => {
    const scroller = mobCarousel.current
    mobCarousel.current.addEventListener('scroll', () => {
      const index = Math.round((scroller.scrollLeft / scroller.scrollWidth) * mcItems)
      switch(index) {
        case 0:
          setActiveVideo(0)
          mobVideo1.current.play()
          // reset other videos to 0:00
          mobVideo2.current.pause()
          video3 ? mobVideo3.current.pause() : ''
          mobVideo2.current.currentTime = 0
          video3 ? mobVideo3.current.currentTime = 0 : ''
          break;
        case 1:
          setActiveVideo(1)
          mobVideo2.current.play()
          // reset other videos to 0:00
          mobVideo1.current.pause()
          video3 ? mobVideo3.current.pause() : ''
          mobVideo1.current.currentTime = 0
          video3 ? mobVideo3.current.currentTime = 0 : ''
          break;
        case 2:
          setActiveVideo(2)
          mobVideo3.current.play()
          // reset other videos to 0:00
          mobVideo1.current.pause()
          mobVideo2.current.pause()
          mobVideo1.current.currentTime = 0
          mobVideo2.current.currentTime = 0
          break;
        default:
          break;
      }
      const itemWidth = scroller.scrollWidth / mcItems
      if (scroller.scrollLeft < (itemWidth * (mcItems - 2)) + 20) {
        setMcIndex(index)
      } else {
        setMcIndex(mcItems - 1)
      }
    })
  }

  const initScrollPlay = () => {
    // Desktop
    gsap.to(video1Ref.current, {
      scrollTrigger: {
        trigger: video1Ref.current,
        start: 'top 80%',
        onEnter: () => {
          video1Ref.current.play()
        }
      },
    });
    
    // Mobile
    gsap.to(mobVideo1.current, {
      scrollTrigger: {
        trigger: mobVideo1.current,
        start: 'top 80%',
        onEnter: () => {
          mobVideo1.current.play()
        }
      },
    });
  }

  const goToItem = (x) => {
    if (x === activeItem) {
      return
    }
    setIsAnimating(true)
    switch(x) {
      case 0:
        TweenMax.to(`.process-items__dot-${index}`, 0.4, { y: 0, delay: 0.05 });
        setActiveItem(0)
        setActiveVideo(0)
        video1Ref.current.play()
        // reset other videos to 0:00
        video2Ref.current.pause()
        video3 ? video3Ref.current.pause() : ''
        video2Ref.current.currentTime = 0
        video3 ? video3Ref.current.currentTime = 0 : ''
        break;
      case 1:
        TweenMax.to(`.process-items__dot-${index}`, 0.4, { y: process2.current.offsetTop, delay: 0.05 });
        setActiveItem(1)
        setActiveVideo(1)
        video2Ref.current.play()
        // reset other videos to 0:00
        video1Ref.current.pause()
        video3 ? video3Ref.current.pause() : ''
        video1Ref.current.currentTime = 0
        video3 ? video3Ref.current.currentTime = 0 : ''
        break;
      case 2:
        TweenMax.to(`.process-items__dot-${index}`, 0.4, { y: process3.current.offsetTop, delay: 0.05 });
        setActiveItem(2)
        setActiveVideo(2)
        video3Ref.current.play()
        // reset other videos to 0:00
        video1Ref.current.pause()
        video2Ref.current.pause()
        video1Ref.current.currentTime = 0
        video2Ref.current.currentTime = 0
        break;
    }
    setTimeout(() => {
      setIsAnimating(false)
    }, 550);
  }
  
  return (
    <>
      <section className="padded-section">
        <div className="container">
          <div className="row process-section">
            <div className={`col-md-6 ${alt ? 'order-1 order-md-2' : 'order-1'}`} >
              <div className={`process-section__index mb-4 ${alt ? 'text-left text-md-right' : 'text-left'}`}>
                <div className="h1">{index}</div>
              </div>
              <div className={`process-video-container d-none d-md-block ${alt ? 'text-right' : 'text-left'}`}>
                  <video ref={video1Ref} className={`process-video ${activeVideo === 0 ? 'show' : ''}`} playsInline muted src={`https://d3vt8ypyn13r24.cloudfront.net/${video1}`}></video>
                  <video ref={video2Ref} className={`process-video ${activeVideo === 1 ? 'show' : ''}`} playsInline muted src={`https://d3vt8ypyn13r24.cloudfront.net/${video2}`}></video>
                  {
                    video3 &&
                    <video ref={video3Ref} className={`process-video ${activeVideo === 2 ? 'show' : ''}`} playsInline muted src={`https://d3vt8ypyn13r24.cloudfront.net/${video3}`}></video>
                  }
              </div>
            </div>
            <div className={`col-md-6 ${alt ? 'order-1' : 'order-1 order-md-2'}`}>
              <div className="h2 mb-1">{title}</div>
              <p className="desc mb-5">{desc}</p>
              <div className="process-video-container-mobile position-relative d-block d-md-none mb-5">
                <video ref={mobVideo1} className={`process-video ${activeVideo === 0 ? 'show' : ''}`} playsInline muted src={`https://d3vt8ypyn13r24.cloudfront.net/${video1}`}></video>
                <video ref={mobVideo2} className={`process-video ${activeVideo === 1 ? 'show' : ''}`} playsInline muted src={`https://d3vt8ypyn13r24.cloudfront.net/${video2}`}></video>
                {
                  video3 &&
                  <video ref={mobVideo3} className={`process-video ${activeVideo === 2 ? 'show' : ''}`} playsInline muted src={`https://d3vt8ypyn13r24.cloudfront.net/${video3}`}></video>
                }
              </div>
              <div className="process-items__container mobile-carousel process-mobile-carousel" ref={mobCarousel}>
                <span className="process-items__dot-container d-none d-md-block">
                  <div className={`process-items__dot process-items__dot-${index} ${isAnimating ? 'is-animating' : ''}`}></div>
                </span>
                <div ref={process1} className="process-item process-item-1" onMouseEnter={() => goToItem(0)}>
                  <div className="h4 mb-2">{items[0].title}</div>
                  <p>{items[0].desc}</p>
                </div>
                <div ref={process2} className="process-item process-item-2" onMouseEnter={() => goToItem(1)}>
                  <div className="h4 mb-2">{items[1].title}</div>
                  <p>{items[1].desc}</p>
                </div>
                {
                  items.length === 3 &&
                  <div ref={process3} className="process-item process-item-3" onMouseEnter={() => goToItem(2)}>
                    <div className="h4 mb-2">{items[2].title}</div>
                    <p>{items[2].desc}</p>
                  </div>
                }
              </div>
              <div className="mc-dots d-flex d-md-none">
                {
                  new Array(mcItems).fill('0').map((item, index) => (
                    <span className={`mc-dot ${mcIndex === index ? 'active' : ''}`} key={`mc${index}`}></span>
                  ))
                }
              </div>
              {
                deliverables &&
                <div className="process-section__deliverables p-3 p-md-4">
                  <div className="h6 mb-3 orange text-uppercase">Deliverables</div>
                  <div className="h5">{deliverables}</div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`

        .process-section__index .h1 {
          font-size: 104px;
        }
      
        .process-item {
          cursor: default;
          margin-bottom: 32px;
        }

        .process-items__container {
          position: relative;
        }

        .process-items__dot-container {
          position: absolute;
          top: 6px;
          left: -32px;
          width: 16px;
          height: 100%;
        }

        .process-items__dot {
          width: 20px;
          height: 20px;
          background: url('/images/gooey-sprite-vertical.png') 0% 50%;
          background-size: cover;
        }

        .process-items__dot.is-animating {
          animation: sprite-anim 0.55s steps(10) forwards;
        }

        @keyframes sprite-anim {
          100% { background-position: 100% 50% }
        }

        .process-video-container {
          position: relative;
        }

        .process-video {
          max-width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: 0.025s ease;
        }

        .process-video.show {
          opacity: 1;
        }

        .process-section__deliverables {
          background: #FCF8F7;
          margin-top: 40px;
        }

        @media screen and (max-width: 992px) {

          .process-section__index .h1 {
            font-size: 36px;
          }

        }

        @media screen and (max-width: 769px) {

          .process-item {
            padding-top: 60vw;
          }

        }
      
        @media screen and (max-width: 650px) {

          .process-item {
            padding-top: 72vw;
          }

        }


      `}</style>
    </>
  )
}
