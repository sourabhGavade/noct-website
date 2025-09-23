import { useEffect, useRef } from 'react'
import useWindowSize from '../utils/useWindowSize'

export default function ImageCarousel({ imgs }) {

  const carouselRef = useRef()
  const windowSize = useWindowSize();

  useEffect(() => {
    if (process.browser) {
      initCarousel()
    }
  }, [])

  const initCarousel = () => {
    // Set left padding
    let pad = document.querySelector('.container').offsetLeft
    carouselRef.current.style.paddingLeft = `${pad}px`
    document.querySelector('.images-carousel-item:last-child img').style.marginRight = `${pad}px`
    carouselRef.current.style.width = `calc(100% -${pad*2}px)`

    let rightAnimation
    let leftAnimation
    let scrollWidth

    imgs.map(item => { scrollWidth += (item.width + 40) })

    document.querySelector('.left-trigger').addEventListener('mouseenter', (e) => {
      // tl.timeScale(-0.1).reverse()
      //   setTimeout(() => { tl.timeScale(-0.25) }, 100);
      //   setTimeout(() => { tl.timeScale(-0.5) }, 250);
      //   setTimeout(() => { tl.timeScale(-0.75) }, 400);
      //   setTimeout(() => { tl.timeScale(-1) }, 550);
      // })
      leftAnimation = gsap.to('.images-carousel', { duration: 6, scrollTo: { x: 0 }, ease: "Power1.easeIn" })
    })

    document.querySelector('.left-trigger').addEventListener('mouseleave', (e) => {
      // tl.timeScale(-0.75)
      // setTimeout(() => { tl.timeScale(-0.5) }, 200);
      // setTimeout(() => { tl.timeScale(-0.25) }, 350);
      // setTimeout(() => {
      //   tl.pause()
      // }, 450);
      leftAnimation.kill()
    })

    document.querySelector('.right-trigger').addEventListener('mouseenter', (e) => {
      // tl.timeScale(0.1).play()
      // setTimeout(() => { tl.timeScale(0.25) }, 200);
      // setTimeout(() => { tl.timeScale(0.5) }, 400);
      // setTimeout(() => { tl.timeScale(0.75) }, 600);
      // setTimeout(() => { tl.timeScale(1) }, 800);
      rightAnimation = gsap.to('.images-carousel', { duration: 6, scrollTo: { x: scrollWidth }, ease: "Power1.easeIn" })
    })

    document.querySelector('.right-trigger').addEventListener('mouseleave', (e) => {
      // tl.timeScale(0.75)
      // setTimeout(() => { tl.timeScale(0.5) }, 200);
      // setTimeout(() => { tl.timeScale(0.25) }, 350);
      // setTimeout(() => { tl.pause() }, 450);
      rightAnimation.kill()
    })
  }

  return (
    <>
      <div className="position-relative">
        <div ref={carouselRef} id="carousel" className="images-carousel">
          {
            imgs.map((img, index) => (
              <div className="images-carousel-item" key={`carouselItem${index}`}>
                <img src={img.url} key={index} alt={`Noct Image ${index}`} style={{width: windowSize.width < 768 ? '240px' : img.width}} />
                { 
                  img.caption && <p className="caption mt-2" style={{width: windowSize.width < 768 ? '240px' : img.width}}>{img.caption}</p>
                }
              </div>
            ))
          }
        </div>
        <div className="left-trigger"></div>
        <div className="right-trigger"></div>
      </div>

      <style jsx>{`
      
        .images-carousel {
          display: flex;
          align-items: center;
          overflow-x: scroll;
        }
        
        .images-carousel-item {
          margin-right: 60px;
        }
      
        .images-carousel::-webkit-scrollbar {
          display: none;
        }

        .left-trigger {
          z-index: 2;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 30%;
          cursor: url(/images/icons/left-arrow.svg), auto;
        }

        .right-trigger {
          z-index: 2;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 30%;
          cursor: url(/images/icons/right-arrow.svg), auto;
        }

        @media screen and (max-width: 1024px) {
          .left-trigger,
          .right-trigger {
            display: none;
          }
        }

        @media screen and (max-width: 768px) {
          .images-carousel-item {
            margin-right: 40px;
          }
        }
      
      `}
      </style>
    </>
  )
}