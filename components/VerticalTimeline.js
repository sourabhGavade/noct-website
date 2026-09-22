import React from 'react'
import urlFor from '../utils/urlFor'

export default function VerticalTimeline({ items, iconBg = '#fcfcfc' }) {
  return (
    <>
      <div className="v-timeline">
        <div className="v-timeline-line" aria-hidden="true" />
        {
          items.map(item => (
            <div className="v-timeline-item" key={item._key}>
              <div className="v-timeline-icon">
                <div className="v-timeline-icon-wrap">
                  <img className="icon-sm" src={urlFor(item.image).url()} alt="" />
                </div>
              </div>
              <div className="v-timeline-content">
                <div className="h4 mb-3">{item.title}</div>
                <p>{item.description}</p>
              </div>
            </div>
          ))
        }
      </div>

      {/* Styles */}
      <style jsx>{`
      
        .v-timeline {
          position: relative;
        }

        .v-timeline-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: calc(22px - 1.5px);
          width: 3px;
          background: #e1e1e1;
          z-index: 0;
        }
      
        .v-timeline-item {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          position: relative;
          z-index: 1;
        }
      
        .v-timeline-icon {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100px;
          padding-bottom: 32px;
        }

        .v-timeline-icon-wrap {
          position: relative;
          display: inline-block;
          line-height: 0;
        }

        /* Mask only the line behind each icon; inset slightly so the line
           meets the artwork (icons have transparent padding in the PNG) */
        .v-timeline-icon-wrap:before {
          content: '';
          position: absolute;
          top: 4px;
          bottom: 10px;
          left: 50%;
          width: 12px;
          transform: translateX(-50%);
          background-color: ${iconBg};
          z-index: 0;
        }

        .v-timeline-icon-wrap :global(img) {
          position: relative;
          z-index: 1;
          display: block;
        }

        /* Cover the line below the last icon so it doesn't run beside the final text */
        .v-timeline-item:last-child .v-timeline-icon:after {
          content: '';
          flex: 1;
          align-self: stretch;
          min-height: 0;
          background-color: ${iconBg};
        }

        .v-timeline-item:last-child .v-timeline-icon,
        .v-timeline-item:last-child .v-timeline-content {
          padding-bottom: 0;
        }

        .v-timeline-content {
          width: calc(100% - 100px);
          padding-bottom: 32px;
        }

        @media screen and (max-width: 786px) {

          .v-timeline-icon {
            width: 80px;
          }

          .v-timeline-content {
            width: calc(100% - 80px);
          }

        }

      `}</style>
    </>
  )
}
