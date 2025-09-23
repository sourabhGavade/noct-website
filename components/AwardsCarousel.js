import OwlCarousel from "react-owl-carousel";

export default function AwardsCarousel() {
  return (
    <>
      <OwlCarousel
        autoWidth={true}
        width={100}
        loop={true}
        center={true}
        items={1}
        // navSpeed={700}
        animateOut='fadeOut'
        autoPlay={true}
        autoplaySpeed={2000}
      >
        {awards.map((award) => (
          <div className="award-item" key={award._key}>
            <img className="mb-3" src={urlFor(award).url()} />
          </div>
        ))}
      </OwlCarousel>
    </>
  )
}
