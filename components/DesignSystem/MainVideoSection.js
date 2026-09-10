export default function MainVideoSection({ videoUrl }) {
  if (!videoUrl) return null;

  return (
    <section className="tw-overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="tw-block tw-h-[557px] tw-w-full tw-object-cover tw-object-center md:tw-h-auto"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </section>
  );
}
