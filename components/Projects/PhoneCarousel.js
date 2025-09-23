import OwlCarousel from "react-owl-carousel";
import urlFor from "../../utils/urlFor";
import useWindowSize from "../../utils/useWindowSize";

export default function PhoneCarousel({ data }) {
  const windowSize = useWindowSize();
  let { slides, caption, marginBottom, marginBottomMobile } = data;
  marginBottomMobile = marginBottomMobile
    ? marginBottomMobile
    : marginBottom / 2;
  return (
    <section
      className="project-section"
      style={{
        marginBottom: `${
          windowSize.width > 769 ? marginBottom : marginBottomMobile
        }px`,
      }}
    >
      <div className="phone-carousel position-relative">
        <div className="phone-bg">
          <img src="/images/phone-mockup.png" alt="" />
        </div>
        <OwlCarousel
          autoWidth={true}
          loop={true}
          center={true}
          items={5}
          margin={100}
          nav={true}
          slidetransition={"ease-in-out"}
          navSpeed={700}
        >
          {slides.map((slide, index) => (
            <div className="item phone-carousel-item" key={index}>
              <img className="mb-3" src={urlFor(slide).url()} />
            </div>
          ))}
        </OwlCarousel>
        {caption && <div className="img-caption">{caption}</div>}
      </div>
    </section>
  );
}
