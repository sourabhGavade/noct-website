import useWindowSize from '../../utils/useWindowSize'

export default function Embed({ data }) {
    const windowSize = useWindowSize()
    let { embedUrl, width, caption, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
    return (
        <>
            <section className="project-section" style={{marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
                <div className={width === 'contained' ? 'container' : ''}>
                    <div className="embed-container">
                        <iframe width="100%" src={embedUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    { caption && <div className="img-caption">{caption}</div> }
                </div>
            </section>
            <style jsx>{`
            
                .embed-container {
                    position: relative; 
                    padding-bottom: 56.25%; 
                    padding-top: 30px; 
                    height: 0; 
                    overflow: hidden;
                }

                .embed-container iframe {
                    position: absolute; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%
                }
            
            `}</style>
        </>
    )
}