import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ButtonLink from './ButtonLink'

export default function LargeDropdown({ mainTitle, mainDesc, items }) {

  const [open, setOpen] = useState(false);
  const dropRef = useRef()

  const toggleTestimonial = () => {
    setOpen(!open)
    if (open) {
      TweenMax.to(dropRef.current, { duration: items.length * 0.2, height: '0px', ease: 'Power1.easeOut' })
    } else {
      TweenMax.to(dropRef.current, { duration: items.length * 0.2, height: `${items.length * 180}px`, ease: 'Power1.easeOut' })
      TweenMax.staggerFrom(dropRef.current.children, 0.2, { opacity: 0, y: 20 }, 0.075)
    }
  }

  return (
    <>
      <div className={`large-dropdown ${open ? 'active' : ''}`}>

        <div className="large-dropdown__header" onClick={() => toggleTestimonial()}>
          <div className="pr-3">
            <div className="h2 mb-2">{mainTitle}</div>
            <p>{mainDesc}</p>
          </div>
          <div className="ld-plus-icon"></div>
        </div>

        <div className="large-dropdown__dropdown" ref={dropRef}>
          {
            items.map((item, index) => (
              <div className="join-cta" key={index}>
                <Link href={item.slug}>
                  <a>
                    <div className="large-dropdown__item">
                      <div className="h4 mb-1">{item.title}</div>
                      <p>{item.desc}</p>
                      <div className="d-block d-lg-none mt-3">
                        <ButtonLink text="Read Job Description" />
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))
          }
        </div>

      </div>

      <style jsx>{`
      
        .large-dropdown {
          border-bottom: 2px solid rgba(0,0,0,0.2);
          padding: 15px 0;
          margin-bottom: 60px;
          overflow-y: hidden;
          overflow-x: visible;
          transition: all 0.3s ease;
        }

        .large-dropdown:hover {
          border-bottom: 2px solid rgba(0,0,0,1);
        }

        .large-dropdown__header {
          cursor: pointer;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 48px;
        }

        .large-dropdown__dropdown {
          height: 0px;
        }

        .ld-plus-icon {
          flex-shrink: 0;
          position: relative;
          width: 18px;
          height: 18px;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .ld-plus-icon:before,
        .ld-plus-icon:after {
          content: "";
          position: absolute;
          background-color: #bababa;
          transition: all 0.3s ease;
        }

        .large-dropdown__header:hover .ld-plus-icon:before,
        .large-dropdown__header:hover .ld-plus-icon:after {
          background-color: #1a1a1a;
        }

        .ld-plus-icon:before{
          top: 0;
          left: 50%;
          width: 3px;
          height: 100%;
          margin-left: -1px;
        }

        .ld-plus-icon:after{
          top: 50%;
          left: 0;
          width: 100%;
          height: 3px;
          margin-top: -1px;
        }
            
        .active .ld-plus-icon:before { 
          transform: rotate(90deg);
        }
        
        .active .ld-plus-icon:after {
          transform: rotate(180deg);
        }

        .large-dropdown__header:hover .ld-plus-icon {
          transform: rotate(90deg);
        }

        .active .large-dropdown__header:hover .ld-plus-icon {
          transform: rotate(0);
        }

        .large-dropdown__item {
          margin-bottom: 20px;
          padding: 16px 200px 16px 0;
        }

        .join-cta {
          position: relative;
          padding: 24px;
          overflow: hidden;
          transition: all 0.25s ease;
        }
    
        .join-cta:hover {
          background: var(--blue-hover);
        }

        .join-cta:after {
          content: 'READ JOB DESCRIPTION ―';
          position: absolute;
          right: -2px;
          top: 50%;
          transform: translate(100%, -50%);
          transition: 0.25s ease;
          font-family: 'Lato';
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 1.2px;
        }

        .join-cta:hover:after {
          transform: translate(0, -50%);
        }

        @media screen and (max-width: 992px) {

          .large-dropdown__header {
            padding: 12px 0 32px;
          }

          .large-dropdown__item {
            margin-bottom: 0;
            padding: 16px 0;
          }

          .join-cta {
            padding: 12px 0;
          }

          .join-cta:hover {
            background: none;
          }

          .join-cta:after {
            display: none;
          }

        }
        
      `}</style>
    </>
  )
}
