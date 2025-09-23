import urlFor from "../../utils/urlFor"
import useWindowSize from '../../utils/useWindowSize'

export default function TwoColumnMedia({ data }) {
	const windowSize = useWindowSize()
	let { media1Type, image1, image1Alt, gif1, media1caption, media2Type, image2, image2Alt, gif2, media2caption, marginBottom, marginBottomMobile } = data
	marginBottomMobile = marginBottomMobile ? marginBottomMobile : marginBottom/2
	return (
		<section className="project-section" style={{ marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px` }}>
			<div className="container">
				<div className="project-split-grid">
					<div>
						{
							media1Type === 'image' &&
							<img className="w-100" src={urlFor(image1).url()} alt={image1Alt} />
						}
						{
							media1Type === 'gif' &&
							<video autoPlay muted loop playsInline>
								<source src={gif1} type="video/mp4" />
							</video>
						}
						{ media1caption && <div className="img-caption">{media1caption}</div> }
					</div>
					<div>
						{
							media2Type === 'image' &&
							<img className="w-100" src={urlFor(image2).url()} alt={image2Alt} />
						}
						{
							media2Type === 'gif' &&
							<video autoPlay muted loop playsInline>
								<source src={gif2} type="video/mp4" />
							</video>
						}
						{ media2caption && <div className="img-caption">{media2caption}</div> }
					</div>
				</div>
			</div>
		</section>
	)
}
