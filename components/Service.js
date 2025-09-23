import { useRef } from "react";

export default function Service({ title, desc, boxContent }) {
  const descRef = useRef();
  const splitRef = useRef();
  const serviceRef = useRef();
  const boxRef = useRef()

  const resetService = () => {
    document
      .querySelectorAll(".service")
      .forEach((item) => item.classList.remove("open"));
    gsap.utils.toArray(".service-desc").forEach((item) => {
      TweenMax.to(item, 0.4, { height: "0px", ease: "Power1.easeOut" });
    });
  };

  const toggleService = () => {
    if (serviceRef.current.classList.contains("open")) {
      serviceRef.current.classList.remove("open");
      TweenMax.to(descRef.current, 0.4, {
        height: "0px",
        ease: "Power1.easeOut",
      });
      return;
    }
    resetService();
    let split = new SplitText(splitRef.current, { type: "lines" });
    if (serviceRef.current.classList.contains("open")) {
      serviceRef.current.classList.remove("open");
      TweenMax.to(descRef.current, 0.4, {
        height: "0px",
        ease: "Power1.easeOut",
      });
    } else {
      serviceRef.current.classList.add("open");
      TweenMax.to(descRef.current, 0.4, {
        height: "auto",
        ease: "Power1.easeOut",
      });
      TweenMax.staggerFrom(
        split.lines,
        0.3,
        { y: 20, opacity: 0, delay: 0.1 },
        0.05
      );
    }
  };

  return (
    <>
      <div ref={serviceRef} className="service">
        <div className="service-header" onClick={() => toggleService()}>
          <div className="h5 service-title">{title}</div>
          <div className="plus-icon"></div>
        </div>
        <div className="service-desc" ref={descRef}>
          <p ref={splitRef}>{desc}</p>
          {boxContent && (
            <div className="service-box-content" ref={boxRef}>
              <p className="title">Skills & Learnings:</p>
              <div className="box-grid">
                {boxContent.map((item) => (
                  <p className="skill">{item}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .service {
          overflow-y: hidden;
        }

        .service-header {
          width: auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .service-desc {
          opacity: 1;
          height: 0px;
        }

        .service .service-desc p {
          opacity: 0;
          transition: 0.3s ease;
        }

        .service.open .service-desc p {
          opacity: 1;
        }

        .service .service-box-content {
          opacity: 0;
          transform: translateY(20px);
          padding: 20px;
          margin-top: 20px;
          background: #f5f5f5;
          margin-bottom: 40px;
          transition: 0.6s ease 0.5s;
        }

        .service-box-content .title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
        }

        .box-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 40px;
          row-gap: 4px;
        }

        .service-box-content .skill {
          font-size: 16px;
          font-weight: 400;
        }

        .service.open .service-box-content {
          opacity: 1;
          transform: translateY(0px);
        }
      `}</style>
    </>
  );
}
