import useWindowSize from "../../utils/useWindowSize";

export default function Embed({ data }) {
  const windowSize = useWindowSize();
  let { embedUrl, width, caption, marginBottom, marginBottomMobile } = data;
  marginBottomMobile = marginBottomMobile
    ? marginBottomMobile
    : marginBottom / 2;
  return (
    <>
      <section
        className="project-section"
        style={{
          marginBottom: `${windowSize.width > 769 ? marginBottom : marginBottomMobile}px`,
        }}
      >
        <div className={width === "contained" ? "container" : ""}>
          <video className="embed-video" autoPlay muted loop playsInline>
            <source src={embedUrl} type="video/mp4" />
          </video>
          {caption && <div className="img-caption">{caption}</div>}
        </div>
      </section>
      <style jsx>{`
        .embed-video {
          display: block;
          width: 100%;
          height: auto;
        }
      `}</style>
    </>
  );
}
