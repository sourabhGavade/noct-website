import OwlCarousel from 'react-owl-carousel';
import BlockContent from '@sanity/block-content-to-react';
import urlFor from '../../utils/urlFor';
import useWindowSize from '../../utils/useWindowSize'

export default function SectionalCarousel({ data }) {
    const windowSize = useWindowSize()
    let { slides, marginBottom, marginBottomMobile } = data
    marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
    return (
        <section className="project-section" style={{marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`}}>
            <OwlCarousel
                // autoWidth={true}
                loop={false}
                items={1} 
                margin={45} 
                stagePadding={document.querySelector('.container').offsetLeft}
                nav={true}
                slidetransition={'ease-in-out'}
                navSpeed={700}
            >
                {
                    slides.map(slide => (
                        <div className="item sectional-carousel-item" style={{ backgroundColor: slide.bgColor }} key={slide._key}>
                            <div className="sectional-carousel-grid">
                                <div className="sectional-carousel__info">
                                    <div className="h4 mb-3">{slide.title}</div>
                                    <BlockContent blocks={slide.text} />
                                </div>
                                <div>
                                    <img src={urlFor(slide.image).url()} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </OwlCarousel>
            <style jsx>{`
            
                .sectional-carousel-item {
                    padding: 40px 60px;
                }

                .sectional-carousel-grid {
                    display: grid;
                    grid-template-columns: 1fr 450px;
                    grid-gap: 60px;
                }

                .sectional-carousel__info {
                    margin-top: 80px;
                }

                @media screen and (max-width: 1025px) {
                
                    .sectional-carousel-grid {
                        grid-template-columns: 1fr 320px;
                        grid-gap: 40px;
                    }

                    .sectional-carousel__info {
                        margin-top: 0;
                    }

                }

                @media screen and (max-width: 767px) {

                    .sectional-carousel-grid {
                        grid-template-columns: 1fr;
                        grid-gap: 24px;
                    }

                    .sectional-carousel-item {
                        padding: 40px 30px;
                        margin: 0 20px;
                    }

                    .sectional-carousel__info {
                        order: 2;
                    }

                }
            
            `}</style>
        </section>
    )
}
