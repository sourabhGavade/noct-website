import { useState, useEffect } from 'react'
import { useSwipeable } from "react-swipeable";


export default function TestimonialSlider({ slides }) {

  const [activeSlide, setActiveSlide] = useState(0)
  const [isAnimating, setisAnimating] = useState(false)
  const [slide, setSlide] = useState({})

  useEffect(() => {
    goToSlide(0)
  }, [])

  const goToSlide = (n) => {
    setisAnimating(true)
    gsap.to('.slider-title', { duration: 0.6, opacity: 0 });
    gsap.to('.slider-desc', { duration: 0.6, opacity: 0 });
    setActiveSlide(n);
    setTimeout(() => {
      setSlide(slides[n]);
      gsap.to('.slider-title', { duration: 0.8, opacity: 1 });
      gsap.to('.slider-desc', { duration: 0.8, opacity: 1 });
      setisAnimating(false)
    }, 600);
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeSlide < (slides.length - 1)) {
        goToSlide(activeSlide + 1)
      } else if (activeSlide === (slides.length - 1)) {
        goToSlide(0)
      }
    },
    onSwipedRight: () => {
      if (activeSlide === 0) {
        goToSlide(slides.length - 1)
      } else {
        goToSlide(activeSlide - 1)
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <>
      <div className="slider slider-grid" {...swipeHandlers}>
        <div className="slider-info mobile-full-bleed">
          <div className="h6 mb-3 mb-lg-5 text-uppercase" style={{ color: 'var(--blue)' }}>Testimonials</div>
          <div className="row">
            <div className="col-lg-12 col-xl-11">
              <div className="slider-testimonial">
                <div className="testimonial-quote-open"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="22"><path d="M29.648 21.953V11.68h-6.133c-.104-1.042.104-2.122.625-3.242.911-2.109 2.682-3.568 5.313-4.375h0V0c-3.464.703-6.152 2.174-8.066 4.414s-2.871 5.339-2.871 9.297h0v8.242h11.133zm-18.516 0V11.68H5c-.078-1.146.117-2.253.586-3.32.911-2.031 2.695-3.464 5.352-4.297h0V0C7.37.703 4.655 2.188 2.793 4.453S0 9.805 0 13.711h0v8.242h11.133z" fill="#222323" opacity=".4" /></svg></div>
                <p className="slider-desc mb-3">{slide.desc}</p>
                <div className="slider-title h5">{slide.title}</div>
                <div className="testimonial-quote-close"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="22"><path d="M.352.047V10.32h6.133c.104 1.042-.104 2.122-.625 3.242-.911 2.109-2.682 3.568-5.312 4.375h0V22c3.464-.703 6.152-2.174 8.066-4.414s2.871-5.339 2.871-9.297h0V.047H.352zm18.516 0V10.32H25c.078 1.146-.117 2.253-.586 3.32-.911 2.031-2.695 3.464-5.352 4.297h0V22c3.568-.703 6.283-2.187 8.145-4.453S30 12.195 30 8.289h0V.047H18.867z" fill="#222323" opacity=".4" /></svg></div>
              </div>
            </div>
          </div>
          <div className="slider-nav mt-5">
            <div className={`slider-active ${isAnimating ? 'is-animating' : ''}`}
              style={{
                'transform': `translateX(${20 * activeSlide}px)`
              }}
            />
            {
              slides.map((slide, index) => (
                <div key={`dot${index}`} className="slider-nav-item" onClick={() => goToSlide(index)}></div>
              ))
            }
          </div>
        </div>
        <div className="slider-img" style={{ backgroundImage: `${slides[activeSlide].image}` }} />
      </div>
      <style jsx>{`
      
        .slider-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          align-items: center;
        }

        .slider-info {
          padding: 40px 48px;
          margin-top: 40px;
          margin-bottom: 40px;
          background: var(--light-blue);
        }

        .slider-desc {
          min-height: 168px;
        }

        .slider-testimonial .slider-desc {
          min-height: 0;
        }

        .slider-testimonial {
          position: relative;
          min-height: 250px;
          padding: 40px 30px 0;
        }

        .testimonial-quote-open {
          position: absolute;
          top: 0;
          left: 0;
        }

        .testimonial-quote-close {
          position: absolute;
          bottom: 50px;
          right: 0;
        }

        .slider-img {
          position: relative;
          height: 100%;
          background-size: cover;
          transition: background-image 0.5s ease 0.5s;
        }

        .slider-img-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .slider-nav {
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          transition: all .3s ease;
        }

        .slider-nav-item {
          cursor: pointer;
          width: 8px;
          height: 8px;
          background: #A6A6A6;
          border-radius: 50%;
          padding: 2px;
          margin-right: 12px;
        }

        .slider-nav-item:last-child {
          margin-right: 0;
        }

        .slider-active {
          position: absolute;
          left: -2px;
          top: -2px;
          width: 12px;
          height: 12px;
          background: url('/images/gooey-sprite-horizontal.png') 0% 50%;
          background-size: cover;
          transition: all .35s ease;
        }

        .slider-active.is-animating {
          animation: sprite-horizontal 0.35s steps(6) forwards;
        }

        @keyframes sprite-horizontal {
          100% { background-position: -100% 50% }
        }

        @media screen and (max-width: 992px) {

          .slider-grid {
            grid-template-columns: 1fr;
          }

          .slider-img {
            height: 300px;
            z-index: 1;
            order: -1;
          }
          
          .slider-info {
            padding: 200px 24px 80px;
            margin-top: -180px;
          }

          .slider-desc {
            min-height: 140px;
          }

        }
      
      `}</style>
    </>
  )
}
