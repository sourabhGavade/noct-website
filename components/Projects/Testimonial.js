import BlockContent from "@sanity/block-content-to-react"
import useWindowSize from '../../utils/useWindowSize'

export default function Testimonial({ data }) {
    const windowSize = useWindowSize()
    let { quote, name, designation, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
    return (
        <>
        <section className="project-section" style={{marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
            <div className="container project-testimonial">
                <div className="project-intro-inner text-center">
                    <div className="position-relative mb-5">
                        <div className="testimonial-quote-open"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="22"><path d="M29.648 21.953V11.68h-6.133c-.104-1.042.104-2.122.625-3.242.911-2.109 2.682-3.568 5.313-4.375h0V0c-3.464.703-6.152 2.174-8.066 4.414s-2.871 5.339-2.871 9.297h0v8.242h11.133zm-18.516 0V11.68H5c-.078-1.146.117-2.253.586-3.32.911-2.031 2.695-3.464 5.352-4.297h0V0C7.37.703 4.655 2.188 2.793 4.453S0 9.805 0 13.711h0v8.242h11.133z" fill="#222323" /></svg></div>
                        <BlockContent blocks={quote} />
                        <div className="testimonial-quote-close"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="22"><path d="M.352.047V10.32h6.133c.104 1.042-.104 2.122-.625 3.242-.911 2.109-2.682 3.568-5.312 4.375h0V22c3.464-.703 6.152-2.174 8.066-4.414s2.871-5.339 2.871-9.297h0V.047H.352zm18.516 0V10.32H25c.078 1.146-.117 2.253-.586 3.32-.911 2.031-2.695 3.464-5.352 4.297h0V22c3.568-.703 6.283-2.187 8.145-4.453S30 12.195 30 8.289h0V.047H18.867z" fill="#222323" /></svg></div>
                    </div>
                    <div className="h5 mb-2">{name}</div>
                    <p>{designation}</p>
                </div>
            </div>  
        </section>
        <style jsx>{`
        
            .project-intro-inner {
                max-width: 785px;
                margin: 0 auto;
            }

            .project-testimonial {
                position: relative;
                padding: 80px 0;
            }

            .project-testimonial:before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                height: 0.5px;
                width: 160px;
                background: #1A1A1A;
            }

            .project-testimonial:after {
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                height: 0.5px;
                width: 160px;
                background: #1A1A1A;
            }

            .testimonial-quote-open {
                position: absolute;
                top: -5px;
                left: -36px;
            }
    
            .testimonial-quote-close {
                position: absolute;
                bottom: -5px;
                right: -36px;
            }
        
        `}</style>
        </>
    )
}
