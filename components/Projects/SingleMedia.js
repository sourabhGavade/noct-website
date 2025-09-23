import urlFor from "../../utils/urlFor"
import useWindowSize from '../../utils/useWindowSize'

export default function SingleMedia({ data }) {
    const windowSize = useWindowSize()
    let { mediaType, width, image, imageAlt, videoUrl, caption, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
    return (
        <section className="project-section" style={{marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
            <div className={width === 'contained' ? 'container' : ''}>
                {
                    mediaType === 'image' &&
                    <img className="w-100" src={urlFor(image).url()} alt={imageAlt} />
                }
                {
                    mediaType === 'gif' &&
                    <video autoPlay muted loop playsInline>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                }
                {
                    mediaType === 'video' &&
                    <video>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                }
                <div className="img-caption">{caption}</div>
            </div>
        </section>
    )
}