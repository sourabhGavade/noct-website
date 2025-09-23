import { useEffect, useRef } from "react";
import urlFor from "../../utils/urlFor";
import useWindowSize from '../../utils/useWindowSize'

export default function ImageCompare({ data }) {
    const windowSize = useWindowSize()
    let { beforeImage, afterImage, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
    const mainRef = useRef()
    const bImgDivRef = useRef()
    const bImgRef = useRef()
    const resizerRef = useRef()

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        const slider = mainRef.current
        const before = bImgDivRef.current
        const bImg = bImgRef.current
        const resizer = resizerRef.current

        let active = false;
        let width = slider.offsetWidth;
        bImg.style.width = width + 'px';
        
        window.addEventListener('resize', function () {
            let width = slider.offsetWidth;
            bImg.style.width = width + 'px';
        })

        resizer.addEventListener('mousedown', function () {
            active = true;
            resizer.classList.add('resize');

        });

        document.body.addEventListener('mouseup', function () {
            active = false;
            resizer.classList.remove('resize');
        });

        document.body.addEventListener('mouseleave', function () {
            active = false;
            resizer.classList.remove('resize');
        });

        document.body.addEventListener('mousemove', function (e) {
            if (!active) return;
            let x = e.pageX;
            x -= slider.getBoundingClientRect().left;
            slideIt(x);
            pauseEvent(e);
        });

        resizer.addEventListener('touchstart', function () {
            active = true;
            resizer.classList.add('resize');
        });

        document.body.addEventListener('touchend', function () {
            active = false;
            resizer.classList.remove('resize');
        });

        document.body.addEventListener('touchcancel', function () {
            active = false;
            resizer.classList.remove('resize');
        });

        //calculation for dragging on touch devices
        document.body.addEventListener('touchmove', function (e) {
            if (!active) return;
            let x;

            let i;
            for (i = 0; i < e.changedTouches.length; i++) {
                x = e.changedTouches[i].pageX;
            }

            x -= slider.getBoundingClientRect().left;
            slideIt(x);
            pauseEvent(e);
        });

        function slideIt(x) {
            let transform = Math.max(0, (Math.min(x, slider.offsetWidth)));
            before.style.width = transform + "px";
            resizer.style.left = transform - 0 + "px";
        }
    
        function pauseEvent(e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            e.cancelBubble = true;
            e.returnValue = false;
            return false;
        }
    }

    return (
        <>
            <div className="project-section" style={{ marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
                <div className="container">
                    <div id="before-after-slider" ref={mainRef}>
                        <div id="before-image" ref={bImgDivRef}>
                            <img src={urlFor(beforeImage).url()} alt="before" ref={bImgRef} />
                        </div>
                        <div id="after-image">
                            <img src={urlFor(afterImage).url()} alt="After" />
                        </div>
                        <div id="resizer" ref={resizerRef}>
                            <div className="image-compare-icon"><img src="/images/icons/image-compare-icon.png" alt="" /></div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
              
                #before-after-slider {
                    width:100%;
                    position:relative;
                    overflow:hidden;
                    border:3px solid white;
                }
                
                #after-image {
                    display:block
                }

                #after-image:after {
                    content: 'AFTER';
                    display: block;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    padding: 12px 32px;
                    background: rgba(255,255,255,0.7);
                    font-family: 'Lato';
                    font-size: 12px;
                    letter-spacing: 1.4px;
                }
                
                #before-image {
                    position:absolute;
                    height:100%;
                    width:50%;
                    top:0;
                    left:0;
                    overflow:hidden;
                    z-index:2;
                }

                #before-image:after {
                    content: 'BEFORE';
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding: 12px 32px;
                    background: rgba(255,255,255,0.7);
                    font-family: 'Lato';
                    font-size: 12px;
                    letter-spacing: 1.4px;
                }
                
                #resizer {
                    position:absolute;
                    display:flex;
                    align-items:center;
                    z-index:5;
                    top:0;
                    left:50%;
                    height:100%;
                    width:4px;
                    background:white;
                    /*Stop vertical scrolling on touch*/
                    -ms-touch-action: pan-y;
                    touch-action: pan-y;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                
                #resizer:after {
                    background: #fff;
                    content:'< >';
                    display: block;
                    font-weight:900;
                    color: #1A1A1A;
                    justify-content:center;
                    align-items:center;
                    color:white;
                    position:absolute;
                    margin: 0 0 0 -18px;
                    width:40px;
                    height:40px;
                    border-radius:50%;
                    border:3px solid white;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
    )
}
