import React, { useState, useRef } from "react";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";

export default function DropdownCard({ title, desc, icon }) {
  const [open, setOpen] = useState(false);
  const dropRef = useRef();
  const descRef = useRef();

  const toggleTestimonial = () => {
    setOpen(!open);
    let split = new SplitText(descRef.current, { type: "lines" });
    if (open) {
      TweenMax.to(dropRef.current, 0.55, {
        height: "0px",
        ease: "Power1.easeOut",
      });
    } else {
      TweenMax.to(dropRef.current, 0.55, {
        height: "auto",
        ease: "Power1.easeOut",
      });
      TweenMax.staggerFrom(
        split.lines,
        0.3,
        { y: 20, opacity: 0, delay: 0.1 },
        0.03
      );
    }
  };

  return (
    <>
      <div className={`testimonial-card ${open ? "active" : ""} mb-0`}>
        <div
          className="testimonial-card__header"
          onClick={() => toggleTestimonial()}
        >
          <div>
            <div className="mb-2">
              { icon === "yes" && <MdCheckCircle size="22" /> }
              { icon === "no" && <MdOutlineCancel size="22" /> }
            </div>
            <div className="h5">{title}</div>
          </div>
          <div className="t-plus-icon flex-shrink-0"></div>
        </div>

        <div className="testimonial-card__dropdown" ref={dropRef}>
          <p ref={descRef}>
            {desc}
          </p>
        </div>
      </div>

      <style jsx>{`
        .testimonial-card {
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          padding: 15px 0 0;
          margin-bottom: 60px;
          overflow-y: hidden;
          overflow-x: visible;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          border-top: 1px solid rgba(0, 0, 0, 0.7);
        }

        .testimonial-card__header {
          cursor: pointer;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .testimonial-card__dropdown {
          padding-top: 15px;
          opacity: 0;
          height: 0;
          transition: opacity 0.3s ease;
        }

        .active .testimonial-card__dropdown {
          opacity: 1;
        }

        .testimonial-cta {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
        }

        .t-plus-icon {
          position: relative;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }

        .t-plus-icon:before,
        .t-plus-icon:after {
          content: "";
          position: absolute;
          background-color: rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .testimonial-card__header:hover .t-plus-icon:before,
        .testimonial-card__header:hover .t-plus-icon:after {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .t-plus-icon:before {
          top: 0;
          left: 50%;
          width: 2px;
          height: 100%;
          margin-left: -1px;
        }

        .t-plus-icon:after {
          top: 50%;
          left: 0;
          width: 100%;
          height: 2px;
          margin-top: -1px;
        }

        .active .t-plus-icon:before {
          transform: rotate(90deg);
        }

        .active .t-plus-icon:after {
          transform: rotate(180deg);
        }

        .testimonial-card__header:hover .t-plus-icon {
          transform: rotate(90deg);
        }

        .active .testimonial-card__header:hover .t-plus-icon {
          transform: rotate(0);
        }
      `}</style>
    </>
  );
}
