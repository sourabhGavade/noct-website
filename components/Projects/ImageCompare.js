import { useEffect, useRef } from "react";
import urlFor from "../../utils/urlFor";
import useWindowSize from "../../utils/useWindowSize";

export default function ImageCompare({ data }) {
  const windowSize = useWindowSize();
  let { beforeImage, afterImage, marginBottom, marginBottomMobile } = data;
  marginBottomMobile = marginBottomMobile
    ? marginBottomMobile
    : marginBottom / 2;
  const mainRef = useRef();
  const bImgDivRef = useRef();
  const bImgRef = useRef();
  const resizerRef = useRef();

  useEffect(() => {
    const slider = mainRef.current;
    const before = bImgDivRef.current;
    const bImg = bImgRef.current;
    const resizer = resizerRef.current;

    if (!slider || !before || !bImg || !resizer) return;

    let active = false;

    const setBeforeImageWidth = () => {
      bImg.style.width = slider.offsetWidth + "px";
    };

    setBeforeImageWidth();

    const slideIt = (clientX) => {
      const x = clientX - slider.getBoundingClientRect().left;
      const transform = Math.max(0, Math.min(x, slider.offsetWidth));
      before.style.width = transform + "px";
      resizer.style.left = transform + "px";
    };

    const onPointerDown = (e) => {
      e.preventDefault();
      active = true;
      resizer.setPointerCapture(e.pointerId);
      resizer.classList.add("resize");
      slideIt(e.clientX);
    };

    const onPointerMove = (e) => {
      if (!active) return;
      e.preventDefault();
      slideIt(e.clientX);
    };

    const onPointerUp = (e) => {
      if (!active) return;
      active = false;
      if (resizer.hasPointerCapture(e.pointerId)) {
        resizer.releasePointerCapture(e.pointerId);
      }
      resizer.classList.remove("resize");
    };

    const onDragStart = (e) => e.preventDefault();

    window.addEventListener("resize", setBeforeImageWidth);
    resizer.addEventListener("pointerdown", onPointerDown);
    resizer.addEventListener("pointermove", onPointerMove);
    resizer.addEventListener("pointerup", onPointerUp);
    resizer.addEventListener("pointercancel", onPointerUp);
    resizer.addEventListener("dragstart", onDragStart);

    return () => {
      window.removeEventListener("resize", setBeforeImageWidth);
      resizer.removeEventListener("pointerdown", onPointerDown);
      resizer.removeEventListener("pointermove", onPointerMove);
      resizer.removeEventListener("pointerup", onPointerUp);
      resizer.removeEventListener("pointercancel", onPointerUp);
      resizer.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return (
    <>
      <div
        className="project-section"
        style={{
          marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`,
        }}
      >
        <div className="container">
          <div id="before-after-slider" ref={mainRef}>
            <div id="before-image" ref={bImgDivRef}>
              <img
                src={urlFor(beforeImage).url()}
                alt="before"
                ref={bImgRef}
                draggable={false}
              />
            </div>
            <div id="after-image">
              <img
                src={urlFor(afterImage).url()}
                alt="After"
                draggable={false}
              />
            </div>
            <div id="resizer" ref={resizerRef}>
              <div className="image-compare-icon">
                <img
                  src="/images/icons/image-compare-icon.png"
                  alt=""
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        #before-after-slider {
          width: 100%;
          position: relative;
          overflow: hidden;
          border: 3px solid white;
          user-select: none;
          -webkit-user-select: none;
        }

        #after-image {
          display: block;
        }

        #after-image:after {
          content: "AFTER";
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 12px 32px;
          background: rgba(255, 255, 255, 0.7);
          font-family: "Lato";
          font-size: 12px;
          letter-spacing: 1.4px;
        }

        #before-image {
          position: absolute;
          height: 100%;
          width: 50%;
          top: 0;
          left: 0;
          overflow: hidden;
          z-index: 2;
        }

        #before-image:after {
          content: "BEFORE";
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 12px 32px;
          background: rgba(255, 255, 255, 0.7);
          font-family: "Lato";
          font-size: 12px;
          letter-spacing: 1.4px;
        }

        #resizer {
          position: absolute;
          display: flex;
          align-items: center;
          z-index: 5;
          top: 0;
          left: 50%;
          height: 100%;
          width: 4px;
          background: white;
          touch-action: none;
          cursor: grab;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        #resizer:after {
          background: #fff;
          content: "< >";
          display: block;
          font-weight: 900;
          color: #1a1a1a;
          justify-content: center;
          align-items: center;
          color: white;
          position: absolute;
          margin: 0 0 0 -18px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .image-compare-icon {
          z-index: 2;
          width: 42px;
          height: 42px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: grab;
          pointer-events: none;
        }

        .image-compare-icon img {
          -webkit-user-drag: none;
          user-drag: none;
        }

        #resizer.resize {
          cursor: grabbing;
        }

        @media screen and (max-width: 767px) {
          #after-image:after,
          #before-image:after {
            padding: 8px 12px;
            font-size: 9px;
            letter-spacing: 0.8px;
          }
        }
      `}</style>
    </>
  );
}
