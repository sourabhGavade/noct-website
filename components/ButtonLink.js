import React from 'react'

export default function ButtonLink({ text, disabled }) {
  return (
    <>
      <button className="btn btn-link" disabled={disabled}>
        <div className="gooey-horizontal"></div>
        {text}
      </button>
      <style jsx>{`

        .btn.btn-link {
          position: relative;
          display: block;
          border: none;
          padding: 0;
          font-weight: 700;
          transition: 0.5s ease;
          overflow: visible;
        }

        .btn.btn-link:after {
          display: none;
        }

        .btn-link:hover {
          color: inherit;
          text-decoration: none;
          transform: translateX(15px);
        }
      
        .gooey-horizontal {
          opacity: 0;
          position: absolute;
          top: 50%;
          left: -30px;
          transform: translate(0, -50%);
          width: 12px;
          height: 12px;
          background: url('/images/gooey-sprite-horizontal.png') 0% 50%;
          background-size: cover;
          transition: all 0.2s ease;
        }

        .btn-link:hover .gooey-horizontal {
          opacity: 1;
          transform: translate(12px, -50%);
          animation: sprite-horizontal 0.25s steps(6) forwards;
        }

        @keyframes sprite-horizontal {
          100% { background-position: 100% 50% }
        }

        @media screen and (max-width: 1024px) {

          .btn-link {
            font-size: 12px;
            line-height: 15px;
            letter-spacing: 1.35px;
          }

          .btn-link:after {
            content: '';
            height: 1px;
            width: 100%;
            position: absolute;
            background: #1A1A1A;
            bottom: 0;
            left: 0;
          }
          
          .btn-link:hover {
            transform: translateX(0);
          }
          
          .gooey-horizontal {
            display: none;
          }
          
        }
      
      `}</style>
    </>
  )
}
