import { useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function VideoModal({ videoUrl, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!videoUrl) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[100] tw-grid tw-place-items-center tw-p-6">
      <div
        className="tw-absolute tw-inset-0 tw-bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="tw-relative tw-z-[2] tw-w-full tw-max-w-[960px]">
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="tw-absolute -tw-top-11 tw-right-0 tw-flex tw-h-9 tw-w-9 tw-cursor-pointer tw-items-center tw-justify-center tw-border-0 tw-bg-transparent tw-p-0"
        >
          <MdClose size={28} color="#ffffff" />
        </button>
        <video
          key={videoUrl}
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="tw-block tw-w-full tw-max-h-[80vh] tw-bg-black tw-outline-none"
        />
      </div>
    </div>
  );
}
