import Button from "./Button";
import Link from "next/link";

export default function FooterCTA() {
  return (
    <section className="footer-cta padded-section">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-8 mb-5 mb-lg-0 pr-lg-5">
            <div className="h3 text-white mb-6">
              "Well, now that we have seen each other," said the Unicorn, "if
              you'll believe in me, I'll believe in you. Is that a bargain?"
            </div>
            <Link href="/contact">
              <a>
                <Button text="Get in Touch" style="alt" />
              </a>
            </Link>
          </div>
          <div className="col-9 col-lg-4 text-right">
            <img
              src="/images/illustrations/static/footer-cta-illustration.svg"
              alt="Alice in Wonderland Illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DesignSystemFooterCTA() {
  const title = "Let’s build your design system";
  const text =
    "Are you prepared to seamlessly integrates all your products? Reach out to us and create a cohesive experience that resonates with your users.";
  return (
    <section className="footer-cta padded-section">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-8 mb-5 mb-lg-0 pr-lg-5">
            <div className="h3 text-white mb-3">{title}</div>
            <p className=" text-white mb-5 tw-max-w-[660px]">{text}</p>
            <Link href="/contact">
              <a>
                <Button text="Get in Touch" style="alt" />
              </a>
            </Link>
          </div>
          <div className="col-9 col-lg-4 text-right">
            <img
              src="/images/illustrations/static/footer-cta-illustration.svg"
              alt="Alice in Wonderland Illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
