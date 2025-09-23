import BlockContent from '@sanity/block-content-to-react'
import useWindowSize from '../../utils/useWindowSize'

export default function ParaWithHeading({ data }) {
    const windowSize = useWindowSize()
    let { headingType, heading, content, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
    return (
        <>
            <section className="project-section" style={{marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
                <div className="container">
                    <div className="project-intro-inner">
                        { headingType === "H2" && <h2 className="mb-3">{heading}</h2> }
                        { headingType === "H3" && <h3 className="mb-3">{heading}</h3> }
                        { headingType === "H4" && <h4 className="mb-3">{heading}</h4> }
                        { content && <BlockContent blocks={content} /> }
                    </div>
                </div>  
            </section>
        </>
    )
}
