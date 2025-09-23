import OwlCarousel from "react-owl-carousel";
import urlFor from "../../utils/urlFor";
import useWindowSize from "../../utils/useWindowSize";

export default function LaptopCarousel({ data }) {
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
      <div className="laptop-carousel position-relative">
        <div className="laptop-bg">
          <img src="/images/laptop-mockup.png" alt="" />
        </div>
        <OwlCarousel
          autoWidth={true}
          loop={true}
          center={true}
          items={1}
          margin={200}
          stagePadding={document.querySelector(".container").offsetLeft + 240}
          nav={true}
          slidetransition={"ease-in-out"}
          navSpeed={700}
        >
          {slides.map((slide) => (
            <div className="item laptop-carousel-item" key={slide._key}>
              <img className="mb-3" src={urlFor(slide).url()} />
            </div>
          ))}
        </OwlCarousel>
        {caption && <div className="img-caption">{caption}</div>}
      </div>
    </section>
  );
}
