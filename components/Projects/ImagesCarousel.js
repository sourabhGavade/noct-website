import OwlCarousel from 'react-owl-carousel';
import urlFor from '../../utils/urlFor'
import useWindowSize from '../../utils/useWindowSize'

export default function ImagesCarousel({ data }) {
    const windowSize = useWindowSize()
    let { slides, slidesToShow, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
    return (
        <>
            <section className="project-section project-images-carousel" style={{ marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
                <OwlCarousel
                    center={true}
                    loop={false}
                    items={1} 
                    margin={45} 
                    stagePadding={document.querySelector('.container').offsetLeft}
                    nav={true}
                    slidetransition={'ease-in-out'}
                    navSpeed={700}
                    responsive={{
                        0: { items: 1 },
                        768: { items: slidesToShow ? slidesToShow : 3 }
                    }}
                >
                    {
                        slides.map(slide => (
                            <div className="item" key={slide._key}>
                                <img className="mb-3" src={urlFor(slide.image).url()} />
                                { slide.caption && <div className="img-caption">{slide.caption}</div> }
                            </div>        
                        ))
                    }
                </OwlCarousel>
            </section>
            <style jsx>{`
                    

            `}</style>
        </>
    )
}
