import urlFor from "../../utils/urlFor";
import TestimonialCard from "../TestimonialCard";

/**
 * Challenges accordion grid — reuses the services TestimonialCard.
 * Items are distributed across 3 columns (desktop) like the services page.
 * Styled for the dark industry page background.
 */
export default function ChallengeSection({ heading, items = [] }) {
  if (!items?.length) return null;

  const columns = [[], [], []];
  items.forEach((item, index) => {
    columns[index % 3].push(item);
  });

  return (
    <section className="challenge-section tw-bg-noct-dark tw-pt-16 md:tw-pt-[200px] tw-text-white">
      <div className="container">
        {heading && (
          <h2 className="tw-mb-8 md:tw-mb-12 tw-text-[24px] md:tw-text-[40px] lg:tw-text-[48px] tw-font-bold tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-white">
            {heading}
          </h2>
        )}

        <div className="testimonial-grid grid-3">
          {columns.map((column, colIndex) => (
            <div key={`challenge-col-${colIndex}`}>
              {column.map((item, index) => (
                <TestimonialCard
                  key={item._key || `challenge-${colIndex}-${index}`}
                  problem={item.problem}
                  solution={item.solution}
                  logo={item.logo ? urlFor(item.logo).url() : null}
                  ctaLink={item.link}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .challenge-section .testimonial-card {
          border-top-color: rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .challenge-section .testimonial-card:hover {
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
