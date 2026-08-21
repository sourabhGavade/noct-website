export default function MainVideoSection({ videoUrl }) {
  if (!videoUrl) return null;

  return (
    <section className="tw-overflow-hidden tw-bg-[#F5F5F5]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="tw-block tw-h-auto tw-w-full"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </section>
  );
}
