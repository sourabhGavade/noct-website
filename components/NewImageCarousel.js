import { useEffect, useState, useRef } from 'react'
import useWindowSize from '../utils/useWindowSize'
import OwlCarousel from 'react-owl-carousel';

export default function ImageCarousel({ imgs }) {

  const carouselRef = useRef()
  const windowSize = useWindowSize()

  useEffect(() => {
    initScrollTrigger()
  }, [])

  const initScrollTrigger = () => {
    let carousel = $('.carousel-target')
    gsap.to(carousel, {
      scrollTrigger: {
        trigger: carousel,
        start: '-=500',
        once: true,
        onEnter: () => {
          carouselRef.current.to(3, 800)
        }
      }
    })
  }

  return (
    <>
      <div className="position-relative">
        <OwlCarousel
          autoWidth={true}
          loop={true}
          margin={40}
          nav={true}
          navSpeed={800}
          slideTransition={'ease'}
          slideBy={2}
          ref={carouselRef}
          stageClass={'carousel-target'}
          pullDrag={false}
        >
          {
            imgs.map((img, index) => (
              <div className="item image-carousel-item flex-center" key={`carouselItem${index}`}>
                <div>
                  <img src={img.url} key={index} alt={`Noct Image ${index}`} style={{width: windowSize.width < 768 ? '240px' : img.width}} />
                  {
                    img.caption && <p className="caption mt-2" style={{width: windowSize.width < 768 ? '240px' : img.width}}>{img.caption}</p>
                  }
                </div>
              </div>
            ))
          }
        </OwlCarousel>
      </div>

      <style jsx>{`

        .image-carousel-item {
          min-height: 460px;
          display: grid;
          place-items: center;
        }

        @media screen and (max-width: 768px) {
          .image-carousel-item {
            min-height: 307px;
          }
        }
      
      `}
      </style>
    </>
  )
}
