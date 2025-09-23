import { useEffect, useState, useRef } from 'react'
import useWindowSize from '../utils/useWindowSize'

export default function ImageCarousel({ imgs, animateScroll }) {

  const carouselRef = useRef()
  const windowSize = useWindowSize()

  useEffect(() => {
    if (process.browser) {
      setTimeout(() => {
        initCarousel()
        scrollTest()
      }, 500)
    }
  }, [])

  const initCarousel = () => {
    // Set left padding
    let pad = document.querySelector('.container').offsetLeft
    document.querySelector('.my-carousel-frame').style.paddingLeft = `${pad}px`
    document.querySelector('.my-carousel-item:last-child img').style.marginRight = `${pad}px`
    document.querySelector('.my-carousel-frame').style.width = `calc(100% -${pad*2}px)`

    if (animateScroll) {
      gsap.to('.my-carousel-frame', {
        scrollTrigger: {
            trigger: '.my-carousel-frame',
            start: '-=600',
        },
        duration: 1.5,
        scrollTo: {
            x: window.innerWidth < 768 ? 400 : 1000
        },
        ease: 'Power1.easeInOut',
      });
    }
  }

  const scrollTest = () => {
    var speed = 0;
    if (animateScroll) {
      var scroll = window.innerWidth < 768 ? 400 : 1000;
    } else {
      var scroll = 0
    }
    var container = $('.my-carousel-frame');
    var container_w = container.width();
    var max_scroll = container[0].scrollWidth - container.outerWidth();

    container.on('mousemove', function(e) {
        var mouse_x = e.pageX - container.offset().left;
        var mouseperc = 100 * mouse_x / container_w;
        speed = ((mouseperc - 50) * 1.5) - 10;
    }).on ( 'mouseleave', function() {
      setTimeout(() => { speed = 0; }, 300) 
    });

    function updatescroll() {
        if (speed !== 0) {
            scroll += speed / 5;
            if (scroll < 0) scroll = 0;
            if (scroll > max_scroll) scroll = max_scroll;
            $('.my-carousel-frame').scrollLeft(scroll);
            if (speed > 0) {
              document.querySelector('.my-carousel-frame').classList.remove('left', 'right')
              document.querySelector('.my-carousel-frame').classList.add('right')
            } else if ( speed < 0) {
              document.querySelector('.my-carousel-frame').classList.remove('left', 'right')
              document.querySelector('.my-carousel-frame').classList.add('left')
            }
        }
        window.requestAnimationFrame(updatescroll);
    }
    window.requestAnimationFrame(updatescroll);
  }

  return (
    <>
      <div className="position-relative">
        <div ref={carouselRef} className="my-carousel-frame">
          {
            imgs.map((img, index) => (
              <div className="my-carousel-item" key={`carouselItem${index}`}>
                <img src={img.url} key={index} alt={`Noct Image ${index}`} style={{width: windowSize.width < 768 ? '240px' : `${img.width}px` }} />
                {
                  img.caption && <p className="caption mt-2" style={{width: windowSize.width < 768 ? '240px' : `${img.width}px`}}>{img.caption}</p>
                }
              </div>
            ))
          }
          </div>
      </div>

      <style jsx>{`

        .my-carousel-frame {
          width: 100%;
          margin-bottom: 0.5em;
          padding-bottom: 1em;
          position: relative;
          overflow-x: scroll;
          white-space: nowrap;
          display: flex;
          align-items: center;
        }

        .my-carousel-frame.left {
          cursor: url(/images/icons/left-arrow.svg), auto;
        }

        .my-carousel-frame.right {
          cursor: url(/images/icons/right-arrow.svg), auto;
        }

        .my-carousel-frame::-webkit-scrollbar {
          display: none;
        }
        
        .my-carousel-frame {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .my-carousel-frame ul {
          margin: 0;
          padding: 0;
          height: 100%;
          list-style: none;
        }
        
        .my-carousel-frame li.my-carousel-item {
          cursor: pointer;
          display: inline-block;
          padding: 0;
        }

        .my-carousel-item {
          margin-right: 60px;
        }
      
      `}
      </style>
    </>
  )
}
