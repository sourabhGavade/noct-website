import React from 'react'
import urlFor from '../utils/urlFor'

export default function VerticalTimeline({ items }) {
  return (
    <>
      <div className="v-timeline">
        {
          items.map(item => (
            <div className="v-timeline-item" key={item._key}>
              <div className="v-timeline-icon">
                <img className="icon-sm" src={urlFor(item.image).url()} alt="" />
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
      
        .v-timeline-item {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
        }
      
        .v-timeline-icon {
          position: relative;
          width: 100px;
          padding-bottom: 32px;
        }

        .v-timeline-icon:before {
          content: '';
          display: block;
          position: absolute;
          width: 3px;
          left: calc(22px - 1.5px);
          top: 44px;
          /* height: calc(100% - 44px); */
          height: 100%;
          background: #e1e1e1;
        }

        .v-timeline-item:last-child .v-timeline-icon:before {
          opacity: 0;
          visibility: hidden;
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
