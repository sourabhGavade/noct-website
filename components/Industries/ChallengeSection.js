import urlFor from "../../utils/urlFor";
import TestimonialCard from "../TestimonialCard";

export default function ChallengeSection({ heading, items = [] }) {
  if (!items?.length) return null;

  return (
    <section className="challenge-section tw-bg-noct-dark tw-pt-[100px] md:tw-pt-[200px] tw-text-white">
      <div className="container">
        {heading && (
          <h2 className="tw-mb-[50px] md:tw-mb-[64px] tw-text-[24px] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
            {heading}
          </h2>
        )}

        <div className="testimonial-grid grid-3">
          {items.map((item, index) => (
            <TestimonialCard
              key={item._key || `challenge-${index}`}
              problem={item.problem}
              solution={item.solution}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .challenge-section .testimonial-grid {
          align-items: start;
          row-gap: 0;
        }

        .challenge-section .testimonial-grid .testimonial-card {
          border-top-color: rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .challenge-section .testimonial-grid .testimonial-card:hover {
          border-top-color: rgba(255, 255, 255, 0.7);
        }

        .challenge-section .testimonial-card .problem,
        .challenge-section .testimonial-card .h5,
        .challenge-section .testimonial-card p {
          color: #fff;
        }

        .challenge-section .quote-icon img {
          filter: invert(1);
        }

        .challenge-section .t-plus-icon:before,
        .challenge-section .t-plus-icon:after {
          background-color: rgba(255, 255, 255, 0.5);
        }

        .challenge-section .testimonial-card__header:hover .t-plus-icon:before,
        .challenge-section .testimonial-card__header:hover .t-plus-icon:after {
          background-color: #fff;
        }

        .challenge-section .testimonial-cta .btn.btn-link {
          color: #fff;
        }

        .challenge-section .testimonial-cta img {
          filter: brightness(0) invert(1);
        }
      `}</style>
    </section>
  );
}
