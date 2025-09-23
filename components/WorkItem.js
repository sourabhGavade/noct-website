import { useEffect, useRef } from 'react'
import Link from "next/link"
import ButtonLink from './ButtonLink'
import useWindowSize from '../utils/useWindowSize'

export default function WorkItem({ uid, url, img, imgBg, title, desc }) {
  const workItemRef = useRef()
  const workHoverRef = useRef()
  const workImgRef = useRef()

  const windowSize = useWindowSize()

  useEffect(() => {
    initScrollTrigger()
    document.addEventListener('mousemove', workMouseMove)

    return () => { 
      document.removeEventListener('mousemove', workMouseMove)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  const workMouseMove = (e) => {
    const bounds = workImgRef.current.getBoundingClientRect()
    let centerOffset = workHoverRef.current.offsetWidth / 2
    let x = (e.clientX - bounds.left) - centerOffset
    let y = (e.clientY - bounds.top) - centerOffset
    workHoverRef.current.style.left = `${x}px`
    workHoverRef.current.style.top = `${y}px`
  }

  const handleMouseEnter = () => {
    TweenMax.to(workHoverRef.current, 0.3, { scale: 1, ease: 'Power2.easeOut' })
  }

  const handleMouseLeave = () => {
    TweenMax.to(workHoverRef.current, 0.3, { scale: 0.2, ease: 'Power2.easeOut' })
  }

  const initScrollTrigger = () => {
    gsap.from(workItemRef.current, {
      scrollTrigger: {
        id: 'workItem',
        trigger: workItemRef.current,
        start: '-5% bottom',
      },
      opacity: 0,
      y: 100,
      scale: windowSize.width < 769 ? 1 : 0.75,
      duration: 0.5
    });
  }

  return (
    <div className="work-item" key={uid} ref={workItemRef}>
      <Link href={url}>
        <a>
          <div
            ref={workImgRef}
            className={`work-img mobile-full-bleed`}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            style={{ 
              backgroundImage: `url(${img})`,
              backgroundColor: `${imgBg}`
            }}
          >
            <div ref={workHoverRef} className="work-hover"><div className="h6">VIEW</div></div>
          </div>
        </a>
      </Link>
      <Link href={url}>
        <a>
          <div className="work-title">
            {title}
          </div>
        </a>
      </Link>
      <p className="work-caption lg">
        {desc}
      </p>
      <div className="d-block d-lg-none mt-4">
        <Link href={url}><a><ButtonLink text="View Project" /></a></Link>
      </div>
    </div>
  )
}
