export default function MainVideoSection({ videoUrl }) {
  if (!videoUrl) return null;

  return (
    <section className="tw-overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="tw-block tw-w-full"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </section>
  );
}
